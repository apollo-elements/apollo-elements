| Option | Type | Description |
| ------ | ---- | ----------- |
| query | `DocumentNode`{lang=ts} | A GraphQL document that consists of a single query to be sent down to the server. |
| variables | `Variables<D, V>`{lang=ts} | A map going from variable name to variable value, where the variables are used within the GraphQL query. |
| context | `Record<string, unknown>`{lang=ts} | Context object passed through the link execution chain. |
| errorPolicy | `ErrorPolicy`{lang=ts} | Error policy to use for the query. See [errorPolicy](/api/core/interfaces/query/#errorpolicy) |
| fetchPolicy | `FetchPolicy`{lang=ts} | See [fetchPolicy](/api/core/interfaces/query/#fetchpolicy) |
| nextFetchPolicy | `FetchPolicy`{lang=ts} | See [nextFetchPolicy](/api/core/interfaces/query/#nextfetchpolicy) |
| client | `ApolloClient`{lang=ts} | ApolloClient instance use to make the call. |
| pollInterval | `number`{lang=ts} | See [pollInterval](/api/core/interfaces/query/#pollinterval) |
| noAutoSubscribe | `boolean`{lang=ts} | See [noAutoSubscribe](/api/core/interfaces/query/#noautosubscribe) |
| notifyOnNetworkStatusChange | See [notifyOnNetworkStatusChange](/api/core/interfaces/query/#notifyonnetworkstatuschange) |
| partialRefetch | `boolean`{lang=ts} | See [partialRefetch](/api/core/interfaces/query/#partialrefetch) |
| returnPartialData | `boolean`{lang=ts} | See [returnPartialData](/api/core/interfaces/query/#returnpartialdata) |
| shouldSubscribe | Predicate which determines whether to automatically subscribe.  See [shouldSubscribe](/api/core/interfaces/query/#shouldsubscribe). |
| onError | Callback for when an error occurs. See [onError](/api/core/interfaces/query/#onerror). |
| onData | Callback for when the query resolves. See [onData](/api/core/interfaces/query/#ondata). |
