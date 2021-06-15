---
layout: layout-api
package: '@apollo-elements/fast'
module: apollo-mutation.js
---
# Web Component Libraries >> FAST >> ApolloMutation || 30

`ApolloMutation` inherits from `ApolloElement` and implements the [`ApolloMutationInterface`](/api/core/interfaces/mutation/).

Read the [mutation component guides](/guides/usage/mutations/) for examples and tips.

## Live Demo

```ts playground fast-mutation AddUser.ts
import { ApolloMutation, Binding, customElement, html } from '@apollo-elements/fast';
import { AddUserMutation } from './AddUser.mutation.graphql.js';
import { compose, propOr } from './fp-helpers.js';

import '@power-elements/card';
import '@material/mwc-button';
import '@material/mwc-textfield';

const getAddedUser: Binding<AddUser> = x => x.data?.insertUsers?.returning?.[0];

const format = x => { try { return new Date(x).toDateString(); } catch { return ''; } };

@customElement({ name: 'add-user', template: html<AddUser>`
  <p-card>
    <h2 slot="heading">Add User</h2>

    ${x => (!x.called || !x.data) ? '' : html<AddUser>`
    <dl>
      <dt>Name</dt>  <dd>${compose(propOr('name', ''), getAddedUser)}</dd>
      <dt>Added</dt> <dd>${compose(format, propOr('timestamp', null), getAddedUser)}</dd>
    </dl>
    `}

    <mwc-textfield slot="actions"
        label="User Name"
        outlined
        ?disabled="${propOr('loading')}"
        @input="${(x, { event }) => x.onInput(event.target.value)}"></mwc-textfield>
    <mwc-button slot="actions"
        label="Add User"
        ?disabled="${propOr('loading')}"
        @click="${x => x.mutate()}"></mwc-button>
  </p-card>
` })
class AddUser extends ApolloMutation<typeof AddUserMutation> {
  mutation = AddUserMutation;

  onInput(name): boolean {
    this.variables = { name }
    return true;
  }
}
```

```js playground-file fast-mutation fp-helpers.js
/** right-to-left function composition */
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

/** safe property access */
export const propOr = (name, or) => o => o?.[name] ?? or;
```

```graphql playground-file fast-mutation AddUser.mutation.graphql.js
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

```html playground-file fast-mutation index.html
<script type="module" src="client.js"></script>
<script type="module" src="AddUser.js"></script>
<add-user></add-user>
```

```js playground-file fast-mutation client.js
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
window.__APOLLO_CLIENT__ = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://api.spacex.land/graphql' }),
});
```
