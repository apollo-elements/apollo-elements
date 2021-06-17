---
layout: layout-api-index
package: '@apollo-elements/haunted'
---
# Web Component Libraries >> Haunted || 40

[Haunted](https://github.com/matthewp/haunted) is an implementation of the React hooks API for web components.

## Installing

<code-tabs collection="package-managers" default-tab="npm">

  ```bash tab npm
  npm i -S @apollo-elements/haunted
  ```

  ```bash tab yarn
  yarn add @apollo-elements/haunted
  ```

  ```bash tab pnpm
  pnpm add @apollo-elements/haunted
  ```

</code-tabs>

Import `useQuery`, `useMutation`, or `useSubscription` to define your operation.

```ts playground apollo-haunted Hello.ts
import { useQuery, component, html } from '@apollo-elements/haunted';
import { HelloQuery } from './Hello.query.graphql.js';
import { client } from './client.js';
import '@power-elements/card';

function HelloQueryElement() {
  const { data, executeQuery } = useQuery(HelloQuery, {
    client,
    variables: {
      name: 'Partner',
      greeting: 'Howdy',
    }
  });

  this.executeQuery ??= executeQuery;

  const greeting = data?.hello?.greeting ?? 'hello';
  const name = data?.hello?.name ?? 'world';

  return html`
    <span id="hello">
      ${greeting}, ${name}!
    </span>
  `;
}

customElements.define('hello-query', component(HelloQueryElement));
```

```html playground-file apollo-haunted index.html
<script type="module" src="Hello.js"></script>
<main>
  <hello-query></hello-query>
  <form>
    <p-card>
      <h2 slot="heading">Query Variables</h2>
      <label for="greeting">Greeting</label>
      <input id="greeting" name="greeting" value="Howdy"/>
      <label for="name">Name</label>
      <input id="name" name="name" value="Partner"/>
      <button slot="actions" type="submit">Query</button>
    </p-card>
  </form>
</main>

<script type="module">
  const form = document.querySelector('form');
  const query = document.querySelector('hello-query');

  /**
   * Setting variables automatically updates the query
   * @see https://apolloelements.dev/api/interfaces/query/#variables
   */
  function onSubmit(event) {
    event.preventDefault();
    query.executeQuery({ variables: Object.fromEntries(new FormData(form).entries()) });
  }

  form.addEventListener('submit', onSubmit);
</script>
```

```ts playground-file apollo-haunted style.css
body {
  --p-card-background-elevation1: #222;
  --p-card-divider: #333;
  background-color: #111;
  color: white;
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  place-items: center center;
  height: 100vh;
}

body,
main,
p-card::part(content) {
  display: grid;
  gap: 8px;
}

hello-query {
  font-size: 48px;
}

p-card::part(content) {
  grid-template-columns: 1fr 4fr;
  align-items: center;
}

input,
button {
  color: inherit;
  border: none;
  min-height: 40px;
}

input {
  background: none;
  border-bottom: 1px dashed currentColor;
  font-family: "Recursive Mono", monospace;
}

button {
  background: #333;
}

form h2,
button {
  grid-column: span 2;
}
```

```ts playground-file apollo-haunted Hello.query.graphql.ts
import type { Greeting } from './client.js';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';

export const HelloQuery: TypedDocumentNode<{ hello: Greeting }, Greeting> = gql`
  query HelloQuery($name: String, $greeting: String) {
    hello(name: $name, greeting: $greeting) {
      name
      greeting
    }
  }
`;
```

```ts playground-file apollo-haunted client.ts
import type { NormalizedCacheObject } from '@apollo/client/core';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

export interface Greeting {
  name: string;
  greeting: string
};

const typeDefs = `
  type Greeting {
    name: String
    greeting: String
  }

  type Query {
    hello(name: String, greeting: String): Greeting
  }
`;

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  // client-side mocked GraphQL server. Swap comments to query a live server.
  // link: new HttpLink({ uri: 'https://your.graphql.server/graphql' }),
  link: new SchemaLink({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers: {
        Query: {
          hello(_: any, { name = 'World', greeting = 'Hello' }): Greeting {
            return { name, greeting };
          }
        }
      }
    }),
  }),
});
```

<style data-helmet>
#apollo-haunted {
  --playground-preview-width: 300px;
}
</style>
