import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { HelloQuery } from './Hello.query.graphql.js';
import './client.js';
import '@power-elements/card';

const template = document.createElement('template');
      template.innerHTML = `
        <span id="hello"></span>
      `;

class HelloQueryElement extends ApolloQueryMixin(HTMLElement)<typeof HelloQuery> {
  query = HelloQuery;

  variables = {
    name: 'Partner',
    greeting: 'Howdy',
  };

  onData(data) { this.render(data); }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
      .append(template.content.cloneNode(true));
  }

  render(data = this.data) {
    const greeting = data?.hello?.greeting ?? 'hello';
    const name = data?.hello?.name ?? 'world';
    this.shadowRoot.getElementById('hello').textContent =
      `${greeting}, ${name}!`;
  }
}

customElements.define('hello-query', HelloQueryElement);
