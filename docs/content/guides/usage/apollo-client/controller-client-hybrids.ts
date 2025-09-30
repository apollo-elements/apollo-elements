import { query, define, html } from '@apollo-elements/hybrids';
import { client as apolloClient } from './specific-apollo-client';

define('connected-query', {
  query: query(gql`query ConnectedQuery { connected }`, { client }),
});
