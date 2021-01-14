import type { NormalizedCacheObject } from '@apollo/client/core';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const uri =
  '<%= GRAPHQL_URI %>';

export const link = new HttpLink({ uri });

const cache =
  new InMemoryCache();

export const client =
  new ApolloClient({ cache, link });

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
  }
}
