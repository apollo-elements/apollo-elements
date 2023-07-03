import '@apollo-elements/components/apollo-client';
import { ApolloMutationController } from '@apollo-elements/core';
import { customElement, state, query } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';

import { AddUserMutation } from './AddUser.mutation.graphql.js';

import '@material/mwc-button';
import '@material/mwc-textfield';

@customElement('add-user')
class AddUser extends LitElement {
  addUser = new ApolloMutationController(this, AddUserMutation);

  render() {
    return html`
      <mwc-textfield label="Add User" value=${this.addUser.data?.addUser?.name}></mwc-textfield>
      <mwc-button label="Add" @click="${this.mutate}"></mwc-button>
      <p ?hidden="${!this.addUser.data}">${this.addUser.data?.addUser?.name} added!</p>
    `;
  }

  mutate(event) {
    const name = this.shadowRoot.querySelector('mwc-textfield').value;
    this.addUser.mutate({ variables: { name } });
  }
}
