# Web Component Libraries >> Gluon

Gluon is a minimalist web components base class that templates components with `lit-html`.

## Installation

<code-tabs collection="package-managers" default-tab="npm" align="end">

  ```bash tab npm
  npm i -S @apollo-elements/gluon
  ```

  ```bash tab yarn
  yarn add @apollo-elements/gluon
  ```

  ```bash tab pnpm
  pnpm add @apollo-elements/gluon
  ```

</code-tabs>

Import `ApolloQuery`, `ApolloMutation`, or `ApolloSubscription` to define your components.

```ts playground apollo-gluon Hello.ts
import { ApolloQuery, html } from '@apollo-elements/gluon';
import { HelloQuery } from './Hello.query.graphql.js';
import '@power-elements/card';
import './client.js';

class HelloQueryElement extends ApolloQuery<typeof HelloQuery> {
  query = HelloQuery;

  onData() { this.render(); }

  get template() {
    const greeting = this.data?.hello?.greeting ?? 'hello';
    const name = this.data?.hello?.name ?? 'world';
    return html`
      <span id="hello">
        ${greeting}, ${name}!
      </span>
    `;
  }
}

customElements.define('hello-query', HelloQueryElement);
```

```html playground-file apollo-gluon index.html
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
    query.variables = Object.fromEntries(new FormData(form).entries());
  }

  form.addEventListener('submit', onSubmit);
</script>
```

```ts playground-file apollo-gluon style.css
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

```ts playground-file apollo-gluon Hello.query.graphql.ts
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

```ts playground-file apollo-gluon client.ts
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

declare global { interface Window { __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>; } }

window.__APOLLO_CLIENT__ = new ApolloClient({
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
#apollo-gluon {
  --playground-preview-width: 300px;
}
</style>
