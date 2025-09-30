import { mutation, define, html } from '@apollo-elements/hybrids';

import { AddUserMutation } from './AddUser.mutation.graphql';

type AddUserElement = {
  mutation: ApolloMutationController<typeof AddUserMutation>;
}

const onInput =
  (host, event) =>
    setVariables({ name: event.target.value }));

const mutate =
  host =>
    host.mutate();

define<AddUserElement>('add-user', {
  mutation: mutation(AddUserMutation),
  render: ({ mutation }) => {
    const name = mutation.data?.name ?? '';
    const timestamp = mutation.data ? new Date(mutation.data.timestamp).toDateString() : '';
    return html`
      <p-card>
        <h2 slot="heading">Add User</h2>

        <dl ?hidden="${!mutation.data}">
          <dt>Name</dt>  <dd>${name}</dd>
          <dt>Added</dt> <dd>${timestamp}</dd>
        </dl>

        <mwc-textfield slot="actions"
            label="User Name"
            outlined
            @input="${onInput}"></mwc-textfield>
        <mwc-button slot="actions"
            label="Add User"
            @input="${mutate}"></mwc-button>
      </p-card>
    `;
  },
})
