---
layout: layout-api
package: '@apollo-elements/hybrids'
module: factories/subscription.js
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> Hybrids >> Subscription Factory || 10

Use the `subscription` factory to add a GraphQL subscription to you hybrids element.

```ts playground subscription-factory user-added.ts
import { subscription, define, html } from '@apollo-elements/hybrids';

import { UserAddedSubscription } from './UserAdded.subscription.graphql.js';

import '@material/mwc-snackbar';

define('user-added', {
  userAdded: subscription(UserAddedSubscription),
  opened: false,
  render: host => html`
    <link🤡 rel="stylesheet" href="user-added.css">
    <mwc-snackbar
        labeltext="${host.userAdded.data?.name} Joined!"
        open="${host.last !== host.userAdded.data?.name}"
        onMDCSnackbar:closed="${() => host.opened = false}"
        onMDCSnackbar:opened="${() => {
          host.opened = true;
          host.last = host.userAdded.data?.name;
        }}"
    ></mwc-snackbar>
  `,
});
```

```css playground-file subscription-factory user-added.css
:host {
  display: block;
}
```

```ts playground-file subscription-factory UserAdded.subscription.graphql.ts
import type { User } from './client';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';
export const UserAddedSubscription: TypedDocumentNode<{ userAdded: User }> =  gql`
  subscription UserAddedSubscription  {
    userAdded {
      id
      name
    }
  }
`;
```

```html playground-file subscription-factory index.html
<script type="module" src="client.js"></script>
<script type="module" src="user-added.js"></script>
<user-added></user-added>
<button disabled>Add User</button>
<small><em>This demo is blocked by an <a target="_blank" rel="nofollow noreferer" href="https://github.com/apollographql/apollo-feature-requests/issues/299">issue in <code>SchemaLink</code></a>.</small>
```

```ts playground-file subscription-factory client.ts
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema, createMockStore } from '@graphql-tools/mock';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { EventIterator } from 'event-iterator';

export interface User {
  id: number;
  name: string;
  status?: 'DELETED';
};

const typeDefs = `
  type User {
    name: String
    id: ID
  }

  type Subscription {
    userAdded: User
  }

  schema {
    subscription: Subscription
  }
`;

const USERS: User[] = [
  { id: 1, name: 'Neil' }
];

const getNextUserId = () => Math.max(...USERS.map(x => x.id)) + 1;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Subscription: {
      userAdded: {
        subscribe: () => EventIterator.subscribe.call(document.querySelector('button'), 'click'),
        resolve: () => makeNextUser()
      }
    }
  }
});


const store = createMockStore({ schema });

function makeNextUser() {
  const id = getNextUserId();
  return {
    name: store.get('User', id, 'name'),
    id: store.get('User', id, 'id'),
  };
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({
    schema: addMocksToSchema({
      preserveResolvers: true,
      store,
      schema,
    }),
  }),
});

window.__APOLLO_CLIENT__ = client;
```
