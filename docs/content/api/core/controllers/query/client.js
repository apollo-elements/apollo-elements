import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

const USERS = [
  {
    id: 1,
    name: 'Neil',
    position: 'Commander',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Neil_Armstrong_pose.jpg/1024px-Neil_Armstrong_pose.jpg?1623601441968',
    quote: 'That’s one small step for a man, one giant leap for mankind.',
  },
  {
    id: 2,
    name: 'Buzz',
    position: 'Lunar Module Pilot',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Buzz_Aldrin.jpg/1024px-Buzz_Aldrin.jpg?1623601483170',
    quote: 'Those footprints belong to each and every one of you, to all mankind.',
  },
  {
    id: 3,
    name: 'Michael',
    position: 'Command Module Pilot',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Michael_Collins_%28S69-31742%2C_restoration%29.jpg/1024px-Michael_Collins_%28S69-31742%2C_restoration%29.jpg?1623601522599',
    quote: 'It’s human nature to stretch, to go, to see, to understand. Exploration is not a choice, really; it’s an imperative.',
  },
];

const schema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID
      name: String
      picture: String
      position: String
      quote: String
    }

    type Query {
      profile(id: ID): User
    }
  `,
  resolvers: {
    Query: {
      async profile(_, { id }) {
        await new Promise(r => setTimeout(r, Math.random() * 1000));
        return USERS.find(x => x.id == parseInt(id));
      }
    },
  }
});

document.querySelector('apollo-client')
  .client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  });
