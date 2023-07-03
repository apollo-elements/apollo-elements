import { ApolloQuery, html } from '@apollo-elements/lit-apollo';
import { customElement } from 'lit/decorators.js';
import { HelloQuery } from './Hello.query.graphql.js';
import '@power-elements/card';
import './client.js';

@customElement('hello-query')
class HelloQueryElement extends ApolloQuery<typeof HelloQuery> {
  query = HelloQuery;

  variables = {
    greeting: 'Howdy',
    name: 'Partner'
  }

  render() {
    const greeting = this.data?.hello?.greeting ?? 'hello';
    const name = this.data?.hello?.name ?? 'world';
    return html`
      <span id="hello">
        ${greeting}, ${name}!
      </span>
    `;
  }
}
