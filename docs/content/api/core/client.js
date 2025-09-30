import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { EventIterator } from 'event-iterator';

const USERS = [
  { id: 1, nick: 'Neil' },
  { id: 2, nick: 'Buzz' },
  { id: 3, nick: 'Michael' },
];

function makeNextUser() {
  return USERS[Math.floor(Math.random() * USERS.length)];
}

class Pub extends EventTarget {
  friend() {
    this.dispatchEvent(new Event('friend'));
    setTimeout(() => this.friend(), (Math.random() * 20000));
  }

  constructor() {
    super();
    setTimeout(() => this.friend(), (Math.random() * 20000));
  }
}

const schema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID
      nick: String
    }

    type Query {
      profile: User
    }

    type Mutation {
      updateProfile(nick: String): User
    }

    type Subscription {
      friendCameOnline: User
    }
  `,
  resolvers: {

    Query: {
      async profile() {
        return USERS.find(x => x.id === 1);
      }
    },

    Mutation: {
      async updateProfile(_, { nick }) {
        const user = USERS.find(x => x.id == 1);
        user.nick = nick;
        return user;
      }
    },

    Subscription: {
      friendCameOnline: {
        subscribe: () => EventIterator.subscribe.call(new Pub(), 'friend'),
        resolve: () => makeNextUser(),
      }
    }

  }
});

document.querySelector('apollo-client')
  .client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  });
