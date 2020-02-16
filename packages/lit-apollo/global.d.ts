import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}
