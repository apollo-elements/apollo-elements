import type { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element';
import type { Constructor, CustomElement } from '@apollo-elements/interfaces';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

const p = Symbol('initial props');

function ControllerHostMixinImpl<T extends Constructor<CustomElement>>(
  superclass: T
): T & Constructor<ReactiveControllerHost> {
  return class ControllerHost extends superclass {
    #controllers = new Set<ReactiveController>();

    #updatePending = false;

    #updateComplete: Promise<boolean>;

    #resolve!: (v: boolean) => void;

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
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.requestUpdate === 'function') return super.requestUpdate();
      this.update();
      this.#resolve(true);
    }

    get updateComplete(): Promise<boolean> {
      // @ts-expect-error: superclass may or may not have it
      return super.updateComplete ??
        this.#updateComplete;
    }

    private [p] = new Map<keyof this, this[keyof this]>();

    private initProps() {
      this[p].forEach((val, key) => {
        this[key] ??= val;
      });
    }

    constructor(...args: any[]) {
      super(...args);
      this.#updateComplete = new Promise(r => {
        this.#resolve = r;
      });
      this.requestUpdate();
    }

    connectedCallback() {
      this.initProps();
      super.connectedCallback?.();
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.addController !== 'function')
        this.#controllers.forEach(c => c.hostConnected?.());
    }

    disconnectedCallback() {
      super.disconnectedCallback?.();
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.removeController !== 'function')
        this.#controllers.forEach(c => c.hostDisconnected?.());
    }

    update(...args: any[]) {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.update === 'function') super.update(...args);
      else
        this.#controllers.forEach(c => c.hostUpdate?.());
    }

    updated(...args: any[]) {
      // @ts-expect-error: superclass may or may not have it
      if (typeof super.updated === 'function') super.updated(...args);
      else {
        this.#updatePending = false;
        const resolve = this.#resolve;
        this.#updateComplete = new Promise(r => { this.#resolve = r; });
        this.#controllers.forEach(c => c.hostUpdated?.());
        resolve(this.#updatePending);
      }
    }
  };
}

export const ControllerHostMixin =
  dedupeMixin(ControllerHostMixinImpl);

interface MixinControlledOptions {
  path?: 'options',
  readonly?: boolean,
  onSet?(x: unknown): void,
}

export function controlled(opts: MixinControlledOptions = {}) {
  return function<T extends ReactiveControllerHost>(
    proto: T,
    name: typeof opts.path extends keyof T ? keyof T[typeof opts.path] : keyof T
  ): void {
    Object.defineProperty(proto, name, {
      get() {
        if (opts.path)
          return !this.controller ? this[p].get(name) : this.controller[opts.path][name];
        else
          return !this.controller ? this[p].get(name) : this.controller[name];
      },

      set(value) {
        if (opts.readonly) return;
        const old = this[name];
        this[p] ??= new Map();
        if (!this.controller)
          (this[p] as Map<typeof name, unknown>).set(name, value);
        else {
          if (opts.path)
            this.controller[opts.path][name] = value;
          else
            this.controller[name] = value;
          if (opts.onSet)
            opts.onSet.call(this, value);
          this.requestUpdate(name, old);
        }
      },
    });
  };
}
