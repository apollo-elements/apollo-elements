---
layout: layout-api
package: '@apollo-elements/hybrids'
module: factories/mutation.js
---

# Web Component Libraries >> Hybrids >> Mutation Factory || 20

Use the `mutation` factory to add a GraphQL mutation to you hybrids element.

```ts playground mutation-factory add-user.ts
import { mutation, define, html } from '@apollo-elements/hybrids';

import { AddUserMutation } from './AddUser.mutation.graphql.js';

const onSubmitForm = (host, e) => {
  e.preventDefault();
  host.addUser.mutate({
    variables: {
      name: host.shadowRoot.getElementById('name').value,
    },
  });
}

define('add-user', {
  addUser: mutation(AddUserMutation),
  render: ({ users, addUser }) => html`
    <link rel="stylesheet" href="add-user.css">
    <form onsubmit=${onSubmitForm}>
      <label>Name <input id="name" disabled="${addUser.loading}"></label>
      <button disabled="${addUser.loading}">Submit</button>
      <output hidden="${!addUser.data}">
        <p>${addUser.data?.addUser?.name} added!</p>
      </output>
    </form>
  `,
});
```

```css playground-file mutation-factory add-user.css
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

output {
  grid-column: 1 / -1;
}
```

```ts playground-file mutation-factory AddUser.mutation.graphql.ts
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

```html playground-file mutation-factory index.html
<script type="module" src="client.js"></script>
<script type="module" src="add-user.js"></script>
<add-user></add-user>
```

```ts playground-file mutation-factory client.ts
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
