| Option | Type | Description |
| ------ | ---- | ----------- |
| client | `ApolloClient`{lang=ts} | ApolloClient instance use to make the call. |
| mutation | `DocumentNode | TypedDocumentNode`{lang=ts} | A specific mutation document. See [mutation](/api/core/interfaces/mutation/#mutation). |
| variables | `Variables<D, V>`{lang=ts} | Operation variables. See [variables](/api/core/interfaces/mutation/#variables). |
| optimisticResponse | `OptimisticResponseType<D, V>`{lang=ts} | See [optimisticResponse](/api/core/interfaces/mutation/#optimisticresponse) |
| context | `Record<string, unknown>`{lang=ts} | Context object passed through the link execution chain. |
| errorPolicy | `ErrorPolicy`{lang=ts} | Error policy to use for the mutation. See [errorPolicy](/api/core/interfaces/mutation/#errorpolicy) |
| fetchPolicy | `ErrorPolicy`{lang=ts} | See [fetchPolicy](/api/core/interfaces/mutation/#fetchpolicy) |
| refetchQueries | See [refetchQueries](/api/core/interfaces/mutation/#refetchqueries) | |
| awaitRefetchQueries | `boolean`{lang=ts} | See [awaitRefetchQueries](/api/core/interfaces/mutation/#awaitrefetchqueries) |
| update | Function used to update the client cache following the mutation. See [updater](/api/core/interfaces/mutation/#updater). |
