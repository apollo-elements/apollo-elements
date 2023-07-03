import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema, createMockStore } from '@graphql-tools/mock';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { subscribe } from 'event-iterator';

export interface User {
  id: number;
  name: string;
  status?: 'DELETED';
};

const typeDefs = `
  type User {
    name: String
    id: ID
  }

  type Subscription {
    userAdded: User
  }

  schema {
    subscription: Subscription
  }
`;

const USERS: User[] = [
  { id: 1, name: 'Neil' }
];

const getNextUserId = () => Math.max(...USERS.map(x => x.id)) + 1;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Subscription: {
      userAdded: {
        subscribe: () => subscribe.call(document.querySelector('button'), 'click'),
        resolve: () => makeNextUser()
      }
    }
  }
});

const store = createMockStore({ schema });

function makeNextUser() {
  const id = getNextUserId();
  return {
    name: store.get('User', id, 'name'),
    id: store.get('User', id, 'id'),
  };
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema }),
});
