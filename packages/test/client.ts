import type { InMemoryCacheConfig, NormalizedCacheObject } from '@apollo/client/core';

import type * as S from './schema';

import { ApolloClient, InMemoryCache } from '@apollo/client/core';

import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { aTimeout } from '@open-wc/testing';

import TestSchema from './graphql/test.schema.graphql';

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
    __APOLLO_STATE__?: InMemoryCacheConfig;
  }
}

let MESSAGES = 0;

export function resetMessages(): void {
  MESSAGES = 0;
}

const noParam = () => ({ noParam: 'noParam' });

async function nullableParam(_: any, { nullable = 'Hello World', delay }: S.NullableParamMutationVariables): Promise<S.Nullable> {
  if (delay != null)
    await aTimeout(delay);
  if (nullable === 'error')
    throw new Error(nullable);
  else
    return { nullable };
}

const schema = makeExecutableSchema({
  typeDefs: TestSchema.loc!.source.body,
  resolvers: {
    Message: {
      message: () => `Message ${++MESSAGES}`,
    },

    NoParam: {
      noParam: () => 'noParam',
    },

    Subscription: {

      async messageSent() {
        return {};
      },

      async nonNullParam(_, { nonNull }) {
        if (nonNull === 'error')
          throw new Error('error');
        else
          return { nonNull };
      },

      async noParam() {
        await aTimeout(20);
        return { noParam: 'noParam' };
      },

      nullableParam,

      pageAdded() {
        return 11;
      },
    },

    Query: {

      messages() {
        return [{}, {}];
      },

      noParam,

      helloWorld(_: any, { name, greeting }: S.HelloQueryVariables): S.HelloWorld {
        if (name === 'error')
          throw new Error('Bad name');
        else if (name === 'partial')
          return { greeting: greeting ?? 'Shalom' };
        else
          return { name: name ?? 'Chaver', greeting: greeting ?? 'Shalom' };
      },

      nonNullParam(_: any, { nonNull }: S.NonNull): S.NonNull {
        if (nonNull === 'error')
          throw new Error(nonNull);
        else
          return { nonNull };
      },

      pages(_: any, { offset, limit }: S.PaginatedQueryVariables) {
        if (typeof limit === 'number' && limit >= 100)
          throw new Error('rate limited');
        return Array.from({ length: limit ?? 10 }, (_, i) => i + 1 + (offset ?? 0));
      },

      nullableParam,

    },

    Mutation: {

      noParam,

      inputParam(_: any, { input }: { input: S.ABInput }): S.AB {
        return {
          a: input.a || 'a',
          b: input.b || 'b',
        };
      },

      nullableParam,

      updateUser(_: any, { username, haircolor }: S.User): S.User {
        return {
          username,
          haircolor,
          nickname: `${haircolor} ${username}`,
        };
      },

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

export function makeClient({ connectToDevTools = false } = {}): ApolloClient<NormalizedCacheObject> {
  // Create the Apollo Client
  return new ApolloClient({
    connectToDevTools,
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
