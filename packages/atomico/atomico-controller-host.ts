import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { useUpdate } from 'atomico';

const hosts = new WeakMap<HTMLElement, AtomicoControllerHost>();

export class AtomicoControllerHost implements ReactiveControllerHost {
  #controllers = new Set<ReactiveController>();

  #update!: ReturnType<typeof useUpdate>;

  addController(controller: ReactiveController): void {
    this.#controllers.add(controller);
  }

  removeController(controller: ReactiveController): void {
    this.#controllers.delete(controller);
  }

  requestUpdate(): void {
    this.#update();
  }

  get updateComplete(): Promise<boolean> {
    return Promise.resolve(true);
  }

  constructor(public element: HTMLElement, update: ReturnType<typeof useUpdate>) {
    if (hosts.has(element))
      return hosts.get(element) as AtomicoControllerHost;

    this.#update = update;
    hosts.set(element, this);
  }
}
