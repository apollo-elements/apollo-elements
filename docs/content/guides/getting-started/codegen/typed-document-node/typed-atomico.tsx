import { useQuery } from '@apollo-elements/atomico';
import { TypedQuery } from './Typed.query.graphql';

function TypedQueryElement() {
  const { data } = useQuery(TypedQuery);

  if (data !== null)
    console.assert(typeof data.name === 'string');
  return <host>...</host>;
}
