import type { Constructor } from '@apollo-elements/interfaces';
import { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';

import { cuid } from './cuid';

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
  const exclude = ['client', 'data', 'error', 'errors', 'loading', 'networkStatus'];

  // class fields need a real instance in order to get their descriptors.
  if (!INSTANCES.get(source)) {
    customElements.define(`apollo-elements-intermediate-element-${cuid()}`, source);
    INSTANCES.set(source, new source());
  }

  const { constructor, ...descriptors } = {
    ...Object.getOwnPropertyDescriptors(INSTANCES.get(source)),
    ...Object.getOwnPropertyDescriptors(Object.getPrototypeOf(source.prototype)),
  };

  exclude.forEach(key => delete descriptors[key]);

  return descriptors;
}

export function applyPrototype<S extends HTMLElement>(
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

function unsafeApply<T extends ApolloElementElement>(
  host: T,
  klass: Constructor<T>,
  type: Type,
): void {
  // @ts-expect-error: can't be helped.
  host.constructor.documentType = type === 'client' ? 'document' : type; /* c8 ignore next */ // covered

  DESCRIPTORS.set(host, {
    ...getElementDescriptor(host),
    ...applyPrototype(host, klass),
  });
}

function unsafeApplyElement<T extends ApolloElementElement>(
  host: T,
  effects: (host: T) => void
): void {
  effects(host);
  ELEMENT_APPLIED
    .set(host, applyPrototype(host, ApolloElementElement));
}

const noop = () => void null;

export function apply<T extends ApolloElementElement<any, any>>(
  host: T,
  klass: Constructor<T> | typeof ApolloElementElement,
  type: Type,
  effects: (host: T) => void = noop,
): PropertyDescriptorMap {
  if (!isElementApplied(host) || klass === ApolloElementElement) /* c8 ignore next */ // covered
    unsafeApplyElement(host, effects);

  if (!getDescriptor(host) || klass !== ApolloElementElement) /* c8 ignore next */ // covered
    unsafeApply(host, klass, type);

  return getDescriptor(host);
}
