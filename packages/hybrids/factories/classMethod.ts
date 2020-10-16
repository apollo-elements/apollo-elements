import type { Constructor } from '@apollo-elements/interfaces/constructor';
import type { Descriptor } from 'hybrids';

/**
 * Given an instance of a custom element class and a method key, will produce
 * a Hybrids descriptor which gets a bound instance of the method.
 */
export function classMethod<TInstance extends HTMLElement, Key extends keyof TInstance>(
  prototype: Constructor<TInstance> & { is?: string },
  key: Key
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
