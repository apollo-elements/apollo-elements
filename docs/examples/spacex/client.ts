import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const uri =
  'https://api.spacex.land/graphql';

export const link = new HttpLink({ uri });

const cache =
  new InMemoryCache();

export const client =
  new ApolloClient({ cache, link });
