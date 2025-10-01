import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

const USERS = [ ];

const schema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID
      name: String
    }

    type Mutation {
      addUser(name: String): User
    }

    type Query {
      users: [User]
    }
  `,
  resolvers: {
    Query: { users: async () => USERS },
    Mutation: {
      async addUser(_, { name }) {
        const id = Math.max(...USERS.map(x => x.id)) + 1
        const user = { id, name }
        USERS.push(user)
        return user;
      }
    },
  }
});

document.querySelector('apollo-client')
  .client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  });
