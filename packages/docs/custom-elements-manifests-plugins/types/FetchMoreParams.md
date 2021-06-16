| Option | Type | Description |
| ------ | ---- | ----------- |
| query | `DocumentNode \| TypedDocumentNode`{lang=ts} | Query to fetch, defaults to `this.query` |
| updateQuery | `Function`{lang=ts} | Function to determine how to update the cache when the query resolves. (deprecated - use field policies instead) |
| variables | `Variables<D, V>`{lang=ts} | Query variables |
| context | `Record<string, unknown>`{lang=ts} | Context object passed through the link execution chain. |
