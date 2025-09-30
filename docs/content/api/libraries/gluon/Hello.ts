import { ApolloQuery, html } from '@apollo-elements/gluon';
import { HelloQuery } from './Hello.query.graphql.js';
import '@power-elements/card';
import './client.js';

class HelloQueryElement extends ApolloQuery<typeof HelloQuery> {
  query = HelloQuery;

  onData() { this.render(); }

  get template() {
    const greeting = this.data?.hello?.greeting ?? 'hello';
    const name = this.data?.hello?.name ?? 'world';
    return html`
      <span id="hello">
        ${greeting}, ${name}!
      </span>
    `;
  }
}

customElements.define('hello-query', HelloQueryElement);
