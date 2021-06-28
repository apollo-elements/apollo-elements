| Property | Type | Description |
| -------- | ---- | ----------- |
| query | `DocumentNode | TypedDocumentNode`{lang=ts} | See [query](#query) |
| variables | `Variables<D, V>`{lang=ts} | See [variables](/api/core/interfaces/subscription/#variables) |
| fetchPolicy | `FetchPolicy`{lang=ts} | See [fetchPolicy](/api/core/interfaces/subscription/#fetchpolicy) |
| errorPolicy | `ErrorPolicy`{lang=ts} | See [errorPolicy](/api/core/interfaces/subscription/#errorpolicy) |
| context | `Record<string, unknown>`{lang=ts} | Context object passed through the link execution chain. |
