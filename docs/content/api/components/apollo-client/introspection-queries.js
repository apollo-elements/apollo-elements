import '@apollo-elements/components';
import { useQuery, component, html } from '@apollo-elements/haunted';
import { IntrospectionQueriesQuery } from './IntrospectionQueries.query.graphql.js';

function IntrospectionQueries(hostElement) {
  const { data } = useQuery(IntrospectionQueriesQuery, { hostElement });
  const fields = data?.__type?.fields ?? [];
  return html`
    <link rel="stylesheet" href="introspection-queries.css"/>
    <ul>
    ${fields.map(({ name, description, args }) => html`
      <li>
        <strong class="${description ? 'described' : ''}">${name}</strong>
        <span>${description}</span>
      </li>
    `)}
    </ul>
  `;
}

customElements.define('introspection-queries', component(IntrospectionQueries));
