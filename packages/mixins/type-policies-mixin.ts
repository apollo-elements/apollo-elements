import type { InMemoryCache, TypePolicies } from '@apollo/client';
import type { Constructor } from '@apollo-elements/core/types';
import type { ApolloElementElement } from '@apollo-elements/core/types';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

function isInMemoryCache(cache: unknown): cache is InMemoryCache {
  return typeof cache === 'object' && !!cache && 'policies' in cache;
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
      if (this.typePolicies && isInMemoryCache(this.client?.cache))
        this.client?.cache?.policies?.addTypePolicies(this.typePolicies);
    }
  };
}

export const TypePoliciesMixin =
  dedupeMixin(TypePoliciesMixinImpl);
