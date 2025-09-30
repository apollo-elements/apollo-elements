import { client, query, define, html } from '@apollo-elements/hybrids';
import { HelloQuery } from './Hello.query.graphql';

define('hello-query', {
  client: client(),
  query: query(HelloQuery),
  render: ({ data, error, loading }) => html`
    <article class=${loading ? 'skeleton' : ''}>
      <p id="error" hidden=${!error}>${error?.message}</p>
      <p>
        ${data?.hello?.greeting ?? 'Hello'},
        ${data?.hello?.name ?? 'Friend'}
      </p>
    </article>
  `,
});
