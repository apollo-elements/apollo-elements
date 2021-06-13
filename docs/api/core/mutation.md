---
layout: layout-api
package: '@apollo-elements/core'
module: apollo-mutation-controller.js
description: Mutation Controller for Apollo Elements
---
# Core >> ApolloMutationController || 30

`ApolloMutationController` modifies data on your GraphQL server. Pass it a GraphQL mutation document, and any options you choose, and when you call its `mutate()` method, it will issue the mutation. It then updates its host when it's state (e.g. `data`, `error`, or `loading`) changes.

The (optional) third argument to the constructor is an [`ApolloMutationControllerOptions`](#options) object, which is the same as the `MutationOptions` parameter to `mutate()`, as well as `onComplete`/`onError` callbacks to run your side-effects, if you choose.

<inline-notification type="tip">

Apollo Elements controllers are not limited to Lit. Use them with any object that [implements the `ReactiveControllerHost` interface](https://lit.dev/docs/composition/controllers/). See [`ControllerHostMixin`](/api/libraries/mixins/controller-host-mixin/) for an example.

</inline-notification>

```ts playground mutation-controller add-user.ts
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
```

```html playground-file mutation-controller index.html
<script type="module" src="add-user.js"></script>
<script type="module" src="client.js"></script>

<apollo-client>
  <add-user></add-user>
</apollo-client>
```

```ts playground-file mutation-controller AddUser.mutation.graphql.ts
import { gql, TypedDocumentNode } from '@apollo/client/core';
type T = TypedDocumentNode<{ addUser: { name: string } }, { name: string }>;
export const AddUserMutation: T = gql`
mutation AddUser($name: String) {
  addUser(name: $name) {
    name
  }
}
`;
```

```js playground-file mutation-controller client.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { EventIterator } from 'event-iterator';

const USERS = [ ];

const schema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID
      name: String
    }

    type Mutation {
      addUser(name: String): User
    }

    type Query {
      users: [User]
    }
  `,
  resolvers: {
    Query: { users: async () => USERS },
    Mutation: {
      async addUser(_, { name }) {
        const id = Math.max(...USERS.map(x => x.id)) + 1
        const user = { id, name }
        USERS.push[user]
        return user;
      }
    },
  }
});

document.querySelector('apollo-client')
  .client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  });
```
