| Option | Type | Description |
| ------ | ---- | ----------- |
| query | `DocumentNode | TypedDocumentNode`{lang=ts} | A GraphQL document that consists of a single query to be sent down to the server. |
| variables | `Variables<D, V>`{lang=ts} | A map going from variable name to variable value, where the variables are used within the GraphQL query. |
| fetchPolicy | `FetchPolicy`{lang=ts} | Specifies the [`fetchPolicy`](/api/core/interfaces/query/#fetchpolicy) to be used for this query. |
| errorPolicy | `ErrorPolicy`{lang=ts} | Specifies the [`ErrorPolicy`](/api/core/interfaces/element/#errorpolicy) to be used for this query. |
| context | `Record<string, unknown>`{lang=ts} | Context object passed through the link execution chain. |
