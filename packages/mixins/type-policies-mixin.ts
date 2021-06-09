import type { TypePolicies } from '@apollo/client/core';
import type { Policies } from '@apollo/client/cache/inmemory/policies';
import type { Constructor } from '@apollo-elements/interfaces';
import type { ApolloElementElement } from '@apollo-elements/core/types';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

declare module '@apollo/client/cache' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface ApolloCache<TSerialized> {
    policies: Policies;
  }
}

/**
 * Lazily adds [`TypePolicies`](https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields)
 * to the Apollo client when the element connects to the DOM,
 * from the element's `typePolicies` instance property.
 */
function TypePoliciesMixinImpl<B extends Constructor<ApolloElementElement>>(
  superclass: B
): B & Constructor<{
  typePolicies?: TypePolicies;
}> {
  return class TypePoliciesElement extends superclass {
    /**
     * `TypePolicies` to lazy-load.
     */
    declare typePolicies?: TypePolicies;

    override connectedCallback() {
      super.connectedCallback?.();
      if (this.typePolicies)
        this.client?.cache.policies.addTypePolicies(this.typePolicies);
    }
  };
}

export const TypePoliciesMixin =
  dedupeMixin(TypePoliciesMixinImpl);
