---
layout: layout-api-index
package: '@apollo-elements/core'
module: 'index.js'
description: Core Controllers for Apollo Elements
---
# Core || 10

The core of Apollo Elements is a set of JavaScript classes that implement the [ReactiveController](https://lit.dev/docs/composition/controllers/) interface. This means that the essential operating logic of queries, mutations, and subscriptions is encapsulated in independent objects, and that elements implementing `ReactiveControllerHost` (e.g. [LitElement](https://lit.dev/docs/components/overview/)) work with them straight-away. Apollo Element is more than just "Apollo for Lit", though - the core classes form the basis for all our framework integrations, from [custom element mixins](../libraries/mixins/), to [hybrids descriptor factories](../libraries/hybrids/), to [haunted hooks](../libraries/haunted/).

This also introduces a separation between GraphQL operations (like queries or mutations) and the web components which host them. Previous versions of Apollo Elements strongly tied each GraphQL document to a single custom element, meaning if you wanted to have several queries in one component, the component either needed to define those queries as children, or combine the queries into a single document.

```ts playground controller-host profile-home.ts
import {
  ApolloMutationController,
  ApolloQueryController,
  ApolloSubscriptionController
} from '@apollo-elements/core';

import { customElement, state, query } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { ProfileQuery } from './Profile.query.graphql.js';
import { UpdateProfileMutation } from './UpdateProfile.mutation.graphql.js';
import { FriendCameOnlineSubscription } from './FriendCameOnline.subscription.graphql.js';

import { Snackbar } from '@material/mwc-snackbar';
import '@material/mwc-textfield';

@customElement('profile-home')
class ProfileHome extends LitElement {
  profile = new ApolloQueryController(this, ProfileQuery);

  updateProfile = new ApolloMutationController(this, UpdateProfileMutation, {
    refetchQueries: [{ query: ProfileQuery }],
    awaitRefetchQueries: true,
  });

  friendCameOnline = new ApolloSubscriptionController(this, FriendCameOnlineSubscription, {
    onSubscriptionData: () => this.snackbar.show(),
  });

  @query('mwc-snackbar') snackbar: Snackbar;

  render() {
    return html`
      <mwc-snackbar labeltext="${this.friendCameOnline.data?.nick} came online"></mwc-snackbar>
      <header class=${classMap({ loading: this.profile.loading })}>
        <h1>Welcome, ${this.profile.data?.profile?.nick}</h1>
        <mwc-textfield
            label="Edit Nick"
            value=${this.profile.data?.profile?.nick}
            @change=${this.onChange}
        ></mwc-textfield>
      </header>
    `;
  }

  onChange(event) {
    const nick = event.target.value
    this.updateProfile.mutate({ variables: { nick } });
  }
}
```

```html playground-file controller-host index.html
<script type="module" src="profile-home.js"></script>
<script type="module" src="client.js"></script>

<apollo-client>
  <profile-home></profile-home>
</apollo-client>
```

```ts playground-file controller-host Profile.query.graphql.ts
import { gql, TypedDocumentNode } from '@apollo/client/core';
export const ProfileQuery: TypedDocumentNode<{
  profile: {
    nick: string
  }
}> = gql`
query ProfileQuery {
  profile {
    nick
  }
}
`;
```

```ts playground-file controller-host UpdateProfile.mutation.graphql.ts
import { gql, TypedDocumentNode } from '@apollo/client/core';
export const UpdateProfileMutation: TypedDocumentNode<{
  updateProfile: {
    nick: string
  }
}, {
  nick: string
}> = gql`
mutation UpdateProfile($nick: String) {
  updateProfile(nick: $nick) {
    nick
  }
}
`;
```

```ts playground-file controller-host FriendCameOnline.subscription.graphql.ts
import { gql, TypedDocumentNode } from '@apollo/client/core';
export const FriendCameOnlineSubscription: TypedDocumentNode<{
  friendCameOnline: {
    nick: string
  }
}> = gql`
subscription FriendCameOnline {
  friendCameOnline {
    nick
  }
}
`;
```

```js playground-file controller-host client.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { EventIterator } from 'event-iterator';

const USERS = [
  { id: 1, nick: 'Neil' },
  { id: 2, nick: 'Buzz' },
  { id: 3, nick: 'Glen' },
];

function makeNextUser() {
  return USERS[Math.floor(Math.random() * USERS.length)];
}

class Pub extends EventTarget {
  friend() {
    this.dispatchEvent(new Event('friend'));
    setTimeout(() => this.friend(), (Math.random() * 20000));
  }

  constructor() {
    super();
    setTimeout(() => this.friend(), (Math.random() * 20000));
  }
}

const schema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID
      nick: String
    }

    type Query {
      profile: User
    }

    type Mutation {
      updateProfile(nick: String): User
    }

    type Subscription {
      friendCameOnline: User
    }
  `,
  resolvers: {

    Query: {
      async profile() {
        return USERS.find(x => x.id === 1);
      }
    },

    Mutation: {
      async updateProfile(_, { nick }) {
        const user = USERS.find(x => x.id == 1);
        user.nick = nick;
        return user;
      }
    },

    Subscription: {
      friendCameOnline: {
        subscribe: () => EventIterator.subscribe.call(new Pub(), 'friend'),
        resolve: () => makeNextUser(),
      }
    }

  }
});

document.querySelector('apollo-client')
  .client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  });
```
