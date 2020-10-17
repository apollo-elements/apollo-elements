import type { Constructor } from '@apollo-elements/interfaces/constructor';
import type { Descriptor } from 'hybrids';

import { getPrototypicalPropertyDescriptor } from '@apollo-elements/lib/getPrototypicalPropertyDescriptor';
import { property } from 'hybrids';

const instances =
  new WeakMap<Constructor, unknown>();

/**
 * Given a class and a property key, will return a Hybrids descriptor for
 * the property's accessor or accessor pair.
 *
 * @example
 * ```js
 * class CustomElement extends HTMLElement {
 *   get property() { ... }
 *   set property(v) { ... }
 * }
 *
 * define('uses-property', {
 *   layout: classAccessor(CustomElement, 'property'),
 * });
 * ```
 */
export function classAccessors<
  TInstance extends HTMLElement,
>(klass: Constructor<TInstance>, key: keyof TInstance): Descriptor<TInstance> {
  if (!instances.get(klass))
    instances.set(klass, new klass());

  const instance =
    instances.get(klass) as TInstance;

  const descriptor =
    getPrototypicalPropertyDescriptor(instance, key);

  if (!descriptor)
    return property(null);

  const set = descriptor.set && function set<T>(host: TInstance, value: T): T {
    descriptor.set.call(host, value);
    return value;
  };

  const get = descriptor.get && function get<T>(host: TInstance): T {
    return descriptor.get.call(host);
  };

  return { set, get };
}
