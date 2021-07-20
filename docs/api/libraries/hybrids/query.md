---
layout: layout-api
package: '@apollo-elements/hybrids'
module: factories/query.js
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> Hybrids >> Query Factory || 10

```ts playground hybrids-query users-list.ts
import { query, define, html } from '@apollo-elements/hybrids';

import { UsersQuery } from './Users.query.graphql.js';

define('users-list', {
  users: query(UsersQuery),
  render: ({ users }) => html`
    <link rel="stylesheet" href="users-list.css">
    <ol>${(users.data?.users??[]).map(x => html`
      <li data-id="${x.id}">${x.name}</li>`)}
    </ol>
  `,
});
```

```css playground-file hybrids-query users-list.css
:host {
  display: block;
}
```

```ts playground-file hybrids-query Users.query.graphql.ts
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

```html playground-file hybrids-query index.html
<script type="module" src="client.js"></script>
<script type="module" src="users-list.js"></script>
<users-list></users-list>
```

```ts playground-file hybrids-query client.ts
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
