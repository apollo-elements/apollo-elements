import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

import '@apollo-elements/components';

const USERS = [
  { id: 1, name: 'Neil', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Neil_Armstrong_pose.jpg/1024px-Neil_Armstrong_pose.jpg?1623601441968' },
  { id: 2, name: 'Buzz', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Buzz_Aldrin.jpg/1024px-Buzz_Aldrin.jpg?1623601483170' },
  { id: 3, name: 'Michael', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Michael_Collins_%28S69-31742%2C_restoration%29.jpg/1024px-Michael_Collins_%28S69-31742%2C_restoration%29.jpg?1623601522599' },
];

const schema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID
      name: String
      picture: String
    }

    type SortOrder {
      dir: String
      by: String
    }

    type Query {
      me: User
      friends: [User]
    }
  `,
  resolvers: {

    Query: {
      async me() {
        return USERS.find(x => x.id === 1);
      },
      async friends() {
        return USERS.filter(x => x.id !== 1);
      }
    },

  }
});

document.querySelector('apollo-client')
  .client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  });
