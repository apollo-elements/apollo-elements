import ApolloClient from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

// import { HttpLink } from 'apollo-link-http';

import type { InMemoryCacheConfig } from 'apollo-cache-inmemory';

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
    __APOLLO_STATE__?: InMemoryCacheConfig;
  }
}

const typeDefs = `
  type Message {
    message: String
    user: String
    date: String
  }

  type NonNull {
    nonNull: String!
  }

  type Nullable {
    nullable: String
  }

  type NoParam {
    noParam: String
  }

  type Query {
    messages: [Message]
    nonNullParam(nonNull: String!): NonNull
    nullableParam(nullable: String): Nullable
    noParam: NoParam
  }

  type Subscription {
    messageSent: Message
    nullableParam(param: String): Nullable
    nonNullParam(param: String!): NonNull
  }

  type Mutation {
    sendMessage(user: String, message: String): Message
    nonNullableParam(param: String!): NonNull
    nullableParam(param: String): Nullable
    noParam: NoParam
    reset: [Message]
  }
`;

const mocks = {
  /* eslint-disable @typescript-eslint/explicit-function-return-type */

  NonNull: () => ({ nonNull: 'nonNull' }),

  Nullable: (_, { param }) => {
    if (param === 'error') throw new Error(param);
    return { nullable: 'nullable' };
  },

  NoParam: () => ({ noParam: 'noParam' }),

  /* eslint-enable @typescript-eslint/explicit-function-return-type */
};

const unmocked = makeExecutableSchema({ typeDefs });

const schema = addMocksToSchema({ schema: unmocked, mocks });

const link = new SchemaLink({ schema });

// const link = new HttpLink({ uri: 'http://localhost:8080/graphql' });

const cache = new InMemoryCache();
// Create the Apollo Client
export const client = new ApolloClient({ cache, link });

export function setupClient(): void {
  window.__APOLLO_CLIENT__ = client;
}

export function teardownClient(): void {
  window.__APOLLO_CLIENT__ = undefined;
}
