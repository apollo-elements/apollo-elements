import type { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element';
// @ts-ignore: hybrids does not have TypeScript declarations
import type { Descriptor } from 'hybrids';

// mixins are notoriously hard to type in ts.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = { new (...a: any[]): T; }

type Invalidate = (options?: { force?: boolean }) => void;

type ControllerRecord = {
  invalidate: Invalidate;
  controller: ReactiveController;
}

export class HybridsControllerHost extends EventTarget implements ReactiveControllerHost {
  #controllers = new Set<ReactiveController>();

  #keys = new Map<string|number|symbol, ControllerRecord>();

  constructor(public element: HTMLElement) {
    super();
  }

  register(key: string|number|symbol, record: ControllerRecord): void {
    this.#keys.set(key, record);
  }

  addController(controller: ReactiveController): void {
    this.#controllers.add(controller);
  }

  removeController(controller: ReactiveController): void {
    this.#controllers.delete(controller);
    for (const [key, r] of this.#keys) {
      if (r.controller === controller)
        this.#keys.delete(key);
    }
  }

  dispatchEvent(...args: Parameters<Element['dispatchEvent']>): boolean {
    return this.element.dispatchEvent(...args);
  }

  addEventListener(...args: Parameters<Element['addEventListener']>): void {
    return this.element.addEventListener(...args);
  }

  removeEventListener(...args: Parameters<Element['removeEventListener']>): void {
    return this.element.removeEventListener(...args);
  }

  async requestUpdate(): Promise<boolean> {
    this.#keys.forEach(({ invalidate }) => {
      invalidate({ force: true });
    });
    return this.updateComplete;
  }

  get updateComplete(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

const hosts = new WeakMap<HTMLElement, HybridsControllerHost>();

const ensureHost = <E extends HTMLElement>(element: E): HybridsControllerHost =>
  hosts.get(element) ?? (() => {
    const host = new HybridsControllerHost(element);
    hosts.set(element, host);
    return host;
  })();

const ensureController = <E extends HTMLElement, C extends ReactiveController>(
  element: E,
  controllers: WeakMap<E, ReactiveController>,
  create: () => C
): C =>
  (controllers.get(element) as C) ?? (() => {
    const controller = create();
    controllers.set(element, controller);
    return controller;
  })();

export function controller<E extends HTMLElement, C extends ReactiveController>(
  Controller: Constructor<C>,
  // mixins are notoriously hard to type in ts.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
): Descriptor<E, C> {
  const controllers = new WeakMap<E, ReactiveController>();
  const createController = (element: E) => () =>
    new Controller(ensureHost(element), ...args) as C;

  return {
    value: (element: E) =>
      ensureController(element, controllers, createController(element)),

    connect(element: E, key: string, invalidate: Invalidate) {
      const host = ensureHost(element);
      const controller = ensureController(element, controllers, createController(element));

      host.register(key, { invalidate, controller });
      controller.hostConnected?.();

      return () => controller?.hostDisconnected?.();
    },
  };
}
