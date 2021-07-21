import { ReactiveController, ReactiveControllerHost } from 'lit';
import { DOM, FASTElement } from '@microsoft/fast-element';

const hosts = new WeakMap<FASTElement, FASTControllerHost>();

export class FASTControllerHost implements ReactiveControllerHost {
  #controllers = new Set<ReactiveController>();

  addController(controller: ReactiveController): void { this.#controllers.add(controller); }
  removeController(controller: ReactiveController): void { this.#controllers.delete(controller); }

  /** Shouldn't need an implementation, since FAST's reactivity model is pull-based */
  requestUpdate(): void { null; }

  get updateComplete(): Promise<boolean> {
    return DOM.nextUpdate().then(() => true);
  }

  constructor(public $fastElement: FASTElement) {
    if (hosts.has($fastElement))
      return hosts.get($fastElement) as FASTControllerHost;
    else
      hosts.set($fastElement, this);
  }
}
