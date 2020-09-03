import type {
  DefaultOptions,
  InMemoryCacheConfig,
  NormalizedCacheObject,
} from '@apollo/client/core';

import { ApolloClient, InMemoryCache } from '@apollo/client/core';

import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

import TestSchema from './test.schema.graphql';

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
    __APOLLO_STATE__?: InMemoryCacheConfig;
  }
}

const typeDefs = TestSchema.loc.source.body;

const mocks = {
  /* eslint-disable @typescript-eslint/explicit-function-return-type */

  NonNull: (_, { nonNull }) => {
    if (nonNull === 'error')
      throw new Error(nonNull);
    else
      return { nonNull };
  },

  Nullable: (_, { nullable }) => {
    if (nullable === 'error')
      throw new Error(nullable);
    else
      return { nullable };
  },

  NoParam: () => ({ noParam: 'noParam' }),

  HelloWorld: (_, { name }) => ({
    name: name ?? 'Chaver',
    greeting: 'Shalom',
  }),

  /* eslint-enable @typescript-eslint/explicit-function-return-type */
};

const cache = new InMemoryCache();

const unmocked = makeExecutableSchema({ typeDefs });

const schema = addMocksToSchema({ schema: unmocked, mocks });

const link = new SchemaLink({ schema });

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
  },
};

// Create the Apollo Client
export const client = new ApolloClient({ cache, link, defaultOptions });

export function setupClient(): void {
  window.__APOLLO_CLIENT__ = client;
}

export function teardownClient(): void {
  window.__APOLLO_CLIENT__ = undefined;
}
