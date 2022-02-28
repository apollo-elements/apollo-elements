---
name: ApolloMutationController
---

## `ApolloMutationController`

- Fires Mutations to your GraphQL server
- Provides a `mutate()` function with options:
    - `variables`
    - `optimisticResponse`, etc.
- Maintains the state of the request
    - `data` - the mutation result
    - `loading`
    - `error`
- `update` function or `refetchQueries` to manage cache
