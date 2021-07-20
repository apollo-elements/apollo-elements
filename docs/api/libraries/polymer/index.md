---
layout: layout-api-index
package: '@apollo-elements/polymer'
---

# Web Component Libraries >> Polymer

Polymer is the <abbr title="original gangsta">OG</abbr> web components library, and while it's now in maintenance ([the library, not the project](https://dev.to/bennypowers/lets-build-web-components-part-4-polymer-library-4dk2#the-polymer-project)), it's still in use all over the web.

## Installation

<code-tabs collection="package-managers" default-tab="npm" align="end">

  ```bash tab npm
  npm i -S @apollo-elements/polymer@next
  ```

  ```bash tab yarn
  yarn add @apollo-elements/polymer@next
  ```

  ```bash tab pnpm
  pnpm add @apollo-elements/polymer@next
  ```

</code-tabs>

Import `apollo-query`, `apollo-mutation`, or `apollo-subscription` to bind data up into your Polymer elements.

## Examples

These custom elements fire [polymer](https://polymer-library.polymer-project.org)-style `*-changed` events when the Apollo cache updates their state. They extend directly from `HTMLElement` so they're small in size, and their notifying properties make them perfect for use in Polymer templates.

### Using `<apollo-client>` to Scope a Client to it's Children

This example uses [`<apollo-client>`](/api/components/apollo-client/) to create a client and assign it to `<apollo-query>`. There's no need to explicitly assign the `client` property, since `<apollo-client>` automatically sets the client on all it's deeply nested children.

```ts playground polymer-apollo Hello.ts
import { PolymerElement, html } from '@polymer/polymer';
import { HelloQuery } from './Hello.query.graphql.js';
import '@apollo-elements/components/apollo-client';
import '@apollo-elements/polymer/polymer-apollo-query';

class HelloQueryElement extends PolymerElement {
  static get template() {
    return html`
      <polymer-apollo-query
          data="{%raw%}{{data}}{%endraw%}"
          query="[[query]]"
          variables="[[variables]]">
      </polymer-apollo-query>

      <h2>Variables</h2>
      <label>Name <input value="{%raw%}{{name::input}}{%endraw%}"/></label>
      <label>Greeting <input value="{%raw%}{{greeting::input}}{%endraw%}"/></label>

      <h2>Result</h2>
      <span id="hello">[[data.hello.greeting]], [[data.hello.name]]!</span>
    `;
  }

  static get properties() {
    return {
      data: { type: Object },
      variables: { type: Object, computed: 'computeVariables(name, greeting)' },
      query: { type: Object, value: () => HelloQuery },
      name: { type: String, value: 'World' },
      greeting: { type: String, value: 'Hello' },
    };
  }

  computeVariables(name, greeting) { return { name, greeting }; }
}

customElements.define('hello-query', HelloQueryElement);
```

```js playground-file polymer-apollo Hello.query.graphql.js
import { gql } from '@apollo/client/core';
export const HelloQuery = gql`
  query HelloQuery($name: String, $greeting: String) {
    hello(name: $name, greeting: $greeting) {
      name
      greeting
    }
  }
`;
```

```ts playground-file polymer-apollo client.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

const schema = makeExecutableSchema({
  typeDefs: `
    type Greeting {
      name: String
      greeting: String
    }

    type Query {
      hello(name: String, greeting: String): Greeting
    }
  `,
  resolvers: {
    Query: {
      async hello(_, { name = 'World', greeting = 'Hello' }) {
        return { name, greeting };
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

```html playground-file polymer-apollo index.html
<script type="module" src="client.js"></script>
<script type="module" src="Hello.js"></script>

<apollo-client>
  <hello-query></hello-query>
</apollo-client>
```

### Using Two-Way Binding to Set the Client

If you prefer, you can use Polymer's two-way binding to set an element's client property, instead of nesting the apollo elements under an `<apollo-client>` element.

```html
<apollo-client uri="/graphql" client="{%raw%}{{ownClient}}{%endraw%}"></apollo-client>
<apollo-client uri="https://api.spacex.land/graphql" client="{%raw%}{{spaceXClient}}{%endraw%}"></apollo-client>

<apollo-query
    client="[[ownClient]]"
    data="{%raw%}{{helloData}}{%endraw%}"
    query="[[helloQuery]]"
    variables="[[helloVariables]]">
</apollo-query>

<apollo-query
    client="[[spacexClient]]"
    data="{%raw%}{{launchesData}}{%endraw%}"
    query="[[launchesQuery]]"
    variables="[[launchesVariables]]">
</apollo-query>

<p>
  <span>[[getName(helloData)]]</span>,
  <span>[[getGreeting(helloData)]]</span>!
  Latest launch is
  <span>[[launchesData.launches.0.mission_name]]</span>.
</p>
```

## Exports
