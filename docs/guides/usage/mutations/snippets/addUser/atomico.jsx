import { useMutation } from '@apollo-elements/atomico/useMutation';
import { useState, c } from 'atomico';
import { AddUserMutation } from './AddUser.mutation.graphql';

function AddUser() {
  const [addUser, { called, data }] = useMutation(AddUserMutation);
  const [variables, setVariables] = useState({ });

  const onInput = event => setVariables({ name: event.target.value }));

  const name = data.name ?? '';
  const timestamp = data ? new Date(data.timestamp).toDateString() : '';

  return (
    <host shadowDom>
      <p-card>
        <h2 slot="heading">Add User</h2>
        <dl hidden={!data}>
          <dt>Name</dt>  <dd>${name}</dd>
          <dt>Added</dt> <dd>${timestamp}</dd>
        </dl>
        <mwc-textfield slot="actions"
            label="User Name"
            outlined
            oninput={onInput}></mwc-textfield>
        <mwc-button slot="actions"
            label="Add User"
            oninput={() => addUser({ variables })}></mwc-button>
      </p-card>
    </host>
  );
}

customElements.define('add-user', c(AddUser));
