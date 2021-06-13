---
layout: layout-api
package: '@apollo-elements/haunted'
module: 'useMutation.js'
---
# Web Component Libraries >> Haunted >> useMutation || 20

Apollo `useMutation` hook for web components. Elements that call `useMutation` inherit the [`ApolloMutationInterface`](/api/interfaces/mutation/).

Read the [mutation component guides](../../../../guides/usage/mutations/) for examples and tips.

## Live Demo

```js playground use-mutation AddUser.js
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
```

```graphql playground-file use-mutation AddUser.mutation.graphql.js
import { gql, TypedDocumentNode } from '@apollo/client/core';

interface Data {
  insertUsers: {
    returning: {
      name: string;
      id: string;
      timestamp: string;
    }
  }
}

export const AddUserMutation: TypedDocumentNode<Data, { name: string }> = gql`
  mutation InsertUser($name: String!) {
    insertUsers: insert_users(objects: {name: $name}) {
      returning {
        name
        id
        timestamp
      }
    }
  }
`;
```

```html playground-file use-mutation index.html
<script type="module" src="client.js"></script>
<script type="module" src="AddUser.js"></script>
<add-user></add-user>
```

```js playground-file use-mutation client.js
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
window.__APOLLO_CLIENT__ = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://api.spacex.land/graphql' }),
});
```
Elements that call `useMutation` inherit the [`ApolloMutationInterface`](/api/interfaces/query/).

Read the [mutation component guides](../../../../guides/usage/mutations/) for examples and tips.
