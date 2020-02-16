import type { ApolloElement } from '@apollo-elements/mixins/apollo-element';
import type { NormalizedCacheObject } from 'apollo-cache-inmemory';
import type { ApolloClient } from 'apollo-client';

export type Client = ApolloClient<NormalizedCacheObject>

export interface ClientFactory<TData> {
  get: (_: ApolloElement<TData>, last: Client) => Client;
  set: (_: ApolloElement<TData>, next: Client, last: Client) => Client;
}

export const clientFactory = <TData>(client?: Client): ClientFactory<TData> => ({
  get: (_host: ApolloElement<TData>, last: Client): Client =>
    last ?? client ?? window.__APOLLO_CLIENT__ ?? null,
  set: (_host: ApolloElement<TData>, next: Client, last: Client): Client =>
    (next === last ? last : next) ?? null,
});
