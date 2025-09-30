import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
window.__APOLLO_CLIENT__ = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://api.spacex.land/graphql' }),
});
