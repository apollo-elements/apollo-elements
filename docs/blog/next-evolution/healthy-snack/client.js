import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({
    schema: makeExecutableSchema({
      resolvers: {
        Query: {
          fruits: () => ['🍒', '🍎', '🍌', '🍑', '🥭', '🍍', '🥝', '🥑'],
          veggies: () => ['🥬', '🥒', '🌽', '🥕', '🍠', '🍅', '🥦', '🥔'],
        },
      },
      typeDefs: `
        type Query {
          fruits: [String]
          veggies: [String]
        }
      `
    }),
  }),
});
