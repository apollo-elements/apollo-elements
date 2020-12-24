import { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';
import { DocumentNode } from '@apollo/client/core';

interface PropertyEffectOptions<C extends ApolloElementElement> {
  /** Name of the property. */
  name: keyof C,
  /** The property's initial value. */
  init?: C[keyof C];
  /**
   * Side effect to run when setting the property.
   *
   * @this bound to the element instance.
   * @param value The new value.
   */
  onSet(this: C, value: C[keyof C]): void;
}

/**
 * Creates a `PropertyDescriptor` for a boolean property that reflects to a boolean attribute
 *
 * @param  attr Attribute name
 */
export function booleanAttr<C extends ApolloElementElement>(
  attr: string
): PropertyDescriptor {
  return {
    configurable: true,
    enumerable: true,

    get(this: C): boolean {
      return this.hasAttribute(attr);
    },

    set(this: C, v: boolean) {
      if (v)
        this.setAttribute(attr, '');
      else
        this.removeAttribute(attr);
    },

  };
}

/**
 * Creates a `PropertyDescriptor` for a property that runs a given side effect when set.
 *
 * @param options Configuration for the property: it's name, initial value, and setter side-effect.
 */
export function effect<
  C extends ApolloElementElement,
>(options: PropertyEffectOptions<C>): PropertyDescriptor {
  const { name, init, onSet } = options;
  const privateName = `_${name}` as typeof name; // little white lies
  return {
    configurable: true,
    enumerable: true,

    get(this: C) {
      return this[privateName] ?? init;
    },

    set(this: C, value) {
      this[privateName] = value;
      onSet.call(this, value);
    },
  };
}

/**
 * Creates a `PropertyDescriptor` for an `ApolloElement`'s `document` property.
 */
export function gqlDocument<C extends ApolloElementElement>(): PropertyDescriptor {
  return {
    configurable: true,
    enumerable: true,

    get(this: C): DocumentNode | null {
      return this.document;
    },

    set(this: C, document) {
      this.document = document;
    },

  };
}

/**
 * Creates a `PropertyDescriptor` for a writable property.
 *
 * @param  init The property's initial value.
 */
export function writable(init?: unknown): PropertyDescriptor {
  return {
    configurable: true,
    enumerable: true,
    writable: true,
    value: init,
  };
}
