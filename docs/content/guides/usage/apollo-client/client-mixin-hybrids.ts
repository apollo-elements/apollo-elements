import { query, define, html } from '@apollo-elements/hybrids';
import { client as apolloClient } from './specific-apollo-client';

// There is no ApolloClientMixin for Hybrids, rather pass the client
// to the `query`, `mutation`, or `subscription` factory.

define('connected-query', {
  query: query(gql`query ConnectedQuery { connected }`, { client }),
});
