import type { ResultOf, VariablesOf } from '@graphql-typed-document-node/core';

import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';

import { AddUserMutation } from './AddUser.mutation.graphql';

const template = document.createElement('template');
template.innerHTML = `
  <p-card>
    <h2 slot="heading">Add User</h2>

    <dl hidden>
      <dt>Name</dt>  <dd data-field="name"></dd>
      <dt>Added</dt> <dd data-field="timestamp"></dd>
    </dl>

    <mwc-textfield slot="actions" label="User Name" outlined></mwc-textfield>
    <mwc-button slot="actions" label="Add User"></mwc-button>
  </p-card>
`;

export class AddUserElement extends ApolloMutation<typeof AddUserMutation> {
  mutation = AddUserMutation;

  #data: ResultOf<typeof AddUserMutation>;
  get data(): ResultOf<typeof AddUserMutation> { return this.#data; }
  set data(data: ResultOf<typeof AddUserMutation>) { this.render(this.#data = data); }

  $(selector) { return this.shadowRoot.querySelector(selector); }

  constructor() {
    super();
    this
      .attachShadow({ mode: 'open' })
      .append(template.content.cloneNode(true));
    this.onInput = this.onInput.bind(this);
    this.$('mwc-textfield').addEventListener('click', this.onInput);
    this.$('mwc-button').addEventListener('click', () => this.mutate());
  }

  onInput({ target: { value: name } }) {
    this.variables = { name };
  }

  render(data) {
    this.$('dl').hidden = !!data;
    if (data) {
      const timestamp = new Date(data.timestamp).toDateString();
      const { name } = data;
      for (const [key, value] of Object.entries({ name, timestamp })
        this.$(`[data-field="${key}"]`).textContent = value;
    }
  }
}

customElements.define('add-user', component(AddUser));
