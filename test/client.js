import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const host = '127.0.0.1:8000';

const WS_ENDPOINT = `ws://${host}/graphql`;
const HTTP_ENDPOINT = `http://${host}/graphql`;

function isWsOperation({ query }) {
  const { kind, operation } = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
}

const httpLink = new HttpLink({ uri: HTTP_ENDPOINT });
const wsLink = new WebSocketLink({ uri: WS_ENDPOINT, options: { reconnect: true } });
const link = split(isWsOperation, wsLink, httpLink);
const cache = new InMemoryCache();

// Create the Apollo Client
export const client = new ApolloClient({ cache, link });
