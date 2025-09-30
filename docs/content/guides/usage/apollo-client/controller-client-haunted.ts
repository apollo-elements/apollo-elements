import { useQuery } from '@apollo-elements/haunted';
import { client } from './specific-apollo-client';

function ConnectedQuery() {
  const { data } = useQuery(gql`query ConnectedQuery { connected }`, { client });
}
