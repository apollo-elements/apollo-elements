| Option | Type | Description |
| ------ | ---- | ----------- |
| client | `ApolloClient`{lang=ts} | Apollo Client to use for the subscription. |
| context | `Record<string, unknown>`{lang=ts} | Context object passed through the link execution chain. |
| errorPolicy | `ErrorPolicy`{lang=ts} | Error policy to use for the subscription. See [errorPolicy](/api/core/interfaces/mutation/#errorpolicy) |
| fetchPolicy | `FetchPolicy`{lang=ts} | See [fetchPolicy](/api/core/interfaces/subscription/#fetchpolicy) |
| shouldResubscribe | `boolean`{lang=ts} | Boolean, or a predicate function of `SubscriptionDataOptions` that determines if your subscription should be unsubscribed and subscribed again |
| skip | `boolean`{lang=ts} | If skip is true, the subscription will be skipped entirely. |
| subscription | `DocumentNode | TypedDocumentNode`{lang=ts} | GraphQL document with a single subscription. |
| variables | `Variables<D, V>`{lang=ts} | An object containing all of the variables your subscription needs to execute. |
