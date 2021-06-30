| Option | Type | Description |
| ------ | ---- | ----------- |
| client                 | `ApolloClient`{lang=ts}                     | ApolloClient instance for the subscription. |
| fetchPolicy            | `FetchPolicy`{lang=ts}                      | See [fetchPolicy](/api/core/interfaces/subscription/#fetchpolicy) |
| noAutoSubscribe        | `boolean`{lang=ts}                          | If set, the component will not subscribe until called explicitly. See [noAutoSubscribe](/api/core/interfaces/subscription/#noautosubscribe) |
| onSubscriptionComplete |                                             | Callback that fires when the subscription ends. See [onSubscriptionComplete](/api/core/interfaces/subscription/#onsubscriptioncomplete) |
| onSubscriptionData     |                                             | Callback for when subscription produces new data. See [onSubscriptionData](/api/core/interfaces/subscription/#onsubscriptiondata) |
| shouldResubscribe      | `boolean`{lang=ts}                          | Determines if your subscription should be unsubscribed and subscribed again |
| shouldSubscribe        |                                             | Predicate which determines whether to automatically subscribe. See [shouldSubscribe](/api/core/interfaces/subscription/#shouldsubscribe) |
| skip                   | `boolean`{lang=ts}                          | When true, the subscription will not fetch at all. |
| subscription           | `DocumentNode`{lang=ts} | Subscription GraphQL Document |
| variables              | `Variables<D, V>`{lang=ts}                  | Subscription variables |

Inherits from [ApolloControllerOptions](/api/core/controllers/controller#options)
