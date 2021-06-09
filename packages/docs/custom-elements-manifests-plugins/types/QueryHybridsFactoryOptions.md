| Option | Type | Description |
| ------ | ---- | ----------- |
| query | `DocumentNode | TypedDocumentNode`{lang=ts} | A GraphQL document that consists of a single query to be sent down to the server. |
| variables | `Variables<D, V>`{lang=ts} | A map going from variable name to variable value, where the variables are used within the GraphQL query. |
| context | `Record<string, unknown>`{lang=ts} | Context object passed through the link execution chain. |
| errorPolicy | `ErrorPolicy`{lang=ts} | Error policy to use for the query. See [errorPolicy](/api/interfaces/query/#errorpolicy) |
| fetchPolicy | `FetchPolicy`{lang=ts} | See [fetchPolicy](/api/interfaces/query/#fetchpolicy) |
| nextFetchPolicy | `FetchPolicy`{lang=ts} | See [nextFetchPolicy](/api/interfaces/query/#nextfetchpolicy) |
| client | `ApolloClient`{lang=ts} | ApolloClient instance use to make the call. |
| pollInterval | `number`{lang=ts} | See [pollInterval](/api/interfaces/query/#pollinterval) |
| noAutoSubscribe | `boolean`{lang=ts} | See [noAutoSubscribe](/api/interfaces/query/#noautosubscribe) |
| notifyOnNetworkStatusChange | See [notifyOnNetworkStatusChange](/api/interfaces/query/#notifyonnetworkstatuschange) |
| partialRefetch | `boolean`{lang=ts} | See [partialRefetch](/api/interfaces/query/#partialrefetch) |
| returnPartialData | `boolean`{lang=ts} | See [returnPartialData](/api/interfaces/query/#returnpartialdata) |
| shouldSubscribe | Predicate which determines whether to automatically subscribe.  See [shouldSubscribe](/api/interfaces/query/#shouldsubscribe). |
| onError | Callback for when an error occurs. See [onError](/api/interfaces/query/#onerror). |
| onData | Callback for when the query resolves. See [onData](/api/interfaces/query/#ondata). |
