import { useQuery } from '@apollo-elements/haunted';
import { TypedQuery } from './Typed.query.graphql';

function TypedQueryElement() {
  const { data } = useQuery(TypedQuery);

  if (data !== null)
    console.assert(typeof data.name === 'string');
}
