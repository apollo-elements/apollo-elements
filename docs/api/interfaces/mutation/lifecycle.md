---
description: Details on how to Apollo Elements GraphQL mutation components work.
---

# Interfaces >> ApolloMutation >> Component Lifecycle || 20

## `connectedCallback`
On connecting to the DOM, the element reads it's mutation and variable properties either from JavaScript, or from it's [script children](/guides/cool-tricks/inline-graphql-scripts/), and initializes a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to watch for changes to those children.

## `mutate`

Call this method to initiate the mutation. You can call it without arguments, or with a partial [`MutationOptions`](https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L247-L276) object. The rest of the mutation options will fall back to the corresponding instance properties.

In other words, the following two snippets are equivalent:

```ts
element.optimisticResponse = ({ name }) => ({ __typename: 'Mutation', addUser: { name } });
element.variables = { name: 'Hulda' };
element.mutate();
```

```ts
element.mutate({
  optimisticResponse: ({ name }) => ({ __typename: 'Mutation', addUser: { name } }),
  variables: { name: 'Hulda' },
});
```

If another call is made to `mutate` before the first resolves, only the final call will set element instance properties.

```ts
element.addEventListener('apollo-mutation-result', event =>
  console.log(event.detail.data.addUser.name));
element.mutate({ variables: { name: 'Miriam' } });
element.mutate({ variables: { name: 'Devorah' } });
element.mutate({ variables: { name: 'Yael' } });
// => logs: 'Yael'
```

## `updater`

Function which defines how to integrate the mutation result into the cache. For some simple cases Apollo can do this automatically, but for others you will need or want to control the process, for example, an `AddPostMutation` which adds a post to an array of Posts.

```ts
element.updater: MutationUpdaterFn<AddPostsMutationData, AddPostsMutationVariables> =
  (cache, result) => {
    const query = LatestPostsQuery;
    const cached = cache.readQuery({ query: LatestPostsQuery });
    const data = { posts: [result.data.postBlogPost, ...cached.posts] }
    cache.writeQuery({ query, data });
  }
```

## `onCompleted`

The [`onCompleted`](/api/interfaces/mutation/#oncompleted) callback is a unary function that takes a [`FetchResult`](https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/link/core/types.ts#L24-L32).

`onCompleted` is called *after* the element instance' properties are set.

## `onError`

The [`onError`](/api/interfaces/mutation/#onerror) callback is a unary function that takes an `Error` or `ApolloError`.

`onError` is called *after* the element instance' properties are set.

## Events

Listen for the `apollo-mutation-result` and `apollo-error` [events](/api/interfaces/mutation/#events) to react to changes. They fire *before* the element instance' properties are set.

### `apollo-mutation-result`
Detail is an [`FetchResult`](https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/link/core/types.ts#L24-L32) object.
