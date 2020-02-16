export { ApolloElementMixin } from './apollo-element-mixin';
export { ApolloQueryMixin } from './apollo-query-mixin';
export { ApolloMutationMixin } from './apollo-mutation-mixin';
export { ApolloSubscriptionMixin } from './apollo-subscription-mixin';

import type { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
  }
}
