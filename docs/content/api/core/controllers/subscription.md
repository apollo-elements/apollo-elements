---
title: "ApolloSubscriptionController"
weight: 40
description: "Subscription Controller for Apollo Elements"
layout: "layout-api"
package: "core"
module: "apollo-subscription-controller.js"
sidebar: api
---

<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->


`ApolloSubscriptionController` lets you subscribe to real-time updated from your GraphQL server. Pass it a GraphQL subscription document, and any options you choose, and it will update its host when it's state (e.g. `data`, `error`, or `loading`) changes.

The (optional) third argument to the constructor is an [`ApolloSubscriptionControllerOptions`](#options) object.

<inline-notification type="tip">

Apollo Elements controllers are not limited to Lit. Use them with any object that [implements the `ReactiveControllerHost` interface](https://lit.dev/docs/composition/controllers/). See [`ControllerHostMixin`](/api/libraries/mixins/controller-host-mixin/) for an example.

</inline-notification>

```ts copy
import { ApolloSubscriptionController } from '@apollo-elements/core';
import { customElement, query } from 'lit/decorators.js';
import { html, LitElement } from 'lit';

import { UserJoinedSubscription } from './UserJoined.subscription.graphql.js';

import { Snackbar } from '@material/mwc-snackbar';

@customElement('user-joined')
class UserJoined extends LitElement {
  userJoined = new ApolloSubscriptionController(this, UserJoinedSubscription, {
    onData: ({ subscriptionData }) => {
      this.last = subscriptionData.userJoined,
      this.snackbar.show();
    }
  });

  @query('mwc-snackbar'): Snackbar;

  render() {
    return html`
      <mwc-snackbar labeltext="${this.userJoined?.data?.name}"></mwc-snackbar>
    `;
  }
}
```
