| Property | Type | Description |
| -------- | ---- | ----------- |
| data | `Data<D>`{lang=ts} | If the query resolved, the data. |
| error | `ApolloError`{lang=ts} | If the query rejected, the error. |
| errors | `readonly GraphQLError[]`{lang=ts} | If the query returned partials results, and some were errors, the list of errors. |
| loading | `boolean`{lang=ts} | Whether the operation is in-flight. |
| partial | `boolean`{lang=ts} | Whether the query returned partial data. |
| networkStatus | `NetworkStatus`{lang=ts} | See [NetworkStatus](#networkstatus). |
