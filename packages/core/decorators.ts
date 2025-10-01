// we need to any here in order to let tsc infer types downstream
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ReactiveElement } from '@lit/reactive-element';
import type { ApolloController, ApolloControllerOptions } from './apollo-controller.js';

type O = ApolloControllerOptions<any, any>;
type Key = string|number|symbol;

type AnyObj = object;

type ValueOf<T> = T[keyof T];

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
  onSet?(x: unknown, old: unknown): void,
}

interface ApolloReactiveElement<D, V> extends ReactiveElement {
  controller: ApolloController<D, V>;
}

interface ApolloHTMLUpdatableElement<D, V> extends HTMLElement {
  controller: ApolloController<D, V>;
  requestUpdate?(name?: string, old?: unknown): void;
}

interface ApolloHTMLElement<D, V> extends HTMLElement {
  controller: ApolloController<D, V>;
}


function defineOnReactiveElement(
  proto: ApolloReactiveElement<any, any>,
  name: string & keyof ApolloHTMLElement<any, any>,
  opts: DefineOptions
): void {
  const propertyKey: PropertyKey = name;
  // Run our property effects
  defineOnHTMLElement(proto, name, {
    ...opts,
    // In addition to any user-defined side-effects,
    // also notify the ReactiveElement lifecycle
    onSet(this: ApolloReactiveElement<any, any>, x: unknown, old: unknown) {
      opts?.onSet?.call?.(this, x, old);
      this.requestUpdate(propertyKey, old);
    },
  });
  // And also run ReactiveElement's property effects
  const Class = proto.constructor as typeof ReactiveElement;
  Class.createProperty(name, { ...Class.getPropertyOptions(name), noAccessor: true });
}

function defineOnHTMLElement(
  proto: ApolloHTMLUpdatableElement<any, any>,
  name: string & keyof ApolloHTMLElement<any, any>,
  opts: DefineOptions
): void {
  const propertyKey: PropertyKey = name;
  Object.defineProperty(proto, name, {
    configurable: true,
    get(this: ApolloHTMLUpdatableElement<any, any>) {
      if (opts.path) {
        return (
            !this.controller ? getInitialProp(this, name)
          : this.controller[opts.path][name as keyof O]
        );
      } else {
        return (
            !this.controller ? getInitialProp(this, name)
          : this.controller[name as keyof ApolloController<unknown, unknown>]
        );
      }
    },

    set(this: ApolloHTMLUpdatableElement<any, any>, value: ValueOf<ApolloHTMLUpdatableElement<any, any>>) {
      if (opts.readonly) return;
      const old = this[name as keyof ApolloHTMLUpdatableElement<any, any>];
      if (!this.controller)
        setInitialProp(this, name, value);
      else {
        if (opts.path)
          this.controller[opts.path][name as keyof O] = value as O[keyof O];
        else
          this.controller[name as keyof ApolloController] = value as never;
        if (opts.onSet)
          opts.onSet.call(this, value, old);
      }
      this.requestUpdate?.(propertyKey, old);
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
  return function<T extends ApolloHTMLElement<any, any>>(
    proto: T,
    name: string & keyof T
  ): void {
    if (isReactiveElement(proto))
      defineOnReactiveElement(proto, name as string & keyof ApolloHTMLElement<any, any>, options);
    else
      defineOnHTMLElement(proto, name as string & keyof ApolloHTMLElement<any, any>, options);
  };
}
