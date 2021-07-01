| Option | Type | Description |
| ------ | ---- | ----------- |
| variables           | `Variables<D, V>`{lang=ts}               | Operation variables. See [variables](/api/core/interfaces/mutation/#variables). |
| optimisticResponse  | `OptimisticResponseType<D, V>`{lang=ts}  | See [optimisticResponse](/api/core/interfaces/mutation/#optimisticresponse) |
| fetchPolicy         | `ErrorPolicy`{lang=ts}                   | See [fetchPolicy](/api/core/interfaces/mutation/#fetchpolicy) |
| refetchQueries      | `RefetchQueriesType<D> | null`{lang=ts}` | See [refetchQueries](/api/core/interfaces/mutation/#refetchqueries) | |
| awaitRefetchQueries | `boolean`{lang=ts}                       | See [awaitRefetchQueries](/api/core/interfaces/mutation/#awaitrefetchqueries) |
| update              | `MutationUpdaterFn<Data<D>>`{lang=ts}    | Function used to update the client cache following the mutation. See [updater](/api/core/interfaces/mutation/#updater). |

Inherits from [ApolloControllerOptions](/api/core/controllers/controller/#options)
