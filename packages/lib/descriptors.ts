import { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';
import { DocumentNode } from '@apollo/client/core';

export function writable(init?: unknown): PropertyDescriptor {
  return {
    configurable: true,
    enumerable: true,
    writable: true,
    value: init,
  };
}

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

interface PropertyEffectOptions<C extends ApolloElementElement> {
  name: keyof C,
  init?: C[keyof C];
  onSet(this: C, value: C[keyof C]): void;
}

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
