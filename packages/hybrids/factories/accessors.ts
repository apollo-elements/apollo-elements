import { Descriptor, property } from 'hybrids';

export function accessors<TInstance extends HTMLElement>(
  instance: TInstance,
  key: keyof TInstance,
): Descriptor<TInstance> {
  let descriptor: PropertyDescriptor;

  while (instance) { // eslint-disable-line no-loops/no-loops
    descriptor = Object.getOwnPropertyDescriptor(instance, key);
    if (!descriptor)
      // @ts-expect-error: nasty prototype hacking. Why not?
      instance = instance.__proto__;
    else
      instance = null;
  }

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
