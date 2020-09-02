export * from './apollo-element';
export * from './apollo-mutation';
export * from './apollo-query';
export * from './apollo-subscription';
export * from './constructor';

import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
  }
}
