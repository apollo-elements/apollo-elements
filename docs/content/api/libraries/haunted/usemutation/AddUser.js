import { useMutation, useState, component, html } from '@apollo-elements/haunted';
import { AddUserMutation } from './AddUser.mutation.graphql.js';

import '@power-elements/card';
import '@material/mwc-button';
import '@material/mwc-textfield';

const format = isoString => new Date(isoString).toDateString()

function AddUser() {
  const [addUser, { called, data, loading }] = useMutation(AddUserMutation);
  const [variables, setVariables] = useState({ });

  const onInput = event => setVariables({ name: event.target.value });

  const [{ name, timestamp } = {}] = data?.insertUsers?.returning ?? [];

  return html`
    <p-card>
      <h2 slot="heading">Add User</h2>

      ${!called || !data ? '' : html`
      <dl>
        <dt>Name</dt>  <dd>${name}</dd>
        <dt>Added</dt> <dd>${format(timestamp)}</dd>
      </dl>
      `}

      <mwc-textfield slot="actions"
          label="User Name"
          outlined
          ?disabled="${loading}"
          @input="${onInput}"></mwc-textfield>
      <mwc-button slot="actions"
          label="Add User"
          ?disabled="${loading}"
          @click="${() => addUser({ variables })}"></mwc-button>
    </p-card>
  `;
}

customElements.define('add-user', component(AddUser));
