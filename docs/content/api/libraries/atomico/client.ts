import type { NormalizedCacheObject } from '@apollo/client/core';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

export interface Greeting {
  name: string;
  greeting: string
};

const typeDefs = `
  type Greeting {
    name: String
    greeting: String
  }

  type Query {
    hello(name: String, greeting: String): Greeting
  }
`;

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  // client-side mocked GraphQL server. Swap comments to query a live server.
  // link: new HttpLink({ uri: 'https://your.graphql.server/graphql' }),
  link: new SchemaLink({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers: {
        Query: {
          hello(_: any, { name = 'World', greeting = 'Hello' }): Greeting {
            return { name, greeting };
          }
        }
      }
    }),
  }),
});
