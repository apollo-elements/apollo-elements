import { Descriptor } from 'hybrids';

/**
 * Given an instance of a custom element class and a method key, will produce
 * a Hybrids descriptor which gets a bound instance of the method.
 */
export function classMethod<TInstance extends HTMLElement, Key extends keyof TInstance>(
  instance: TInstance,
  key: Key
): Descriptor<TInstance> {
  return {
    get(host): TInstance[Key] {
      const method = instance[key];
      if (typeof method !== 'function')
        throw new TypeError(`<${instance.tagName.toLowerCase()}>#${key} is not a function`);

      return method.bind(host);
    },
  };
}
