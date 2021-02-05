---
layout: layout-api
package: '@apollo-elements/components'
templateEngineOverride: njk,md
module: './apollo-query.js'
---

# Components >> apollo-query || 20

`<apollo-query>` lets you query GraphQL without writing any JavaScript. Import the custom element then write your template, query, and variables in HTML. The element class inherits from [`ApolloQueryInterface`](/api/interfaces/query/)

Templates use [jexpr](https://npm.im/jexpr) for data expressions and [stampino](https://npm.im/stampino) to update the DOM efficiently. See their respective READMEs for more information.

## Live Demo

```html wcd 1111 www/index.html
<apollo-query>

  <script type="application/graphql">
    query Friends($sort: SortOrder) {
      me { id name picture }
      friends(sort: $sort) { id name picture }
    }
  </script>

  <script type="application/json">
    {
      "sort": {
        "dir": "asc",
        "by": "name"
      }
    }
  </script>

  <template>
    <h1>Friends</h1>
    <p>Hello, {%raw%}{{ data.me.name }}{%endraw%}. Here are your friends.</p>
    <ul>
      <template type="repeat" repeat="{%raw%}{{ data.friends }}{%endraw%}">
        <li data-id$="{%raw%}{{ item.id }}{%endraw%}"
            data-index$="{%raw%}{{ index }}{%endraw%}">
          <figure>
            <img src="{%raw%}{{ item.picture }}{%endraw%}" role="presentation">
            <figcaption>{%raw%}{{ item.name }}{%endraw%}</figcaption>
          </figure>
        </li>
      </template>
    </ul>
  </template>

</apollo-query>
```
