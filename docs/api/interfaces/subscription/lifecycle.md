---
description: Details on how to Apollo Elements GraphQL subscription components work.
---

# Interfaces >> ApolloSubscription >> Component Lifecycle || 20

## `connectedCallback`
On connecting to the DOM, the element reads it's `subscription` and `variables` properties either from JavaScript, or from it's [script children](/guides/cool-tricks/inline-graphql-scripts/), and initializes a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to watch for changes to those children.

## `documentChanged`
When the `subscription` property changes (via JavaScript assignment, or when the GraphQL script child changes) the element sets up its `Observable` and begins fetching data (unless [configured otherwise](/guides/usage/queries/#preventing-automatic-subscription)).

If both a GraphQL script child and a JavaScript property are present, JavaScript takes precedence.

## `variablesChanged`
When the `variables` property changes (via JavaScript assignment or when the JSON script child changes) the element either refetches the existing `Observable` or attempts to initialize a new one and fetch.

If both a JSON script child and a JavaScript property are present, JavaScript takes precedence.

## `shouldSubscribe`
Called synchronously before all automatic attempts to subscribe. If it returns true, the element will subscribe and begin fetching. Returns `true` by default, Override to [prevent automatic subscription](/guides/usage/queries/#preventing-automatic-subscription).

## `subscribe`
When called automatically (via `documentChanged` or `variablesChanged`) or explicitly, attemptes to subscribe. If a `observableSubscription` already exists, it will use that one, unless [`shouldResubscribe`](/api/interfaces/subscription/#shouldresubscribe) is set.

## `cancel`
When called, ends the subscription and unsets the `Observable`.

## `onSubscriptionData`
Unary function which takes an object containing `client` and `subscriptionData`. The `subscriptionData` contains `data`, `loading`, and `error` properties. It is called **after** the element instance's properties are set.

## `onSubscriptionComplete`
The [`onSubscriptionComplete`](/api/interfaces/subscription/#onsubscriptioncomplete) callback is a function of no parameters that is called when the subscription ends (e.g. via `cancel` or on disconnect).

`onData` is called *after* the element instance' properties are set.

## `onError`
The [`onError`](/api/interfaces/query/#onerror) callback is a unary function that takes an `Error` or `ApolloError`.

`onError` is called *after* the element instance' properties are set.

## `disconnectedCallback`
Cancels the subscription.

## Events
Listen for the `apollo-subscription-result` and `apollo-error` [events](/api/interfaces/query/#events) to react to changes. They fire *before* the element instance' properties are set.

### `apollo-subscription-result`
Detail is an object containing `client` and `subscriptionData`. The `subscriptionData` contains `data`, `loading`, and `error` properties. It is called **after** the element instance's properties are set.
