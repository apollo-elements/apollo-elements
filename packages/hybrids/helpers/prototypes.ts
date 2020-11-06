import { Constructor } from '@apollo-elements/interfaces/constructor';

import { property } from 'hybrids';

import { cuid } from './cuid';

import * as cache from 'hybrids/esm/cache';

import { ApolloElementElement } from '../factories/client';

type Type = 'client' | 'subscription' | 'mutation' | 'query';

const INSTANCES = new WeakMap();

const DESCRIPTORS = new WeakMap();

const ELEMENT_APPLIED = new WeakMap();

function isElementApplied<T extends HTMLElement>(host: T): boolean {
  return ELEMENT_APPLIED.has(host);
}

function getElementDescriptor<T extends HTMLElement>(host: T): PropertyDescriptorMap {
  return ELEMENT_APPLIED.get(host);
}

export function getDescriptor<T extends HTMLElement>(host: T): PropertyDescriptorMap {
  return DESCRIPTORS.get(host);
}

function getPrototypeDescriptor<S extends HTMLElement>(
  source: Constructor<S>,
): PropertyDescriptorMap {
  /** Properties to not redefine */
  const exclude = ['client', 'data', 'error', 'errors', 'loading'];

  // class fields need a real instance in order to get their descriptors.
  if (!INSTANCES.get(source)) {
    customElements.define(`apollo-elements-hybrids-intermediate-element-${cuid()}`, source);
    INSTANCES.set(source, new source());
  }

  const descriptors = {
    ...Object.getOwnPropertyDescriptors(INSTANCES.get(source)),
    ...Object.getOwnPropertyDescriptors(Object.getPrototypeOf(source.prototype)),
  };

  delete descriptors.constructor;

  exclude.forEach(key => delete descriptors[key]);

  return descriptors;
}

function applyPrototype<S extends HTMLElement>(
  target: S,
  source: Constructor<S>,
): PropertyDescriptorMap {
  const descriptors =
    getPrototypeDescriptor(source);

  const propertiesToAssign =
    Object.fromEntries(Object.entries(descriptors).map(([key, descriptor]) => {
      if (typeof descriptor?.value === 'function')
        return [key, { ...descriptor, value: descriptor.value.bind(target) }];
      else
        return [key, descriptor];
    }));


  Object.defineProperties(target, propertiesToAssign);

  return propertiesToAssign;
}

interface HookHybridsOptions<T> {
  host: T,
  key: keyof T|string,
  init: unknown
}

export function hookIntoHybridsRender<T>(opts: HookHybridsOptions<T>): void {
  const { host, init, key } = opts;
  const config = property(init);
  Object.defineProperty(host, key, {
    enumerable: true,
    configurable: true,
    get() {
      return cache.get(host, key, config.get);
    },
    set(newValue) {
      cache.set(host, key, config.set, newValue);
    },
  });
}

function unsafeApplyElement<T extends ApolloElementElement>(host: T): void {
  // HACK: hook into hybrids reactivity system
  for (const [key, init] of Object.entries({
    data: null,
    error: null,
    errors: null,
    loading: false,
  }))
    hookIntoHybridsRender({ host, key, init });

  ELEMENT_APPLIED
    .set(host, applyPrototype(host, ApolloElementElement));
}

function unsafeApply<T extends ApolloElementElement>(
  host: T,
  klass: Constructor<T>,
  type: Type,
): void {
  // @ts-expect-error: can't be helped.
  host.constructor.documentType = type === 'client' ? 'document' : type;

  DESCRIPTORS.set(host, {
    ...getElementDescriptor(host),
    ...applyPrototype(host, klass),
  });
}

export function apply<T extends ApolloElementElement>(
  host: T,
  klass: Constructor<T> | typeof ApolloElementElement,
  type: Type
): PropertyDescriptorMap {
  if (!isElementApplied(host) || klass === ApolloElementElement)
    unsafeApplyElement(host);

  if (!getDescriptor(host) || klass !== ApolloElementElement)
    unsafeApply(host, klass, type);

  return getDescriptor(host);
}
