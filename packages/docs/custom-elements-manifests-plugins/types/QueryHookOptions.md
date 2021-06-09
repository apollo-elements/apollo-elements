| Option | Type | Description |
| ------ | ---- | ----------- |
| client | `ApolloClient`{lang=ts} | ApolloClient instance use to make the call. |
| context | `Record<string, unknown>`{lang=ts} | Context object passed through the link execution chain. |
| errorPolicy | `ErrorPolicy`{lang=ts} | Error policy to use for the mutation. See [`errorPolicy`](/api/interfaces/query/#errorpolicy) |
| fetchPolicy | `FetchPolicy`{lang=ts} | See [`fetchPolicy`](/api/interfaces/query/#fetchpolicy) |
| nextFetchPolicy | `FetchPolicy`{lang=ts} | See [`nextFetchPolicy`](/api/interfaces/query/#nextfetchpolicy) |
| noAutoSubscribe | `boolean`{lang=ts} | See [`noAutoSubscribe`](/api/interfaces/query/#noautosubscribe) |
| notifyOnNetworkStatusChange | See [`notifyOnNetworkStatusChange`](/api/interfaces/query/#notifyonnetworkstatuschange) |
| onCompleted | `(data: D) => void`{lang=ts} | Callback for when the query resolves. |
| onError | See [`onError`](/api/interfaces/query/#onerror) | Callback for when an error occurs. |
| partialRefetch | `boolean`{lang=ts} | See [`partialRefetch`](/api/interfaces/query/#partialrefetch) |
| pollInterval | `number`{lang=ts} | See [`pollInterval`](/api/interfaces/query/#pollinterval) |
| query | `DocumentNode | TypedDocumentNode`{lang=ts} | A GraphQL document that consists of a single query to be sent down to the server. |
| returnPartialData | `boolean`{lang=ts} | See [`returnPartialData`](/api/interfaces/query/#returnpartialdata) |
| shouldSubscribe | See [`shouldSubscribe`](/api/interfaces/query/#shouldsubscribe) | Predicate which determines whether or not to automatically subscribe |
| variables | `Variables<D, V>`{lang=ts} | A map going from variable name to variable value, where the variables are used within the GraphQL query. |
