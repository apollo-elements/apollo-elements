import { PolymerElement, html } from '@polymer/polymer';
import { HelloQuery } from './Hello.query.graphql.js';
import '@apollo-elements/components/apollo-client';
import '@apollo-elements/polymer/polymer-apollo-query';

import './client.js';

class HelloQueryElement extends PolymerElement {
  static get template() {
    return html`
      <polymer-apollo-query
          data="{{data}}"
          query="[[query]]"
          variables="[[variables]]">
      </polymer-apollo-query>

      <h2>Variables</h2>
      <label>Name <input value="{{name::input}}"/></label>
      <label>Greeting <input value="{{greeting::input}}"/></label>

      <h2>Result</h2>
      <span id="hello">[[data.hello.greeting]], [[data.hello.name]]!</span>
    `;
  }

  static get properties() {
    return {
      data: { type: Object },
      variables: { type: Object, computed: 'computeVariables(name, greeting)' },
      query: { type: Object, value: () => HelloQuery },
      name: { type: String, value: 'World' },
      greeting: { type: String, value: 'Hello' },
    };
  }

  computeVariables(name: string, greeting: string) {
    return { name, greeting };
  }
}

customElements.define('hello-query', HelloQueryElement);
