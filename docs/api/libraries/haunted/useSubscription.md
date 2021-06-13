---
layout: layout-api
package: '@apollo-elements/haunted'
module: 'useSubscription.js'
---
# Web Component Libraries >> Haunted >> useSubscription || 30

Apollo `useSubscription` hook for web components. Elements that call `useSubscription` inherit the [`ApolloSubscriptionInterface`](/api/interfaces/subscription/).

Read the [subscription component guides](../../../../guides/usage/subscriptions/) for examples and tips.

```ts playground subscription-factory user-added.ts
import { useSubscription, useState, component, html } from '@apollo-elements/hybrids';

import { UserAddedSubscription } from './UserAdded.subscription.graphql.js';

import '@material/mwc-snackbar';

function UserAdded() {
  const [last, setLast] = useState('');

  const [opened, setOpened] = useState(false);

  const { data } = useSubscription(UserAddedSubscription, {
    onSubscriptionData({ subscriptionData }) {
      setLast(subscriptionData.data.userAdded.name);
    }
  });

  return html`
    <link rel="stylesheet" href="user-added.css">
    <mwc-snackbar
        labeltext="${data?.name} Joined!"
        open="${opened}"
        onMDCSnackbar:closed="${() => setOpened(false)}"
        onMDCSnackbar:opened="${() => setOpened(true)}"
    ></mwc-snackbar>
  `,
});

customElements.define('user-added', components(UserAdded));
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
