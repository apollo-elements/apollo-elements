import { useQuery, component, html } from '@apollo-elements/haunted';
import { HelloQuery } from './Hello.query.graphql.js';
import { client } from './client.js';
import '@power-elements/card';

function HelloQueryElement() {
  const { data, executeQuery } = useQuery(HelloQuery, {
    client,
    variables: {
      name: 'Partner',
      greeting: 'Howdy',
    }
  });

  this.executeQuery ??= executeQuery;

  const greeting = data?.hello?.greeting ?? 'hello';
  const name = data?.hello?.name ?? 'world';

  return html`
    <span id="hello">
      ${greeting}, ${name}!
    </span>
  `;
}

customElements.define('hello-query', component(HelloQueryElement));
