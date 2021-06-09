import type { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element';
import type { Constructor, CustomElement } from '@apollo-elements/interfaces';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

import { setInitialProps } from '@apollo-elements/core/decorators';

const INITIALIZED = new WeakMap();

const microtask = Promise.resolve();

function ControllerHostMixinImpl<T extends Constructor<CustomElement>>(
  superclass: T
) {
  return class ControllerHost extends superclass implements ReactiveControllerHost {
    #controllers = new Set<ReactiveController>();

    #updatePending = false;

    #resolve!: (v: boolean) => void;

    #updateComplete = new Promise(r => {
      this.#resolve = r;
    });

    constructor(...args: any[]) {
      super(...args);
      INITIALIZED.set(this, true);
      this.requestUpdate();
    }

    addController(controller: ReactiveController): void {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.addController === 'function') super.addController(controller);/* c8 ignore next */
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
      if (!INITIALIZED.get(this)) return;/* c8 ignore next */
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.requestUpdate === 'function') return super.requestUpdate();/* c8 ignore next */
      if (!this.#updatePending)
        this.doUpdate();
    }

    async doUpdate() {
      this.#updatePending = true;
      await this.#updateComplete;
      this.update();
      this.#updateComplete = new Promise(r => { this.#resolve = r; });
      microtask.then(() => this.updated());
    }

    get updateComplete(): Promise<boolean> {
      // @ts-expect-error: superclass may or may not have it
      return super.updateComplete ??
        this.#updateComplete;
    }

    connectedCallback() {
      // assign props that were set before initialization finished
      setInitialProps(this);
      super.connectedCallback?.();/* c8 ignore next */
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.addController !== 'function')
        this.#controllers.forEach(c => c.hostConnected?.());
      this.#resolve(true);
    }

    disconnectedCallback() {
      super.disconnectedCallback?.();/* c8 ignore next */
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.removeController !== 'function')
        this.#controllers.forEach(c => c.hostDisconnected?.());
    }

    update(...args: any[]) {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.update === 'function') super.update(...args);/* c8 ignore next */
      else
        this.#controllers.forEach(c => c.hostUpdate?.());/* c8 ignore next */
    }

    updated(...args: any[]) {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.updated === 'function') super.updated(...args);/* c8 ignore next */
      else {
        this.#updatePending = false;
        this.#controllers.forEach(c => c.hostUpdated?.());/* c8 ignore next */
        this.#resolve(this.#updatePending);
      }
    }
  };
}

export const ControllerHostMixin =
  dedupeMixin(ControllerHostMixinImpl);
