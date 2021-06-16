---
layout: layout-api
package: '@apollo-elements/components'
module: apollo-client.js
description: Write declarative GraphQL mutations with &lt;apollo-client&gt; custom element. Connect all your Apollo Elements to an Apollo GraphQL client instance, no matter how deep they are in the shadow DOM.
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Components >> apollo-client || 10

Use `<apollo-client>` for a declarative way to create a simple Apollo Client, or when you want to use a particular Apollo Client for a part of the DOM tree.

## Live Demo

Reuse the same query component for two different GraphQL endpoints.

```html playground client-demo
<apollo-client uri="https://api.spacex.land/graphql">
  <h2>SpaceX API Queries</h2>
  <introspection-queries></introspection-queries>
</apollo-client>

<apollo-client uri="https://rickandmortyapi.com/graphql">
  <h2>Rick and Morty API Queries</h2>
  <introspection-queries></introspection-queries>
</apollo-client>

<script type="module" src="introspection-queries.js"></script>
```

```js playground-file client-demo introspection-queries.js
import '@apollo-elements/components';
import { useQuery, component, html } from '@apollo-elements/haunted';
import { IntrospectionQueriesQuery } from './IntrospectionQueries.query.graphql.js';

function IntrospectionQueries() {
  const { data } = useQuery(IntrospectionQueriesQuery);
  const fields = data?.__type?.fields ?? [];
  return html`
    <link rel="stylesheet" href="introspection-queries.css"
    <ul>
    ${fields.map(({ name, description, args }) => html`
      <li>
        <strong ?described="${!!description}">${name}</strong>
        <span>${description}</span>
      </li>
    `)}
    </ul>
  `;
}

customElements.define('introspection-queries', component(IntrospectionQueries));
```

```css playground-file client-demo introspection-queries.css
ul { margin: 0 }
strong { color: #eee; }
strong[described]::after { content: ': '; }
```

```js playground-file client-demo IntrospectionQueries.query.graphql.js
import { gql } from '@apollo/client/core';

export const IntrospectionQueriesQuery = gql` {
  __type(name: "Query") {
    fields {
      name
      description
    }
  }
}`;
```
