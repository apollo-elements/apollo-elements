import type { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element';
import type { Constructor, CustomElement } from '@apollo-elements/core/types';
import type { ControllerHost } from '@apollo-elements/core/types';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

import { setInitialProps } from '@apollo-elements/core/decorators';

const INITIALIZED = new WeakMap();

const microtask = Promise.resolve();

function ControllerHostMixinImpl<T extends Constructor<CustomElement>>(
  superclass: T
): T & Constructor<ControllerHost> {
  class ControllerHostElement extends superclass implements ReactiveControllerHost {
    #controllers = new Set<ReactiveController>();

    #updatePending = false;

    #resolve!: (v: boolean) => void;

    #updateComplete = new Promise(r => {
      this.#resolve = r;
    });

    get updateComplete(): Promise<boolean> {
      // @ts-expect-error: superclass may or may not have it
      return super.updateComplete ??
        this.#updateComplete;
    }

    // mixins are notoriously hard to type in ts.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      INITIALIZED.set(this, true);
      this.requestUpdate();
    }

    private async doUpdate() {
      this.#updatePending = true;
      await this.#updateComplete;
      this.update();
      this.#updateComplete = new Promise(r => { this.#resolve = r; });
      microtask.then(() => this.updated());
    }

    connectedCallback() {
      // assign props that were set before initialization finished
      setInitialProps(this);
      super.connectedCallback?.();
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.addController !== 'function')
        this.#controllers.forEach(c => c.hostConnected?.());
      this.#resolve(true);
    }

    addController(controller: ReactiveController): void {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.addController === 'function') super.addController(controller);
      else
        this.#controllers.add(controller);
    }

    removeController(controller: ReactiveController): void {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.removeController === 'function') super.removeController(controller);
      else
        this.#controllers.delete(controller);
    }

    requestUpdate(): void {
      if (!INITIALIZED.get(this)) return;
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.requestUpdate === 'function') return super.requestUpdate();
      if (!this.#updatePending)
        this.doUpdate();
    }

    // mixins are notoriously hard to type in ts.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update(...args: any[]) {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.update === 'function') super.update(...args);
      else
        this.#controllers.forEach(c => c.hostUpdate?.());
    }

    // mixins are notoriously hard to type in ts.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updated(...args: any[]) {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.updated === 'function') super.updated(...args);
      else {
        this.#updatePending = false;
        this.#controllers.forEach(c => c.hostUpdated?.());
        this.#resolve(this.#updatePending);
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback?.();
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.removeController !== 'function')
        this.#controllers.forEach(c => c.hostDisconnected?.());
    }
  }

  return ControllerHostElement as unknown as T & Constructor<ControllerHost>;
}

export const ControllerHostMixin =
  dedupeMixin(ControllerHostMixinImpl);
