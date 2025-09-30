import { useMutation, useState, c, html } from '@apollo-elements/atomico';
import { AddUserMutation } from './AddUser.mutation.graphql.js';

import '@power-elements/card';
import '@material/mwc-button';
import '@material/mwc-textfield';

const format = isoString => new Date(isoString).toDateString()

function AddUser() {
  const [addUser, { called, data, loading }] = useMutation(AddUserMutation);
  const [variables, setVariables] = useState({ });

  const [{ name, timestamp } = {}] = data?.insertUsers?.returning ?? [];

  return html`
    <host shadowDom>
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
            disabled="${loading}"
            oninput="${event => setVariables({ name: event.target.value })}"></mwc-textfield>
        <mwc-button slot="actions"
            label="Add User"
            disabled="${loading}"
            onclick="${() => addUser({ variables })}"></mwc-button>
      </p-card>
    </host>
  `;
}

customElements.define('add-user', c(AddUser));
