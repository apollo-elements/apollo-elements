---
layout: api
package: '@apollo-elements/components'
module: './apollo-client.js'
---
# Components >> apollo-client || 10

## Live Demo

Reuse the same query component for two different GraphQL endpoints.

```ts wcd jpNhlIZvECSa3DtawJOk www/index.html
<apollo-client uri="https://api.spacex.land/graphql">
  <introspection-queries></introspection-queries>
</apollo-client>

<apollo-client uri="https://rickandmortyapi.com/graphql">
  <introspection-queries></introspection-queries>
</apollo-client>
```
