import '@apollo-elements/components';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

document.querySelector('apollo-mutation').client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({
    schema: makeExecutableSchema({
      typeDefs: `
        type User { name: String }
        type Mutation { addUser(name: String): User }
        type Query { user: User }
      `,
      resolvers: {
        Mutation: {
          addUser(_, { name = 'New User' }) {
            return { name };
          },
        },
        Query: {
          user: () => null,
        }
      },
    }),
  }),
});
