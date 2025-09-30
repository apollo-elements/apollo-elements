import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

async function randomDelay(range = 2000) {
  await new Promise(r => setTimeout(r, Math.floor(Math.random() * range)));
}

const USERS = [];

const nextID = () => (Math.max(...USERS.map(x => x.id)) ?? 0) + 1;

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({
    schema: makeExecutableSchema({
      resolvers: {
        Query: {
          async users() {
            await randomDelay();
            return USERS;
          },
        },
        Mutation: {
          async addUser(_, { name }) {
            const user = { name, id: nextID() };
            USERS.push(user);
            await randomDelay();
            return user;
          },
        },
      },
      typeDefs: `
        type User {
          id: ID!
          name: String!
        }

        type Query {
          users: [User]
        }

        type Mutation {
          addUser(name: String!): User
        }
      `
    }),
  }),
});

document.querySelector('apollo-client').client = client;
