---
title: Subscriptions
eleventyNavigation:
  order: 40
templateEngineOverride: webc,md
description: Use Apollo Elements to write high-performance realtime GraphQL subscription components
---

Subscription components fetch data in real time via GraphQL subscriptions, which 
usually use websockets under the hood.

## Example: Chat App

A chat app queries for a list of messages, then initiates a subscription for all 
incoming messages. When a new message comes in, we want to notify the users, as 
well as add the message to the bottom of the existing on-screen list.

Consider this query and subscription:

<style>
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
</style>

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

We'll accomplish this by calling `subscribeToMore` on our element once it's 
connected to the DOM, passing in an `updateQuery` function to define the merge 
for new data:

<code-tabs collection="libraries" default-tab="lit">
  <code-tab tab-id="html" src="snippets/subscribeToMore/html.html"></code-tab>
  <code-tab tab-id="mixins" src="snippets/subscribeToMore/mixins.js"></code-tab>
  <code-tab tab-id="lit" src="snippets/subscribeToMore/lit.ts"></code-tab>
  <code-tab tab-id="fast" src="snippets/subscribeToMore/fast.ts"></code-tab>
  <code-tab tab-id="haunted" src="snippets/subscribeToMore/haunted.js"></code-tab>
  <code-tab tab-id="atomico" src="snippets/subscribeToMore/atomico.jsx"></code-tab>
  <code-tab tab-id="hybrids" src="snippets/subscribeToMore/hybrids.js"></code-tab>
</code-tabs>

## ApolloSubscriptionController

The first approach of calling `subscribeToMore` suits our requirement of 
updating the list of messages, but we still have to notify our users. Let's use 
a subscription controller and run our notification side effect using its 
lifecycle events.

<code-tabs collection="libraries" default-tab="lit">
  <code-tab tab-id="html" src="snippets/ApolloSubscriptionController/html.html"></code-tab>
  <code-tab tab-id="mixins" src="snippets/ApolloSubscriptionController/mixins.js"></code-tab>
  <code-tab tab-id="lit" src="snippets/ApolloSubscriptionController/lit.ts"></code-tab>
  <code-tab tab-id="fast" src="snippets/ApolloSubscriptionController/fast.ts"></code-tab>
  <code-tab tab-id="haunted" src="snippets/ApolloSubscriptionController/haunted.js"></code-tab>
  <code-tab tab-id="atomico" src="snippets/ApolloSubscriptionController/atomico.jsx"></code-tab>
  <code-tab tab-id="hybrids" src="snippets/ApolloSubscriptionController/hybrids.js"></code-tab>
</code-tabs>

## Subscription Component
We could create on a separate `<chat-subscription>` component to handle fetching 
the subscription side. See the HTML example in the previous section for an 
example of listening for the subscription's lifecycle events to update the query

## Next Steps

See this simple chat-app demo which demonstrates building custom elements which 
subscribe to a GraphQL server over websockets: 
[`#leeway`](https://leeway.apolloelements.dev)

Dive into the [`ApolloSubscription` API](/api/core/interfaces/subscription/) and 
[component lifecycle](/api/core/interfaces/subscription/lifecycle/)
or continue on to the [managing local state guide](/guides/usage/local-state/).
