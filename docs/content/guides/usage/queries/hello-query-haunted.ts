import { useQuery, component, html } from '@apollo-elements/haunted';
import { classMap } from 'lit/directives/class-map.js';
import { HelloQuery } from './Hello.query.graphql';

function HelloQueryElement() {
  const { data, loading, error } = useQuery(HelloQuery, { noAutoSubscribe: true });

  const greeting = data?.hello?.greeting ?? 'Hello';
  const name = data?.hello?.name ?? 'Friend';

  return html`
    <article class=${classMap({ loading })}>
      <p id="error" ?hidden=${!error}>${error?.message}</p>
      <p>${greeting}, ${name}!</p>
    </article>
  `;
}

customElements.define('hello-query', component(Hello));
