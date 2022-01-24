import type { ReactiveElement } from '@lit/reactive-element';
import type { ApolloController, ApolloControllerOptions } from './apollo-controller.js';

type O = ApolloControllerOptions<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
type Key = string|number|symbol;

/* eslint-disable @typescript-eslint/ban-types */
type AnyObj = object;
/* eslint-enable @typescript-eslint/ban-types */

const initialProps = new WeakMap<AnyObj, Map<Key, unknown>>();

export function getInitialProps<T extends AnyObj>(
  obj: T,
): Map<keyof T, T[keyof T]> {
  if (!initialProps.has(obj))
    initialProps.set(obj, new Map());
  return initialProps.get(obj) as Map<keyof T, T[keyof T]>;
}

export function getInitialProp<T extends AnyObj>(obj: T, key: keyof T): T[keyof T] | undefined {
  return getInitialProps(obj).get(key);
}

export function setInitialProps<T extends AnyObj>(obj: T): void {
  getInitialProps(obj).forEach((val, key) => obj[key] ??= val);
}

export function setInitialProp<T extends AnyObj>(obj: T, key: keyof T, value: T[keyof T]): void {
  getInitialProps(obj).set(key, value);
}

export interface DefineOptions {
  /** When set to 'options', the controlled property is a member of controller.options */
  path?: 'options',
  /** When true, setting the property has no effect */
  readonly?: boolean,
  /** Called after setting with the new value */
  onSet?(x: unknown): void,
}

function defineOnReactiveElement<T extends ReactiveElement & {
  controller: ApolloController<unknown, unknown>;
}>(
  proto: T,
  name: string & keyof T,
  opts: DefineOptions
): void {
  // Run our property effects
  defineOnHTMLElement(proto, name, {
    ...opts,
    // In addition to any user-defined side-effects,
    // also notify the ReactiveElement lifecycle
    onSet(this: T, x: unknown) {
      const old = this[name];
      opts?.onSet?.call?.(this, x);/* c8 ignore next */
      this.requestUpdate(name, old);
    },
  });
  // And also run ReactiveElement's property effects
  const Class = proto.constructor as typeof ReactiveElement;
  Class.createProperty(name, Class.getPropertyOptions(name));
}

function defineOnHTMLElement<T extends HTMLElement & {
  controller: ApolloController<unknown, unknown>;
  requestUpdate?(name?: string, old?: unknown): void;
}>(
  proto: T,
  name: string & keyof T,
  opts: DefineOptions
): void {
  Object.defineProperty(proto, name, {
    configurable: true,
    get(this: T) {
      if (opts.path) { /* c8 ignore next */
        return (
            !this.controller ? getInitialProp(this, name)/* c8 ignore next */
          : this.controller[opts.path][name as keyof O]
        );
      } else {
        return (
            !this.controller ? getInitialProp(this, name)/* c8 ignore next */
          : this.controller[name as keyof ApolloController<unknown, unknown>]
        );
      }
    },

    set(this: T, value: T[keyof T]) {
      if (opts.readonly) return;/* c8 ignore next */
      const old = this[name as keyof T];
      if (!this.controller)
        setInitialProp(this, name, value);/* c8 ignore next */
      else {
        if (opts.path)
          this.controller[opts.path][name as keyof O] = value as O[keyof O];
        else
          this.controller[name as keyof ApolloController<any, any>] = value as never;
        if (opts.onSet)
          opts.onSet.call(this, value);/* c8 ignore next */
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

/**
 * @summary Class field decorator for controlled properties
 *
 * Controlled properties are element class fields which defer to and reflect that property on the element's `controller` property, which is a `ReactiveController`.
 *
 * @param  options Options for the controlled field
 */
export function controlled(options: DefineOptions = {}) {
  return function<T extends HTMLElement & {
  controller: ApolloController<any, any>;
}>(
    proto: T,
    name: string & keyof T
  ): void {
    if (isReactiveElement(proto))
      defineOnReactiveElement(proto, name, options);/* c8 ignore next */
    else
      defineOnHTMLElement(proto, name, options);/* c8 ignore next */
  };
}
