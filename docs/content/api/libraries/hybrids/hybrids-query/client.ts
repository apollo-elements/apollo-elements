import type { InMemoryCacheConfig, NormalizedCacheObject } from '@apollo/client/core';

import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

export interface User {
  id: string;
  name: string;
  status?: 'DELETED';
};

const typeDefs = `
  type User {
    name: String
    id: ID
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String): User
    removeUser(id: ID): User
  }
`;

const USERS = [
  { id: 1, name: 'Neil' }
];

const randomDelay = () =>  new Promise(r => setTimeout(r, Math.random() * 500));

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers: {
        Query: {
          users() {
            return USERS.filter(x => x.status !== 'DELETED');
          }
        },
        Mutation: {
          async addUser(_, { name }) {
            const user = { name, id: Math.max(...USERS.map(x => x.id)) + 1 };
            USERS.push(user);
            await randomDelay()
            return user;
          },
          async removeUser(_, { id }) {
            const user = USERS.find(x => x.id == parseInt(id));
            user.status = 'DELETED';
            await randomDelay();
            return user;
          }
        }
      }
    }),
  }),
});

window.__APOLLO_CLIENT__ = client;
