---
layout: layout-api-index
package: '@apollo-elements/mixins'
---

# Web Component Libraries >> Class Mixins || 10

These custom element [class mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) give you all the features you need to connect your components to your Apollo cache without imposing a specific component library.

## Installation

<code-tabs collection="package-managers" default-tab="npm">

  ```bash tab npm
  npm i -S @apollo-elements/mixins
  ```

  ```bash tab yarn
  yarn add @apollo-elements/mixins
  ```

  ```bash tab pnpm
  pnpm add @apollo-elements/mixins
  ```

</code-tabs>

Use the `ApolloQueryMixin`, `ApolloMutationMixin`, or `ApolloSubscriptionMixin` to add GraphQL behaviour to any base class.

```js playground apollo-mixins Hello.ts
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { HelloQuery } from './Hello.query.graphql.js';
import './client.js';
import '@power-elements/card';

const template = document.createElement('template');
      template.innerHTML = `
        <span id="hello"></span>
      `;

class HelloQueryElement extends ApolloQueryMixin(HTMLElement)<typeof HelloQuery> {
  query = HelloQuery;

  variables = {
    name: 'Partner',
    greeting: 'Howdy',
  };

  onData(data) { this.render(data); }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
      .append(template.content.cloneNode(true));
  }

  render(data = this.data) {
    const greeting = data?.hello?.greeting ?? 'hello';
    const name = data?.hello?.name ?? 'world';
    this.shadowRoot.getElementById('hello').textContent =
      `${greeting}, ${name}!`;
  }
}

customElements.define('hello-query', HelloQueryElement);
```

```html playground-file apollo-mixins index.html
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

```ts playground-file apollo-mixins style.css
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

```ts playground-file apollo-mixins Hello.query.graphql.ts
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

```ts playground-file apollo-mixins client.ts
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
#apollo-mixins {
  --playground-preview-width: 300px;
}
</style>
