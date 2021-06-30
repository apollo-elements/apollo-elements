All named arguments to mutate default to the element's corresponding instance property. So you can call `element.mutate()` without arguments and it will call using `element.mutation`, `element.variables`, etc. You can likewise override instance properties per-call by passing them in, e.g.

```ts
await element.mutate({
  fetchPolicy: 'network-only'
  variables: {
    ...element.variables,
    name: 'overridden',
  },
});
```

| Property | Type | Description |
| -------- | ---- | ----------- |
| awaitRefetchQueries | `boolean`{lang=ts} | See [awaitRefetchQueries](/api/core/interfaces/mutation/#awaitrefetchqueries) |
| context | `Record<string, unknown>`{lang=ts} | See [context](/api/core/interfaces/element/#context) |
| errorPolicy | `ErrorPolicy`{lang=ts} | See [errorPolicy](/api/core/interfaces/element/#errorpolicy) |
| fetchPolicy | `FetchPolicy`{lang=ts} | See [fetchPolicy](/api/core/interfaces/mutation/#fetchpolicy) |
| mutation | `DocumentNode`{lang=ts} | See [mutation](/api/core/interfaces/mutation/#mutation) |
| optimisticResponse | `OptimisticResponseType<D, V>`{lang=ts} | See [optimisticResponse](/api/core/interfaces/mutation/#optimisticresponse) |
| refetchQueries | `RefetchQueriesType<D, V>`{lang=ts} | See [refetchQueries](/api/core/interfaces/mutation/#refetchqueries) |
| update | `MutationUpdaterFn<Data<D>, Variables<D, V>>`{lang=ts} | See [updater](/api/core/interfaces/mutation/#updater) |
| variables | `Variables<D, V>`{lang=ts} | See [variables](/api/core/interfaces/mutation/#variables) |
