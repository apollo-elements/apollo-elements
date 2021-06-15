import type { NormalizedCacheObject, TypePolicies } from '@apollo/client/core';

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';

import { hasAllVariables } from './has-all-variables.js';

interface Options {
  /** URI to the client's GraphQL endpoint. */
  uri?: string;
  /** The client's [type policies](https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields). */
  typePolicies?: TypePolicies;
  /** When true, client will not fetch operations that do not have all their non-nullable variables set. */
  validateVariables?: boolean;
}

export type SimpleApolloClient =
  ApolloClient<NormalizedCacheObject> & { cache: InMemoryCache };

const validateVariablesLink =
  new ApolloLink((operation, forward) =>
    hasAllVariables(operation) ? forward(operation) : null); /* c8 ignore next */ // covered

/**
 * Creates a simple ApolloClient
 * @param options Limited configuration options for the client.
 * @returns A simple Apollo client instance.
 */
export function createApolloClient(options: Options): ApolloClient<NormalizedCacheObject> {
  const { uri, typePolicies, validateVariables } = options;
  const cache = new InMemoryCache({ typePolicies });
  const httpLink = new HttpLink({ uri });
  const link = !validateVariables ? httpLink : ApolloLink.from([validateVariablesLink, httpLink]);
  return new ApolloClient({ cache, link });
}
