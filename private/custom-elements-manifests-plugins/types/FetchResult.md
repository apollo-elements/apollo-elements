| Property | Type | Description |
| -------- | ----------- | ---- |
| data | `Data<D, V>`{lang=ts} | The result of a successful execution of the mutation |
| errors | `readonly GraphQLError[]`{lang=ts} | included when any errors occurred as a non-empty array |
| extensions | `boolean`{lang=ts} | Reserved for adding non-standard properties |
| context | `Record<string, unknown>`{lang=ts} | See [context](/api/core/interfaces/element/#context) |
