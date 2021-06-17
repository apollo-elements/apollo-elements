---
layout: layout-api-index
package: '@apollo-elements/hybrids'
---

# Web Component Libraries >> Hybrids || 50

Hybrids is a unique web components framework which combines aspects of functional and object-oriented paradigms into something entirely it's own.

## Installation

<code-tabs collection="package-managers" default-tab="npm">

  ```bash tab npm
  npm i -S @apollo-elements/hybrids
  ```

  ```bash tab yarn
  yarn add @apollo-elements/hybrids
  ```

  ```bash tab pnpm
  pnpm add @apollo-elements/hybrids
  ```

</code-tabs>

Import the `query`, `mutation`, and `subscription` descriptor factories and use them in your [hybrids](https://hybrids.js.org) to connect them to your Apollo cache.

```ts playground hybrids-app users-list.ts
import { mutation, query, define, html } from '@apollo-elements/hybrids';

import { UsersQuery } from './Users.query.graphql.js';
import { AddUserMutation } from './AddUser.mutation.graphql.js';
import { RemoveUserMutation } from './RemoveUser.mutation.graphql.js';

const refetchQueries = [{ query: UsersQuery }];

const onRemoveUser = (host, e) => {
  e.preventDefault();
  const { id } = e.target.closest('[data-id]').dataset;
  host.removeUser.mutate({ variables: { id }})
}

const onSubmitForm = (host, e) => {
  e.preventDefault();
  host.addUser.mutate({
    variables: {
      name: host.shadowRoot.getElementById('name').value,
    },
  });
}

define('users-list', {
  users: query(UsersQuery),
  removeUser: mutation(RemoveUserMutation, { refetchQueries, awaitRefetchQueries: true }),
  addUser: mutation(AddUserMutation, { refetchQueries, awaitRefetchQueries: true }),
  render: ({ users, addUser, removeUser }) => html`
    <link rel="stylesheet" href="users-list.css">
    <ol>${(users.data?.users??[]).map(x => html`
      <li data-id="${x.id}">
        ${x.name}
        <button aria-label="Remove" disabled="${removeUser.loading}" onclick="${onRemoveUser}">x</button>
      </li>
    `)}</ol>
    <form onsubmit=${onSubmitForm}>
      <label>Name <input id="name" disabled="${addUser.loading}"></label>
      <button disabled="${addUser.loading || removeUser.loading}">Submit</button>
    </form>
  `,
});
```

```css playground-file hybrids-app users-list.css
:host {
  display: block;
  counter-reset: item;
}

form {
  display: grid;
  grid-template-columns: auto min-content;
}

label {
  display: contents;
}

ol {
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  counter-increment: item;
}

li::before {
  content: counter(item);
  margin-inline-end: 4px;
}

li button {
  margin-inline-start: auto;
}
```

```ts playground-file hybrids-app Users.query.graphql.ts
import type { User } from './client';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';
export const UsersQuery: TypedDocumentNode<{ users: User[] }> =  gql`
  query UsersQuery {
    users {
      id
      name
    }
  }
`;
```

```ts playground-file hybrids-app AddUser.mutation.graphql.ts
import type { User } from './client';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';
export const AddUserMutation: TypedDocumentNode<{ addUser: User }, { name: String }> =  gql`
  mutation AddUserMutation($name: String)  {
    addUser(name: $name) {
      id
      name
    }
  }
`;
```

```ts playground-file hybrids-app RemoveUser.mutation.graphql.ts
import type { User } from './client';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';
export const RemoveUserMutation: TypedDocumentNode<{ removeUser: User }, { id: String }> =  gql`
  mutation RemoveUserMutation($id: ID)  {
    removeUser(id: $id) { id }
  }
`;
```

```css playground-file hybrids-app style.css
html {
  font-family: sans-serif;
}
```

```html playground-file hybrids-app index.html
<script type="module" src="client.js"></script>
<script type="module" src="users-list.js"></script>
<users-list></users-list>
```

```ts playground-file hybrids-app client.ts
import type { InMemoryCacheConfig, NormalizedCacheObject } from '@apollo/client/core';

import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

export interface User {
  id: string;
  name: string;
  status?: 'DELETED';
};

const typeDefs = `
  type User {
    name: String
    id: ID
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String): User
    removeUser(id: ID): User
  }
`;

const USERS = [
  { id: 1, name: 'Neil' }
];

const randomDelay = () =>  new Promise(r => setTimeout(r, Math.random() * 500));

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers: {
        Query: {
          users() {
            return USERS.filter(x => x.status !== 'DELETED');
          }
        },
        Mutation: {
          async addUser(_, { name }) {
            const user = { name, id: Math.max(...USERS.map(x => x.id)) + 1 };
            USERS.push(user);
            await randomDelay()
            return user;
          },
          async removeUser(_, { id }) {
            const user = USERS.find(x => x.id == parseInt(id));
            user.status = 'DELETED';
            await randomDelay();
            return user;
          }
        }
      }
    }),
  }),
});

window.__APOLLO_CLIENT__ = client;
```
