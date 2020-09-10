import type { TypePolicies } from '@apollo/client/core';
import type { ApolloElementInterface, Constructor } from '@apollo-elements/interfaces';
import type { Policies } from '@apollo/client/cache/inmemory/policies';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

declare module '@apollo/client/cache' {
  export interface ApolloCache<TSerialized> {
    policies: Policies;
  }
}

function TypePoliciesMixinImpl<B extends Constructor<ApolloElementInterface>>(superclass: B) {
  return class TypePoliciesElement extends superclass {
    /**
     * TypePolicies for the component
     */
    declare typePolicies?: TypePolicies;

    constructor(...a: any[]) {
      super(...a);
      if (this.typePolicies)
        this.client.cache.policies.addTypePolicies(this.typePolicies);
    }
  };
}

/**
 * Lazily adds TypePolicies to the Apollo client when the element connects to the DOM
 * Provides a `typePolicies` instance property.
 */
export const TypePoliciesMixin =
  dedupeMixin(TypePoliciesMixinImpl);
