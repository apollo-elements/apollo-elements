import { useQuery } from '@apollo-elements/atomico';
import { client } from './specific-apollo-client';

function ConnectedQuery() {
  const { data } = useQuery(gql`query ConnectedQuery { connected }`, { client });
  return <host>...</host>;
}
