---
title: "Subscriptions"
sidebar: guides
weight: 40
description: "Use Apollo Elements to write high-performance realtime GraphQL subscription components"
---

Subscription components fetch data in real time via GraphQL subscriptions, which usually use websockets under the hood.

## Example: Chat App

A chat app queries for a list of messages, then initiates a subscription for all incoming messages. When a new message comes in, we want to notify the users, as well as add the message to the bottom of the existing on-screen list.

Consider this query and subscription:

<!-- TODO: Review and move to Hugo CSS -->
<!-- STYLE BLOCK:

#gql-documents {
  display: grid;
  gap: 12px 6px;
  grid-template: auto auto / auto;
}

#gql-documents pre {
  height: 100%;
}

@media (min-width: 600px) {
  #gql-documents {
    grid-template: auto / auto auto;
  }
}

-->

<div id="gql-documents">

```graphql
query MessagesQuery {
  messages {
    date
    message
    user
  }
}
```

```graphql
subscription MessageSentSubscription {
  messageSent {
    date
    message
    user
  }
}
```

</div>

Let's define a component which performs the following tasks:
1. queries for messages
2. subscribes to any new messages
3. when new messages arrive, integrate them with the cached messages from the query.

We'll accomplish this by calling `subscribeToMore` on our element once it's connected to the DOM, passing in an `updateQuery` function to define the merge for new data:

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}
{{<include subscribe-to-more-html.html>}}
{{</code-tab>}}
  {{<code-tab package="mixins">}}
{{<include subscribe-to-more-mixins.ts>}}
{{</code-tab>}}
  {{<code-tab package="lit">}}
{{<include subscribe-to-more-lit.ts>}}
{{</code-tab>}}
  {{<code-tab package="fast">}}
{{<include subscribe-to-more-fast.ts>}}
{{</code-tab>}}
  {{<code-tab package="haunted">}}
{{<include subscribe-to-more-haunted.ts>}}
{{</code-tab>}}
  {{<code-tab package="atomico">}}
{{<include subscribe-to-more-atomico.tsx>}}
{{</code-tab>}}
  {{<code-tab package="hybrids">}}
{{<include subscribe-to-more-hybrids.ts>}}
{{</code-tab>}}
</code-tabs>

## ApolloSubscriptionController

The first approach of calling `subscribeToMore` suits our requirement of updating the list of messages, but we still have to notify our users. Let's use a subscription controller and run our notification side effect using its lifecycle events.

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}
{{<include subscription-controller-html.html>}}
{{</code-tab>}}
  {{<code-tab package="mixins">}}
{{<include subscription-controller-mixins.ts>}}
{{</code-tab>}}
  {{<code-tab package="lit">}}
{{<include subscription-controller-lit.ts>}}
{{</code-tab>}}
  {{<code-tab package="fast">}}
{{<include subscription-controller-fast.ts>}}
{{</code-tab>}}
  {{<code-tab package="haunted">}}
{{<include subscription-controller-haunted.ts>}}
{{</code-tab>}}
  {{<code-tab package="atomico">}}
{{<include subscription-controller-atomico.tsx>}}
{{</code-tab>}}
  {{<code-tab package="hybrids">}}
{{<include subscription-controller-hybrids.ts>}}
{{</code-tab>}}
</code-tabs>

## Subscription Component
We could create on a separate `<chat-subscription>` component to handle fetching the subscription side. See the HTML example in the previous section for an example of listening for the subscription's lifecycle events to update the query

## Next Steps

See this simple chat-app demo which demonstrates building custom elements which subscribe to a GraphQL server over websockets: [`#leeway`](https://leeway.apolloelements.dev)

Dive into the [`ApolloSubscription` API](/api/core/interfaces/subscription/) and [component lifecycle](/api/core/interfaces/subscription/lifecycle/)
or continue on to the [managing local state guide](/guides/usage/local-state/).
