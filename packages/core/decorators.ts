import type { ReactiveElement } from '@lit/reactive-element';
import type {
  ApolloController,
  ApolloControllerHost,
  ApolloControllerOptions,
} from './apollo-controller';

type O = ApolloControllerOptions<any, any>;

/** Unique symbol for the initial props map */
export const p = Symbol('initial props');

export interface DefineOptions {
  path?: 'options',
  readonly?: boolean,
  onSet?(x: unknown): void,
}

function defineOnReactiveElement<T extends ReactiveElement & ApolloControllerHost>(
  proto: T,
  name: string & keyof T,
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
  name: string & keyof T,
  opts: DefineOptions
): void {
  Object.defineProperty(proto, name, {
    configurable: true,
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
          this.controller[opts.path][name as keyof O] = value as O[keyof O];
        else
          this.controller[name as keyof ApolloController] = value;
        if (opts.onSet)
          opts.onSet.call(this, value);
      }
      this.requestUpdate?.(name, old);
    },
  });
}

function isReactiveElement(
  proto: HTMLElement
): proto is ReactiveElement {
  return typeof (proto.constructor as typeof ReactiveElement).createProperty === 'function';
}

export function controlled(opts: DefineOptions = {}) {
  return function<T extends ApolloControllerHost>(
    proto: T,
    name: string & keyof T
  ): void {
    if (isReactiveElement(proto))
      defineOnReactiveElement(proto, name, opts);
    else
      defineOnHTMLElement(proto, name, opts);
  };
}
