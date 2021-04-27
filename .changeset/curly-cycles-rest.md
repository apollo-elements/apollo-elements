---
"@apollo-elements/create": minor
---

Mocks the node `process` global in the browser, in order to account for a problem in the `graphql` npm package, which is a dependency of Apollo client.

See https://github.com/graphql/graphql-js/pull/2409
