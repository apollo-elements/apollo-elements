import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { ApolloServer, PubSub, gql } from 'apollo-server-express';

const prettyPrint = (x, tag = '') =>
  // eslint-disable-next-line no-console
  console.log(tag,
    typeof x !== 'object'
      ? x.toString()
      : JSON.stringify(x, null, 2)
  );

const pubsub = new PubSub();

const MESSAGE_SENT = 'MESSAGE_SENT';

const typeDefs = gql(readFileSync(`${__dirname}/schema.graphql`, 'utf8'));

let messages = [];

const resolvers = {
  Mutation: {
    sendMessage(_, { user, message }) {
      prettyPrint({ user, message }, 'Mutation sendMessage');
      const date = new Date().toISOString();
      const messageSent = { user, message, date };
      messages.push(messageSent);
      pubsub.publish(MESSAGE_SENT, { messageSent });
      return messageSent;
    },

    reset() {
      prettyPrint({ previous: messages }, 'Mutation reset');
      messages = [];
      return messages;
    },
  },

  Query: {
    messages: () =>
      prettyPrint(messages, 'Query messages') ||
      messages,
  },

  Subscription: {
    messageSent: {
      subscribe: () =>
        prettyPrint('Subscription messageSent') ||
        pubsub.asyncIterator(MESSAGE_SENT),
    },
  },
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';
const url = process.env.URL || `http://${host}:${port}`;
const app = express();
const http = createServer(app);

app.use(express.static('public'));
app.get(/^(?!.*(\.)|(graphi?ql).*)/, (req, res) =>
  res.sendFile(path.resolve('public', 'index.html'))
);

apolloServer.applyMiddleware({ app, path: '/graphql' });

apolloServer.installSubscriptionHandlers(http);

http.listen({ port }, () =>
  prettyPrint(`🚀 ${new Date().toISOString()} Apollo Server Listening at ${url}${apolloServer.graphqlPath}`)
);

const shutdown = () => process.kill(process.pid, 'SIGUSR2');

const onCloseSignal = code => {
  prettyPrint(`⏲️ ${new Date().toISOString()} Shutting down Apollo server with code ${code}.`);
  http.close(shutdown);
};

['SIGUSR2', 'SIGTERM'].forEach(sig => process.once(sig, onCloseSignal));
