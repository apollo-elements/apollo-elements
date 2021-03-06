import type { TypePolicies } from '@apollo/client/core';
import type { Policies } from '@apollo/client/cache/inmemory/policies';
import type {
  ApolloElementInterface,
  Constructor,
  Data,
  Variables,
} from '@apollo-elements/interfaces';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

declare module '@apollo/client/cache' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface ApolloCache<TSerialized> {
    policies: Policies;
  }
}

declare class MixinInstance {
  constructor(...a: any[]);

  /**
   * TypePolicies for the component
   */
  typePolicies?: TypePolicies;
}

function TypePoliciesMixinImpl<B extends Constructor<ApolloElementInterface>>(
  superclass: B
): MixinInstance & B {
  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/37142
  class TypePoliciesElement<D, V> extends superclass {
    declare data: Data<D> | null;

    declare variables: Variables<D, V> | null;

    /**
     * TypePolicies for the component
     */
    declare typePolicies?: TypePolicies;

    connectedCallback() {
      super.connectedCallback?.();
      if (this.typePolicies)
        this.client?.cache.policies.addTypePolicies(this.typePolicies);
    }
  }

  return TypePoliciesElement;
}

/**
 * Lazily adds TypePolicies to the Apollo client when the element connects to the DOM
 * Provides a `typePolicies` instance property.
 */
export const TypePoliciesMixin =
  dedupeMixin(TypePoliciesMixinImpl);
