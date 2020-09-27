import { Descriptor, property } from 'hybrids';

export function accessors<TInstance extends HTMLElement>(
  instance: TInstance,
  key: keyof TInstance,
): Descriptor<TInstance> {
  let descriptor: PropertyDescriptor;

  function walkPrototypeChain(_instance: TInstance) {
    descriptor = Object.getOwnPropertyDescriptor(_instance, key);
    if (!descriptor)
      // @ts-expect-error: nasty prototype hacking. Why not?
      _instance = _instance.__proto__;
    else
      _instance = null;
  }

  while (instance)
    walkPrototypeChain(instance);

  if (!descriptor)
    return property(null);

  return {
    ...typeof descriptor.set === 'function' && {
      set<T>(host: TInstance, value: T): T {
        descriptor.set.call(host, value);
        return value;
      },
    },
    ...typeof descriptor.get === 'function' && {
      get<T>(host: TInstance): T {
        return descriptor.get.call(host);
      },
    },
  };
}
