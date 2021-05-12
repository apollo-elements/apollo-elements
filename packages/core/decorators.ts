import type { ReactiveControllerHost, ReactiveElement } from '@lit/reactive-element';
import type { ApolloController, ApolloControllerOptions } from './apollo-controller';

export interface DefineOptions {
  path?: 'options',
  readonly?: boolean,
  onSet?(x: unknown): void,
}

/** Unique symbol for the initial props map */
export const p = Symbol('initial props');

declare class ApolloControllerHost {
  controller: ApolloController<any, any>;
  requestUpdate(): void
  declare updateComplete: Promise<boolean>
  /** @protected */ [p]?: Map<string, unknown>;
}

function defineOnReactiveElement<T extends HTMLElement & ApolloControllerHost>(
  proto: T,
  name: keyof T,
  opts: DefineOptions
): void {
  defineOnHTMLElement(proto, name, {
    ...opts,
    onSet(this: T, x: unknown) {
      opts?.onSet?.call?.(this, x);
      this.requestUpdate();
    },
  });
  (proto.constructor as typeof ReactiveElement)
    .createProperty(name,
      (proto.constructor as typeof ReactiveElement)
        // @ts-expect-error: i know it's protected
        .getPropertyOptions(name),
    );
}

function defineOnHTMLElement<T extends HTMLElement & ApolloControllerHost>(
  proto: T,
  name: keyof T,
  opts: DefineOptions
): void {
  Object.defineProperty(proto, name, {
    get(this: T) {
      this[p] ??= new Map();
      if (opts.path) {
        return (
            !this.controller ? this[p]?.get(name as string)
          : this.controller[opts.path][name as keyof ApolloControllerOptions<any, any>]
        );
      } else {
        return (
            !this.controller ? this[p]?.get(name as string)
          : this.controller[name as keyof ApolloController]
        );
      }
    },

    set(this: T, value: T[keyof T]) {
      if (opts.readonly) return;
      const old = this[name as keyof T];
      this[p] ??= new Map();
      if (!this.controller)
        (this[p] as Map<typeof name, unknown>).set(name, value);
      else {
        if (opts.path)
          this.controller[opts.path][name as keyof ApolloControllerOptions<any, any>] = value;
        else
          this.controller[name as keyof ApolloController] = value;
        if (opts.onSet)
          opts.onSet.call(this, value);
      }
      // @ts-expect-error: in the case of lit-element, it does
      this.requestUpdate?.(name, old);
    },
  });
}

export function controlled(opts: DefineOptions = {}) {
  return function<T extends ReactiveControllerHost & HTMLElement & ApolloControllerHost>(
    proto: T,
    name: keyof T
  ): void {
    if (typeof (proto.constructor as typeof ReactiveElement).createProperty === 'function')
      defineOnReactiveElement(proto, name, opts);
    else
      defineOnHTMLElement(proto, name, opts);
  };
}
