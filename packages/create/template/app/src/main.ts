import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

import { client } from './client';

import './components/app';

window.__APOLLO_CLIENT__ =
  client;

customElements.whenDefined('apollo-app')
  .then(() => document.body.removeAttribute('unresolved'));

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
  }
}
