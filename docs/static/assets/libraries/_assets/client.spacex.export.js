import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql' }),
});
