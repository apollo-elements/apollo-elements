import type { TypePolicies } from '@apollo/client';
// Note: Internal Policies interface no longer available in Apollo Client v4
// import type { Policies } from '@apollo/client/cache/inmemory/policies';
import type { Constructor } from '@apollo-elements/core/types';
import type { ApolloElementElement } from '@apollo-elements/core/types';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

// Note: Internal Policies interface no longer available for module augmentation in Apollo Client v4
// declare module '@apollo/client/cache' {
//   export interface ApolloCache<TSerialized> {
//     policies: Policies;
//   }
// }

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
        // Note: policies property access changed in Apollo Client v4
        (this.client?.cache as any)?.policies?.addTypePolicies(this.typePolicies);
    }
  };
}

export const TypePoliciesMixin =
  dedupeMixin(TypePoliciesMixinImpl);
