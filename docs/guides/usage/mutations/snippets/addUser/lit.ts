import { ApolloMutationController } from '@apollo-elements/core';
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { AddUserMutation } from './AddUser.mutation.graphql';

@customElement('add-user')
export class AddUserElement extends LitElement {
  mutation = new ApolloMutationController(this, AddUserMutation);

  render(): TemplateResult {
    const name = this.mutation.data.name ?? '';
    const timestamp =
        !this.mutation.data ? ''
      : new Date(this.mutation.data.timestamp).toDateString();

    return html`
      <p-card>
        <h2 slot="heading">Add User</h2>

        <dl ?hidden="${!this.data}">
          <dt>Name</dt>  <dd>${name}</dd>
          <dt>Added</dt> <dd>${timestamp}</dd>
        </dl>

        <mwc-textfield slot="actions"
            label="User Name"
            outlined
            @input="${this.onInput}"></mwc-textfield>
        <mwc-button slot="actions"
            label="Add User"
            @input="${() => this.mutation.mutate()}"></mwc-button>
      </p-card>
    `;
  }

  onInput({ target: { value: name } }) {
    this.mutation.variables = { name };
  }
}
