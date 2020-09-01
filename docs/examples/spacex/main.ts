import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

import { client } from './client';

import './components/latest-launch';
import './components/next-launch';

window.__APOLLO_CLIENT__ =
  client;

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
  }
}
