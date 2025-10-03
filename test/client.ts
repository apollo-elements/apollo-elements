import type { InMemoryCacheConfig } from '@apollo/client';

import type * as S from './schema';

import { ApolloClient, InMemoryCache } from '@apollo/client';

import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { aTimeout } from '@open-wc/testing';

import TestSchema from './graphql/test.schema.graphql';

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient;
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

      async *messageSent() {
        yield {};
        await aTimeout(10);
        yield {};
        await aTimeout(10);
        yield {};
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

export function makeClient({ connectToDevTools = false } = {}): ApolloClient {
  // Create the Apollo Client
  return new ApolloClient({
    devtools: { enabled: connectToDevTools },
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
              merge(existing = [], incoming, { readField, mergeObjects }) {
                // If incoming is a complete replacement (from subscription updateQuery),
                // just return it to avoid duplication
                if (incoming.length > existing.length) {
                  return incoming;
                }
                // Otherwise, append new messages
                return [...existing, ...incoming];
              },
            },

            pages: {
              keyArgs: false,
              merge(existing = [], incoming) {
                // If incoming data contains elements that overlap with existing data,
                // deduplicate to avoid showing duplicate pages
                if (existing.length === 0) {
                  return incoming;
                }

                // Find the highest value in existing data
                const maxExisting = Math.max(...existing);
                const minIncoming = Math.min(...incoming);

                // If incoming starts where existing ends, it's pagination (fetchMore)
                if (minIncoming > maxExisting) {
                  return [...existing, ...incoming];
                }

                // If there's overlap, merge without duplication
                const combined = [...existing];
                for (const item of incoming) {
                  if (!combined.includes(item)) {
                    combined.push(item);
                  }
                }
                return combined.sort((a, b) => a - b);
              },
            },
          },
        },
      },
    }),
  });
}

export const client = makeClient();
