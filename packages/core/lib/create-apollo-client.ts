import type { TypePolicies } from "@apollo/client";

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

import { LocalState } from "@apollo/client/local-state";

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
  ApolloClient & { cache: InMemoryCache };

const validateVariablesLink =
  new ApolloLink((operation, forward) => {
    const result = hasAllVariables(operation) ? forward(operation) : null;
    return result!;
  });/* c8 ignore next */ // covered

/**
 * Creates a simple ApolloClient
 * @param options Limited configuration options for the client.
 * @returns A simple Apollo client instance.
 */
export function createApolloClient(options: Options): ApolloClient {
  const { uri, typePolicies, validateVariables } = options;
  const cache = new InMemoryCache({ typePolicies });
  const httpLink = new HttpLink({ uri });
  const link = !validateVariables ? httpLink : ApolloLink.from([validateVariablesLink, httpLink]);
  return new ApolloClient({
    cache,
    link,

    /*
    Inserted by Apollo Client 3->4 migration codemod.
    If you are not using the `@client` directive in your application,
    you can safely remove this option.
    */
    localState: new LocalState({}),

    // Incremental handler removed for Apollo Client v4 compatibility
  });
}

// Apollo Client v4 migration codemod artifacts removed

