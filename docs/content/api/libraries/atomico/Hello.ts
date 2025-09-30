import { useEffect, useQuery, useHost, c, html } from '@apollo-elements/atomico';
import { HelloQuery } from './Hello.query.graphql.js';
import { client } from './client.js';
import '@power-elements/card';

function HelloQueryElement() {
  const { current } = useHost();

  const { data, executeQuery } = useQuery(HelloQuery, {
    client,
    variables: {
      name: 'Partner',
      greeting: 'Howdy',
    }
  });

  useEffect(() => {
    current.executeQuery = executeQuery;
  }, []);

  const greeting = data?.hello?.greeting ?? 'hello';
  const name = data?.hello?.name ?? 'world';

  return html`
    <host shadowDom>
      <span id="hello">
        ${greeting}, ${name}!
      </span>
    </host>
  `;
}

customElements.define('hello-query', c(HelloQueryElement));
