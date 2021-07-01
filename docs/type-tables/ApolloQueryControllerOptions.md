| Option          | Type | Description |
| --------------- | ---- | ----------- |
| fetchPolicy     | `WatchQueryFetchPolicy`{lang=ts}                      | The [fetchPolicy](https://www.apollographql.com/docs/react/api/core/ApolloClient/#FetchPolicy) for the query. |
| variables       | `Variables<D, V>`{lang=ts}                            | Variables for the query. |
| noAutoSubscribe | `boolean`{lang=ts}                                    | If true, the element will not begin querying data until you manually call `subscribe` |
| shouldSubscribe | `(op?: Partial<Operation<D, V>>) => boolean`{lang=ts} | If true, the element will not begin querying data until you manually call `subscribe` | Determines whether the element should attempt to subscribe automatically\nOverride to prevent subscribing unless your conditions are met |
| onData          | `(data: Data<D>) => void`{lang=ts}                    | Optional callback for when a query resolves. |
| onError         | `(error: Error) => void`{lang=ts}                     | Optional callback for when an error occurs. |

Inherits from [ApolloControllerOptions](/api/core/controllers/controller/#options)
