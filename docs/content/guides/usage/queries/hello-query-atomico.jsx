import { useQuery, c } from '@apollo-elements/atomico';
import { HelloQuery } from './Hello.query.graphql';

function HelloQueryElement() {
  const { data, loading, error } = useQuery(HelloQuery, { noAutoSubscribe: true });

  const greeting = data?.hello?.greeting ?? 'Hello';
  const name = data?.hello?.name ?? 'Friend';

  return (
    <host shadowDom>
      <article class={loading ? 'loading' : ''}>
        <p id="error" hidden={!error}>{error?.message}</p>
        <p>{greeting}, {name}!</p>
      </article>
    </host>
  );
}

customElements.define('hello-query', c(Hello));
