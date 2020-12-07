export * from './apollo-element';
export * from './apollo-mutation';
export * from './apollo-query';
export * from './apollo-subscription';
export * from './constructor';
export * from './operation';

import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

export type Entries<T> = [keyof T, T[keyof T]][]

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
  }
}
