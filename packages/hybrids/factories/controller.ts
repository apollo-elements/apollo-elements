import type { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element';
import type { Descriptor } from 'hybrids';
import type * as I from '@apollo-elements/interfaces';

type Invalidate = Parameters<Exclude<Descriptor<HTMLElement, unknown>['connect'], undefined>>[2];

export class HybridsControllerHost implements ReactiveControllerHost {
  #controllers = new Set<ReactiveController>();

  #keys = new Map<string|number|symbol, Invalidate>();

  register(key: string|number|symbol, invalidate: Invalidate): void {
    this.#keys.set(key, invalidate);
  }

  addController(controller: ReactiveController): void {
    this.#controllers.add(controller);
  }

  removeController(controller: ReactiveController): void {
    this.#controllers.delete(controller);
  }

  async requestUpdate(): Promise<boolean> {
    for (const [_, f] of this.#keys) f();

    return this.updateComplete;
  }

  get updateComplete(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

const hosts = new WeakMap<HTMLElement, HybridsControllerHost>();

export function controller<E extends HTMLElement, C extends ReactiveController>(
  Controller: I.Constructor<C>,
  ...args: any[]
): Descriptor<E, C> {
  const controllers = new WeakMap<E, ReactiveController>();
  return {
    get(element) {
      return controllers.get(element) as C;
    },
    connect(element, key, invalidate) {
      if (!hosts.get(element))
        hosts.set(element, new HybridsControllerHost());

      const host = hosts.get(element);

      if (!host)
        throw new Error('Unexpected');

      host.register(key, invalidate);

      let c = controllers.get(element);
      c ??= new Controller(hosts.get(element), ...args);
      controllers.set(element, c);

      c.hostConnected?.();

      return () => {
        c?.hostDisconnected?.();
      };
    },
  };
}
