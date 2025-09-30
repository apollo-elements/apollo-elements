import { FASTElement, customElement, ViewTemplate } from '@microsoft/fast-element';
import { ApolloQueryBehavior } from '@apollo-elements/fast';
import { HelloQuery } from './Hello.query.graphql';

const template: ViewTemplate<HelloQueryElement> = html`
  <article class=${x => x.query.loading ? 'skeleton' : ''}>
    <p id="error" ?hidden=${!x => x.query.error}>${x => x.query.error?.message}</p>
    <p>
      ${x => x.query.data?.hello?.greeting ?? 'Hello'},
      ${x => x.query.data?.hello?.name ?? 'Friend'}
    </p>
  </article>
`;

@customElement({ name: 'hello-query', template })
export class HelloQueryElement extends FASTElement {
  query = new ApolloQueryBehavior(this, HelloQuery);
}
