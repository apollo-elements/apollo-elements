import type { ReactiveController } from '@lit/reactive-element';
import type { Constructor, CustomElement } from '@apollo-elements/interfaces';
import type { ApolloControllerHost } from '@apollo-elements/core';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

import { p } from '@apollo-elements/core/decorators';

const init = Symbol('ControllerHost initialized');

function ControllerHostMixinImpl<T extends Constructor<CustomElement>>(
  superclass: T
): T & Constructor<ApolloControllerHost> {
  return class ControllerHost extends superclass {
    /** @protected */
    declare [p]?: Map<string, unknown>;

    private __controllers = new Set<ReactiveController>();

    private __updatePending = false;

    private __updateComplete: Promise<boolean>;

    private __resolve!: (v: boolean) => void;

    private [init] = false;

    constructor(...args: any[]) {
      super(...args);
      this.__updateComplete = new Promise(r => {
        this.__resolve = r;
      });
      this[init] = true;
      this.requestUpdate();
    }

    addController(controller: ReactiveController): void {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.addController === 'function') super.addController(controller);
      else
        this.__controllers.add(controller);
    }

    removeController(controller: ReactiveController): void {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.removeController === 'function') super.removeController(controller);
      else
        this.__controllers.delete(controller);
    }

    requestUpdate(name?: string, value?: unknown): void {
      if (!this[init]) return;
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.requestUpdate === 'function') return super.requestUpdate();
      this.update();
      this.__resolve(true);
    }

    get updateComplete(): Promise<boolean> {
      // @ts-expect-error: superclass may or may not have it
      return super.updateComplete ??
        this.__updateComplete;
    }

    connectedCallback() {
      // assign props that were set before initialization finished
      (this[p] as Map<keyof this, this[keyof this]>)?.forEach?.((val, key) => this[key] ??= val);
      super.connectedCallback?.();
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.addController !== 'function')
        this.__controllers.forEach(c => c.hostConnected?.());
    }

    disconnectedCallback() {
      super.disconnectedCallback?.();
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.removeController !== 'function')
        this.__controllers.forEach(c => c.hostDisconnected?.());
    }

    update(...args: any[]) {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.update === 'function') super.update(...args);
      else
        this.__controllers.forEach(c => c.hostUpdate?.());
    }

    updated(...args: any[]) {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.updated === 'function') super.updated(...args);
      else {
        this.__updatePending = false;
        const resolve = this.__resolve;
        this.__updateComplete = new Promise(r => { this.__resolve = r; });
        this.__controllers.forEach(c => c.hostUpdated?.());
        resolve(this.__updatePending);
      }
    }
  };
}

export const ControllerHostMixin =
  dedupeMixin(ControllerHostMixinImpl);
