import type { InMemoryCacheConfig, NormalizedCacheObject } from '@apollo/client/core';

import type {
  HelloQueryVariables,
  HelloWorld,
  Input,
  NonNull,
  NonNullableParamQueryVariables,
  NoParam,
  Nullable,
  NullableParamQueryVariables,
  UpdateUserMutationVariables,
  User,
} from './schema';

import { ApolloClient, InMemoryCache } from '@apollo/client/core';

import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

import TestSchema from './graphql/test.schema.graphql';

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
    __APOLLO_STATE__?: InMemoryCacheConfig;
  }
}

const typeDefs = TestSchema.loc!.source.body;

const mocks = {
  NonNull(_: any, { nonNull }: NonNullableParamQueryVariables): NonNull {
    if (nonNull === 'error')
      throw new Error(nonNull);
    else
      return { nonNull };
  },

  Nullable(_: any, { nullable }: NullableParamQueryVariables): Nullable {
    if (nullable === 'error')
      throw new Error(nullable);
    else
      return { nullable };
  },

  NoParam(): NoParam {
    return { noParam: 'noParam' };
  },

  HelloWorld(_: any, { name, greeting }: HelloQueryVariables): HelloWorld {
    return {
      name: name ?? 'Chaver',
      greeting: greeting ?? 'Shalom',
    };
  },

  User(_: any, { username, haircolor }: UpdateUserMutationVariables): User {
    return {
      username,
      haircolor,
      nickname: `${haircolor} ${username}`,
    };
  },

  Input(_: any, { input }: Input): Input {
    return input;
  },
};

const unmocked = makeExecutableSchema({ typeDefs, resolvers: {
  Subscription: {
    async nonNullParam(_, { nonNull }) {
      return nonNull;
    },
  },
} });

// @ts-expect-error: it's fine
const schema = addMocksToSchema({ schema: unmocked, mocks });

export function setupClient(): void {
  window.__APOLLO_CLIENT__ = makeClient();
}

export function teardownClient(): void {
  window.__APOLLO_CLIENT__ = undefined;
}

export function makeClient(): ApolloClient<NormalizedCacheObject> {
  // Create the Apollo Client
  return new ApolloClient({
    connectToDevTools: false,
    cache: new InMemoryCache({
      // prevent warnings when testing mutations
      typePolicies: {
        NoParam: {
          keyFields: ['noParam'],
        },
      },
    }),
    link: new SchemaLink({ schema }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
  });
}

export const client = makeClient();
