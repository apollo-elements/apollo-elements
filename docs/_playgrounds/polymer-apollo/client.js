import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

const schema = makeExecutableSchema({
  typeDefs: `
    type Greeting {
      name: String
      greeting: String
    }

    type Query {
      hello(name: String, greeting: String): Greeting
    }
  `,
  resolvers: {
    Query: {
      async hello(_, { name = 'World', greeting = 'Hello' }) {
        return { name, greeting };
      }
    },
  }
});

document.querySelector('apollo-client')
  .client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  });
