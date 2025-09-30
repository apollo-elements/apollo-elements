import { useQuery } from '@apollo-elements/atomico';
import { client } from './specific-apollo-client';

// There is no ApolloClientMixin for Haunted, rather
// the `useQuery`, `useMutation`, and `useSubscription` hooks accept a client option.

function ConnectedQuery() {
  const { data } = useQuery(gql`query ConnectedQuery { connected }`, { client });
  return <host>...</host>;
}
