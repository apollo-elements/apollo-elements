---
name: ApolloQueryController
---

## `ApolloQueryController`

- Queries data from your GraphQL cache or server
- Exposes the state of the query:
    - `data` - the result of the query
    - `loading`
    - `error`
- Lots of options like
    - Polling
    - Fetch and Error Policies
- `fetchMore()` for infinite scrolling, pagination, etc.
