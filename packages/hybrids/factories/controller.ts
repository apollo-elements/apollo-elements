import type { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element';
// @ts-ignore: hybrids does not have TypeScript declarations
import type { Descriptor } from 'hybrids';

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

export function controller<E extends HTMLElement, C extends ReactiveController>(
  Controller: Constructor<C>,
  ...args: any[]
): Descriptor<E, C> {
  const controllers = new WeakMap<E, ReactiveController>();
  return {
    get(element: E) {
      const c = controllers.get(element) as C;
      return (x => x)(c);
    },
    connect(element: E, key: string, invalidate: Invalidate) {
      if (!hosts.get(element))
        hosts.set(element, new HybridsControllerHost(element));

      const host = hosts.get(element) as HybridsControllerHost;

      let controller = controllers.get(element);

      controller ??= new Controller(hosts.get(element), ...args);
      controllers.set(element, controller);

      host.register(key, { invalidate, controller });

      controller.hostConnected?.();

      return () => {
        controller?.hostDisconnected?.();
      };
    },
  };
}
