import type { Constructor } from '@apollo-elements/interfaces';
import { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';

import { cuid } from './cuid';

type Type = 'client' | 'subscription' | 'mutation' | 'query';

const noop = () => void null;

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

function unsafeApplyPrototype<S extends HTMLElement>(
  target: S,
  source: Constructor<S>,
  omit: string[] = [],
): PropertyDescriptorMap {
  const descriptors =
    getPrototypeDescriptor(source);

  const omitThese: Record<keyof S, boolean> =
    omit.reduce((hash, k) => Object.assign(hash, { [k]: true }), {} as Record<keyof S, boolean>);

  const propertiesToAssign =
    Object.fromEntries(
      Object.entries(descriptors)
        .filter(([key]) => !omitThese[key as keyof S])
        .map(([key, descriptor]) => {
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
  omit?: string[]
): void {
  // @ts-expect-error: can't be helped.
  host.constructor.documentType = type === 'client' ? 'document' : type; /* c8 ignore next */ // covered

  DESCRIPTORS.set(host, {
    ...getElementDescriptor(host),
    ...unsafeApplyPrototype(host, klass, omit),
  });
}

function unsafeApplyElement<T extends ApolloElementElement>(
  host: T,
  effects: (host: T) => void
): void {
  effects(host);
  ELEMENT_APPLIED
    .set(host, unsafeApplyPrototype(host, ApolloElementElement));
}

/**
 * Applies a class' prototype to an element, mixing in the class' properties and methods to the element instance.
 *
 * @param  host Element to apply prototype properties to.
 * @param  klass Class whose prototype to apply to the host element.
 * @param  type Hint about what kind of class/host pair is in question.
 * @param  effects function that will run the first time this element has a class prototype mixed in via this helper.
 * @param  omit optional list of property names to omit when applying the prototype
 * @return Combined `PropertyDescriptorMap` for the instance.
 */
export function applyPrototype<T extends ApolloElementElement<any, any>>( // eslint-disable-line @typescript-eslint/no-explicit-any
  host: T,
  klass: Constructor<T> | typeof ApolloElementElement,
  options: {
    type: Type,
    effects?: (host: T) => void,
    omit?: string[],
  }
): PropertyDescriptorMap {
  if (!isElementApplied(host) || klass === ApolloElementElement) /* c8 ignore next */ // covered
    unsafeApplyElement(host, options.effects ?? noop);

  if (!getDescriptor(host) || klass !== ApolloElementElement) /* c8 ignore next */ // covered
    unsafeApply(host, klass, options.type, options.omit);

  return getDescriptor(host);
}
