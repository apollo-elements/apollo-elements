---
layout: layout-api
package: '@apollo-elements/haunted'
module: './useMutation.js'
---
# Web Component Libraries >> Haunted >> useMutation || 20

Apollo `useMutation` hook for web components. Elements that call `useMutation` inherit the [`ApolloMutationInterface`](/api/interfaces/mutation/).

Read the [mutation component guides](../../../../guides/building-apps/mutations/) for examples and tips.

## Live Demo

```ts wcd dTRlM3BCrNYeWWFSP9Fa src/AddUser.ts
import { useMutation } from '@apollo-elements/haunted/useMutation';
import { useState, component, html } from 'haunted';
import AddUserMutation from './AddUser.mutation.graphql';

function AddUser() {
  const [addUser, { called, data }] = useMutation(AddUserMutation);
  const [variables, setVariables] = useState({ });

  const onInput = event => setVariables({ name: event.target.value }));
  return html`
    <p-card>
      <h2 slot="heading">Add User</h2>

      ${!called || !data ? '' : html`
      <dl>
        <dt>Name</dt>    <dd>${data.name}</dd>
        <dt>Added</dt> <dd>${new Date(data.timestamp).toDateString()}</dd>
      </dl>
      `}

      <mwc-textfield slot="actions"
          label="User Name"
          outlined
          @input="${onInput}"></mwc-textfield>
      <mwc-button slot="actions"
          label="Add User"
          @input="${onInput}"></mwc-button>
    </p-card>
  `;
}

customElements.define('add-user', component(AddUser));
```

Elements that call `useMutation` inherit the [`ApolloMutationInterface`](/api/interfaces/query/).

Read the [mutation component guides](../../../../guides/building-apps/mutations/) for examples and tips.
