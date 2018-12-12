import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { ApolloServer, PubSub, gql } from 'apollo-server-express';

const pubsub = new PubSub();

const MESSAGE_SENT = 'MESSAGE_SENT';

const typeDefs = gql(readFileSync(`${__dirname}/schema.graphql`, 'utf8'));

let messages = [];

const resolvers = {
  Mutation: {
    sendMessage(_, { user, message }) {
      const date = new Date().toISOString();
      const messageSent = { user, message, date };
      messages.push(messageSent);
      pubsub.publish(MESSAGE_SENT, { messageSent });
      return messageSent;
    },

    reset() {
      messages = [];
      return messages;
    },
  },

  Query: {
    messages: () => messages,
  },

  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_SENT),
    },
  },
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = process.env.PORT || 8000;
const url = process.env.URL || `http://localhost:${port}`;
const app = express();
const http = createServer(app);

app.use(express.static('public'));
app.get(/^(?!.*(\.)|(graphi?ql).*)/, (req, res) =>
  res.sendFile(path.resolve('public', 'index.html'))
);

apolloServer.applyMiddleware({ app, path: '/graphql' });

apolloServer.installSubscriptionHandlers(http);

http.listen({ port }, () => {
  console.log(`🚀  Apollo Server at ${url}${apolloServer.graphqlPath}`);
});
