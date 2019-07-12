import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const typeDefs = `
  type Message {
    message: String
    user: String
    date: String
  }

  type Query {
    messages: [Message]
    needy(needed: String!): String
    foo: String
  }

  type Subscription {
    messageSent: Message
    foo(bar: String): String
  }

  type Mutation {
    sendMessage(user: String, message: String): Message
    reset: [Message]
    foo: String
  }
`;

const mocks = {
  Mutation: () => ({
    sendMessage(_, { user, message }) {
      const date = new Date().toISOString();
      const messageSent = { user, message, date };
      return messageSent;
    },

    reset() {
      return [];
    },

    foo() {
      return 'bar';
    },
  }),

  Query: () => ({
    messages: () => [],
    needy: () => 'needed',
    foo() {
      return 'bar';
    },
  }),

  Subscription: () => ({
    messageSent: { subscribe() { } },
    foo: { subscribe() { } },
  }),
};

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema, mocks });

const link = new SchemaLink({ schema });

const cache = new InMemoryCache(window.__APOLLO_STATE__);

const fetchPolicy = 'network-only';

const defaultOptions = { watchQuery: { fetchPolicy } };

// Create the Apollo Client
export const client = new ApolloClient({ cache, link, defaultOptions });
