---
layout: api
package: '@apollo-elements/components'
module: './apollo-client.js'
---
# Components >> apollo-client || 10

Use `<apollo-client>` for a declarative way to create a simple Apollo Client, or when you want to use a particular Apollo Client for a part of the DOM tree.

## Live Demo

Reuse the same query component for two different GraphQL endpoints.

```html wcd jpNhlIZvECSa3DtawJOk www/index.html
<apollo-client uri="https://api.spacex.land/graphql">
  <h2>SpaceX API Queries</h2>
  <introspection-queries></introspection-queries>
</apollo-client>

<apollo-client uri="https://rickandmortyapi.com/graphql">
  <h2>Rick and Morty API Queries</h2>
  <introspection-queries></introspection-queries>
</apollo-client>
```
