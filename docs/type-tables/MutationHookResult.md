| Property | Type | Description |
| -------- | ---- | ----------- |
| called | `boolean`{lang=ts} | Whether the mutation has been called |
| client | `ApolloClient`{lang=ts} | ApolloClient instance use to make the call. |
| data | `Data<D, V>`{lang=ts} | Mutation result. See [data](..//api/core/interfaces/mutation/#data) in ApolloMutationInterface |
| error | `ApolloError`{lang=ts} | Error thrown by the mutation attempt. |
| loading | `boolean`{lang=ts} | Whether the mutation request is in-flight. |
