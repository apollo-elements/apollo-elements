import type { Constructor } from '@apollo-elements/interfaces/constructor';
import type { Descriptor } from 'hybrids';

import { getPrototypicalPropertyDescriptor } from '@apollo-elements/lib/getPrototypicalPropertyDescriptor';
import { property } from 'hybrids';

const instances =
  new WeakMap<Constructor, unknown>();

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
