---
layout: layout-api
package: '@apollo-elements/core'
module: './index.js'
description: Core Controllers for Apollo Elements
---
# Core || 10

The core of Apollo Elements is a set of JavaScript classes that implement the [ReactiveController](https://lit.dev/docs/composition/controllers/) interface. This means that the essential operating logic of queries, mutations, and subscriptions is encapsulated in independent objects, and that elements implementing `ReactiveControllerHost` (e.g. [LitElement](https://lit.dev/docs/components/overview/)) work with them straight-away. Apollo Element is more than just "Apollo for Lit", though - the core classes form the basis for all our framework integrations, from [custom element mixins](../libraries/mixins/), to [hybrids descriptor factories](../libraries/hybrids/), to [haunted hooks](../libraries/haunted/).

This also introduces a separation between GraphQL operations (like queries or mutations) and the web components which host them. Previous versions of Apollo Elements strongly tied each GraphQL document to a single custom element, meaning if you wanted to have several queries in one component, the component either needed to define those queries as children, or combine the queries into a single document.

```html playground controller-host
<profile-home></profile-home>
```

```ts playground-file controller-host components/profile-home/profile-home.ts
import {
  ApolloMutationController,
  ApolloQueryController,
  ApolloSubscriptionController
} from '@apollo-elements/core';

import { customElement, state, query } from 'lit/decorators.js';
import { html, LitElement } from 'lit';

import { ProfileQuery } from './Profile.query.graphql';
import { UpdateProfileMutation } from './UpdateProfile.mutation.graphql';
import { FriendCameOnlineSubscription } from './FriendCameOnline.subscription.graphql';

import { ClickToEdit } from '../click-to-edit';

import style from './profile-home.css';

@customElement('profile-home')
class ProfileHome extends LitElement {
  static readonly styles = [style];

  profile = new ApolloQueryController(this, ProfileQuery);
  updateProfile = new ApolloMutationController(this, UpdateProfileMutation);
  friendCameOnline = new ApolloSubscriptionController(this, FriendCameOnlineSubscription);

  @query('#nick-edit') nickEdit: ClickToEdit;

  render() {
    return html`
      <header class=${classMap({ loading: profile.loading })}>
        <h1>
          Welcome,
          <click-to-edit id=nick-edit
              ?disabled=${updateProfile.loading}
              @change=${() => updateProfile.mutate({ variables: { nick: this.nickEdit.value } })}>
            ${profile.data?.nick}
          </click-to-edit>
        </h1>
        <img src=${profile.data?.avatar} role=presentation/>

      </header>

      <toast-notification when=${friendCameOnline.data?.id}>
        <img src=${friendCameOnline.data?.avatar} role=presentation/>
        <h2>${friendCameOnline.data?.nick}</h2>
      </toast-notification>
    `;
  }
}
```
