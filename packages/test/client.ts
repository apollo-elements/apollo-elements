import type { InMemoryCacheConfig, NormalizedCacheObject } from '@apollo/client/core';

import type * as S from './schema';

import { ApolloClient, InMemoryCache } from '@apollo/client/core';

import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

import { aTimeout } from '@open-wc/testing';

import TestSchema from './graphql/test.schema.graphql';

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
    __APOLLO_STATE__?: InMemoryCacheConfig;
  }
}

const unmocked = makeExecutableSchema({
  typeDefs: TestSchema.loc!.source.body,
  resolvers: {
    Subscription: {

      async nonNullParam(_, { nonNull }) {
        return nonNull;
      },

      async noParam() {
        await aTimeout(20);
        return { noParam: 'noParam' };
      },

      async nullableParam(_: any, { nullable }: S.NullableParamQueryVariables) {
        await aTimeout(20);
        if (nullable === 'error')
          throw new Error(nullable);
        else
          return { nullable };
      },

      pageAdded() {
        return 11;
      },
    },

    Query: {

      pages(_: any, { offset, limit }: S.PaginatedQueryVariables) {
        if (typeof limit === 'number' && limit >= 100)
          throw new Error('rate limited');
        return Array.from({ length: limit ?? 10 }, (_, i) => i + 1 + (offset ?? 0));
      },

      async nullableParam(_: any, { nullable, delay }: S.NullableParamMutationVariables): Promise<S.Nullable> {
        if (delay != null)
          await aTimeout(delay);
        if (nullable === 'error')
          throw new Error(nullable);
        else
          return { nullable };
      },

    },

    Mutation: {

      async nullableParam(_: any, { nullable, delay }: S.NullableParamMutationVariables): Promise<S.Nullable> {
        if (delay != null)
          await aTimeout(delay);
        if (nullable === 'error')
          throw new Error(nullable);
        else
          return { nullable };
      },

    },
  },
});

let MESSAGES = 0;

export function resetMessages(): void {
  MESSAGES = 0;
}

const schema = addMocksToSchema({
  schema: unmocked,
  preserveResolvers: true,
  mocks: {
    Message() {
      return { message: `Message ${++MESSAGES}` };
    },

    NonNull(_: any, { nonNull }): S.NonNull {
      if (nonNull === 'error')
        throw new Error(nonNull);
      else
        return { nonNull };
    },

    Nullable(_: any, { nullable }: S.NullableParamQueryVariables): S.Nullable {
      if (nullable === 'error')
        throw new Error(nullable);
      else
        return { nullable };
    },

    NoParam(): S.NoParam {
      return { noParam: 'noParam' };
    },

    HelloWorld(_: any, { name, greeting }: S.HelloQueryVariables): S.HelloWorld {
      if (name === 'error')
        throw new Error('Bad name');
      else if (name === 'partial')
        return { greeting: greeting ?? 'Shalom' };
      else
        return { name: name ?? 'Chaver', greeting: greeting ?? 'Shalom' };
    },

    User(_: any, { username, haircolor }): S.User {
      return {
        username,
        haircolor,
        nickname: `${haircolor} ${username}`,
      };
    },

    AB(_: any, { input }): S.AB {
      return {
        a: input.a || 'a',
        b: input.b || 'b',
      };
    },
  },
});

export function setupClient(): void {
  window.__APOLLO_CLIENT__ = makeClient();
}

function resetMocks() {
  resetMessages();
}

export function teardownClient(): void {
  resetMocks();
  window.__APOLLO_CLIENT__ = undefined;
}

export function makeClient(): ApolloClient<NormalizedCacheObject> {
  // Create the Apollo Client
  return new ApolloClient({
    connectToDevTools: false,
    link: new SchemaLink({ schema }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
    cache: new InMemoryCache({
      // prevent warnings when testing mutations
      typePolicies: {
        NoParam: {
          keyFields: ['noParam'],
        },
        Query: {
          fields: {
            messages: {
              keyArgs: false,
              merge(p = [], n) {
                return [...p, ...n];
              },
            },

            pages: {
              keyArgs: false,
              merge(p = [], n) {
                return [...p, ...n];
              },
            },
          },
        },
      },
    }),
  });
}

export const client = makeClient();
