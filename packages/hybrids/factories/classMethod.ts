import type { Constructor } from '@apollo-elements/interfaces/constructor';
import type { Descriptor } from 'hybrids';

/**
 * Given a class and a method name, will produce
 * a Hybrids descriptor of a bound instance of the method.
 *
 * @example
 * ```js
 * class CustomElement extends HTMLElement { layout() { ... } }
 *
 * define('uses-layout', {
 *   layout: classMethod(CustomElement, 'layout'),
 * });
 * ```
 */
export function classMethod<TInstance extends HTMLElement, Key extends keyof TInstance>(
  prototype: Constructor<TInstance> & { is?: string },
  key: Key,
): Descriptor<TInstance> {
  return {
    get(host): TInstance[Key] {
      const method = prototype.prototype[key];
      if (typeof method !== 'function')
        throw new TypeError(`${prototype.name}#${key} is not a function`);

      return method.bind(host);
    },
  };
}
