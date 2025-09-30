import { useQuery, component, html } from '@apollo-elements/haunted';
import { HelloQuery } from './Hello.query.graphql';

function HelloWorld() {
  const { data } = useQuery(HelloQuery);
}

customElements.define('hello-world', component(HelloWorld));
