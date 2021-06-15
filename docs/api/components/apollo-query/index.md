---
layout: layout-api
package: '@apollo-elements/components'
templateEngineOverride: njk,md
module: 'apollo-query.js'
---

# Components >> apollo-query || 30

`<apollo-query>` lets you query GraphQL without writing any JavaScript. Import the custom element then write your template, query, and variables in HTML. The element class inherits from [`ApolloQueryInterface`](/api/core/interfaces/query/)

<inline-notification type="tip">

This page has detailed API documentation for `<apollo-query>`. See the [`<apollo-query>` HTML Element guide](/guides/usage/queries/html/) for a HOW-TO guide.

</inline-notification>

## Live Demo

```html playground query-component index.html
<apollo-client>
  <apollo-query>

    <script type="application/graphql" src="Friends.query.graphql"></script>

    <template>
      <link rel="stylesheet" href="Friends.css"/>
      <h1>Friends</h1>
      <p>Hello, {%raw%}{{ data.me.name }}{%endraw%}. Here are your friends.</p>
      <ul>
        <template type="repeat" repeat="{%raw%}{{ data.friends ?? [] }}{%endraw%}">
          <li data-id="{%raw%}{{ item.id }}{%endraw%}"
              data-index="{%raw%}{{ index }}{%endraw%}">
            <figure>
              <img .src="{%raw%}{{ item.picture }}{%endraw%}" role="presentation">
              <figcaption>{%raw%}{{ item.name }}{%endraw%}</figcaption>
            </figure>
          </li>
        </template>
      </ul>
    </template>

  </apollo-query>
</apollo-client>
<script type="module" src="client.js"></script>
```

```graphql playground-file query-component Friends.query.graphql
query Friends {
  me { id name picture }
  friends { id name picture }
}
```

```css playground-file query-component Friends.css
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(100px, auto)
  );
}

figure { display: contents; }
img { width: 100px; height: auto; }

```

```js playground-file query-component client.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

import '@apollo-elements/components';

const USERS = [
  { id: 1, name: 'Neil', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Neil_Armstrong_pose.jpg/1024px-Neil_Armstrong_pose.jpg?1623601441968' },
  { id: 2, name: 'Buzz', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Buzz_Aldrin.jpg/1024px-Buzz_Aldrin.jpg?1623601483170' },
  { id: 3, name: 'Michael', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Michael_Collins_%28S69-31742%2C_restoration%29.jpg/1024px-Michael_Collins_%28S69-31742%2C_restoration%29.jpg?1623601522599' },
];

const schema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID
      name: String
      picture: String
    }

    type SortOrder {
      dir: String
      by: String
    }

    type Query {
      me: User
      friends: [User]
    }
  `,
  resolvers: {

    Query: {
      async me() {
        return USERS.find(x => x.id === 1);
      },
      async friends() {
        return USERS.filter(x => x.id !== 1);
      }
    },

  }
});

document.querySelector('apollo-client')
  .client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  });
```
