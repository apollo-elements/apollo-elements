import type { InMemoryCacheConfig, NormalizedCacheObject } from '@apollo/client/core';

import { ApolloClient, InMemoryCache } from '@apollo/client/core';

import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

import TestSchema from './test.schema.graphql';
import { HelloWorld, NonNull, NoParam, Nullable } from './schema';

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
    __APOLLO_STATE__?: InMemoryCacheConfig;
  }
}

const typeDefs = TestSchema.loc.source.body;

const mocks = {
  NonNull(_, { nonNull }): NonNull {
    if (nonNull === 'error')
      throw new Error(nonNull);
    else
      return { nonNull };
  },

  Nullable(_, { nullable }): Nullable {
    if (nullable === 'error')
      throw new Error(nullable);
    else
      return { nullable };
  },

  NoParam(): NoParam {
    return { noParam: 'noParam' };
  },

  HelloWorld(_, { name }): HelloWorld {
    return {
      name: name ?? 'Chaver',
      greeting: 'Shalom',
    };
  },
};

const unmocked = makeExecutableSchema({ typeDefs });

const schema = addMocksToSchema({ schema: unmocked, mocks });

// Create the Apollo Client
export const client =
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
  });

export function setupClient(): void {
  window.__APOLLO_CLIENT__ = client;
}

export function teardownClient(): void {
  window.__APOLLO_CLIENT__ = undefined;
}
