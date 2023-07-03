---
description: Details on how to Apollo Elements GraphQL query components work.
title: Component Lifecycle
---

## `connectedCallback`
On connecting to the DOM, the element reads it's query and variable properties either from JavaScript, or from it's [script children](/guides/cool-tricks/inline-graphql-scripts/), and initializes a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to watch for changes to those children.

## `documentChanged`

When the `query` property changes (via JavaScript assignment, or when the GraphQL script child changes) the element sets up its `ObservableQuery` and begins fetching data (unless [configured otherwise](/guides/usage/queries/#preventing-automatic-subscription)).

If both a GraphQL script child and a JavaScript property are present, JavaScript takes precedence.

## `variablesChanged`

When the `variables` property changes (via JavaScript assignment or when the JSON script child changes) the element either refetches the existing `ObservableQuery` or attempts to initialize a new one and fetch.

If both a JSON script child and a JavaScript property are present, JavaScript takes precedence.

## `shouldSubscribe`

Called synchronously before all automatic attempts to subscribe. If it returns true, the element will subscribe and begin fetching. Returns `true` by default, Override to [prevent automatic subscription](/guides/usage/queries/#preventing-automatic-subscription).

## `subscribe`

When called automatically (via `documentChanged` or `variablesChanged`) or explicitly, it stops any existing `ObservableQuery`, then initializes a new one and begins fetching.

## `executeQuery`

If you want to explicitly run a query and receive a promise of the result, then `await element.executeQuery()`. The promise will resolve when the query does, and *after* the element instances' properties are set.

## `options`

Set this property at any point to reobserve the `ObservableQuery`.

## `onData`

The [`onData`](/api/core/interfaces/query/#ondata) callback is a unary function that takes an `ApolloQueryResult` containing `data`, `loading`, `error`, etc.

`onData` is called *after* the element instance' properties are set.

## `onError`

The [`onError`](/api/core/interfaces/query/#onerror) callback is a unary function that takes an `Error` or `ApolloError`.

`onError` is called *after* the element instance' properties are set.

## Events

Listen for the `apollo-query-result` and `apollo-error` [events](/api/core/interfaces/query/#events) to react to changes. They fire *before* the element instance' properties are set.

### `apollo-query-result`
Detail is an `ApolloQueryResult` object.

| Property | Type | Description |
| -------- | ---- | ----------- |
| data | `Data<D>` | If the query resolved, the data. |
| error | `ApolloError` | If the query rejected, the error. |
| errors | `readonly GraphQLError[]` | If the query returned partials results, and some were errors, the list of errors. |
| loading | `boolean` | Whether the operation is in-flight. |
| partial | `boolean` | Whether the query returned partial data. |
| networkStatus | `NetworkStatus` | See [NetworkStatus](/api/core/interfaces/query/#networkstatus). |
