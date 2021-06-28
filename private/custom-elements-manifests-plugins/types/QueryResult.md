| Property | Type | Description |
| -------- | ---- | ----------- |
| data | `Data<D, V>`{lang=ts} | Latest query data. |
| error | `ApolloError`{lang=ts} | See [`error`](/api/core/interfaces/query/#error) |
| loading | `boolean`{lang=ts} | Whether the request is in-flight. |
| refetch | See [`refetch`](/api/core/interfaces/query/#refetch) |
| client | `ApolloClient`{lang=ts} | ApolloClient instance use to make the call. |
| called | `boolean`{lang=ts} | Relevant to subscriptions only. |
| fetchMore | See [fetchMore](/api/core/interfaces/query/#fetchmore) |
| networkStatus | `NetworkStatus`{lang=ts} | See [networkStatus](/api/core/interfaces/query/#networkstatus) |
| variables | `boolean`{lang=ts} | Query variables used in the call. |
| startPolling | `(ms: number) => void`{lang=ts} | Call to start polling the query. |
| stopPolling | `() => void`{lang=ts} | Call to stop polling the query. |
| subscribeToMore | See [subscribeToMore](/api/core/interfaces/query/#subscribetomore) |
