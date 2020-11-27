import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  TypePolicies,
} from '@apollo/client/core';
import { hasAllVariables } from './has-all-variables';

interface Options {
  /** GraphQL endpoint URI */
  uri?: string;
  /** Optional type policies to apply to the cache. */
  typePolicies?: TypePolicies;
  /** When true, client will not fetch operations that do not have all their non-nullable variables set */
  validateVariables?: boolean;
}

const validateVariablesLink =
  new ApolloLink((operation, forward) =>
    hasAllVariables(operation) ? forward(operation) : null); /* c8 ignore next */ // this is called

/**
 * Creates a simple ApolloClient
 */
export function createApolloClient(options: Options): ApolloClient<NormalizedCacheObject> {
  const { uri, typePolicies, validateVariables } = options;
  const cache = new InMemoryCache({ typePolicies });
  const httpLink = new HttpLink({ uri });
  const link = !validateVariables ? httpLink : ApolloLink.from([validateVariablesLink, httpLink]);
  return new ApolloClient({ cache, link });
}
