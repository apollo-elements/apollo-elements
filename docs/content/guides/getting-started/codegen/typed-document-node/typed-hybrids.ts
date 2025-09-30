import { define, query, html } from '@apollo-elements/hybrids';
import { TypedQuery } from './Typed.query.graphql';

type ApolloQueryElement<T extends TypedDocumentNode> =
  HTMLElement & { query: ApolloQueryController<T> };

define<ApolloQueryElement<typeof TypedQuery>>('typed-query', {
  query: query(TypedQuery),
  render: ({ query: { data } }) => {
    if (data !== null)
      console.assert(typeof data.name === 'string');
  }
});
