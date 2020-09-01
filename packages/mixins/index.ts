import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

export { ApolloElementMixin } from './apollo-element-mixin';
export { ApolloQueryMixin } from './apollo-query-mixin';
export { ApolloMutationMixin } from './apollo-mutation-mixin';
export { ApolloSubscriptionMixin } from './apollo-subscription-mixin';

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
  }
}
