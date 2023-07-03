import { PolymerElement, html } from '@polymer/polymer';
import { AddUserMutation } from './Hello.query.graphql.js';
import './elements.js';

class AddUserMutationElement extends PolymerElement {
  static get template() {
    return html`
      <polymer-apollo-mutation id="userMutation" data="{%raw%}{{data}}{%endraw%}" mutation="[[mutation]]"></polymer-apollo-mutation>

      <p-card>
        <h2 slot="heading">Add a User</h2>
        <paper-input hidden="[[data]]" label="Name" value="{%raw%}{{name}}{%endraw%}"></paper-input>
        <paper-button slot="actions" hidden="[[data]]" on-click="mutate">Submit</paper-button>
        <p hidden="[[!data]]">[[data.insertUsers.returning.0.name]] added!</p>
      </p-card>
    `;
  }

  static get properties() {
    return {
      mutation: { type: Object, value: () => AddUserMutation },
    };
  }

  mutate() {
    const { name } = this;
    return this.$.userMutation.mutate({ variables: { name } });
  }
}

customElements.define('add-user', AddUserMutationElement);
