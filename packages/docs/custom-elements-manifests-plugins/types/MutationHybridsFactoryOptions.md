| Option | Type | Description |
| ------ | ---- | ----------- |
| client | `ApolloClient`{lang=ts} | ApolloClient instance use to make the call. |
| mutation | `DocumentNode | TypedDocumentNode`{lang=ts} | A specific mutation document. See [`mutation`](/api/interfaces/mutation/#mutation). |
| variables | `Variables<D, V>`{lang=ts} | Operation variables. See [`variables`](/api/interfaces/mutation/#variables). |
| optimisticResponse | | See [optimisticResponse](/api/interfaces/mutation/#optimisticresponse) in ApolloMutationInterface |
| context | `Record<string, unknown>`{lang=ts} | Context object passed through the link execution chain. |
| errorPolicy | `ErrorPolicy`{lang=ts} | Error policy to use for the mutation. See [`errorPolicy`](/api/interfaces/mutation/#errorpolicy) |
| fetchPolicy | `FetchPolicy`{lang=ts} | See [`fetchPolicy`](/api/interfaces/mutation/#fetchpolicy) |
| refetchQueries | See [`refetchQueries`](/api/interfaces/mutation/#refetchqueries) | |
| awaitRefetchQueries | `boolean`{lang=ts} | See [awaitRefetchQueries](/api/interfaces/mutation/#awaitrefetchqueries) |
| updater | See [`updater`](/api/interfaces/mutation/#updater) | Function used to update the client cache following the mutation. |
