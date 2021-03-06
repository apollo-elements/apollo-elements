---
layout: layout-api-index
package: '@apollo-elements/lit-apollo'
---
# Web Component Libraries >> LitElement || 20

[`lit-element`](https://lit-element.polymer-project.org) is a reactive component base class from the Polymer team at Google. It's a popular and simple choice for building any kind of web component project.

## Installation

<code-tabs collection="package-managers" default-tab="npm">

  ```bash tab npm
  npm i -S @apollo-elements/lit-apollo
  ```

  ```bash tab yarn
  yarn add @apollo-elements/lit-apollo
  ```

  ```bash tab pnpm
  pnpm add @apollo-elements/lit-apollo
  ```

</code-tabs>

`lit-apollo` base classes extend from `LitElement`, so you can quickly get up and running creating declarative front-ends with Apollo GraphQL.

```ts wcd PmmwJU9LjBDHlkO8WiSq src/Hello.ts
import { ApolloQuery, customElement, html } from '@apollo-elements/lit-apollo';

import { HelloQuery } from './Hello.query.graphql';

@customElement('hello-query')
class HelloQueryElement extends ApolloQuery<typeof HelloQuery> {
  query = HelloQuery;

  variables = {
    greeting: 'Howdy',
    name: 'Partner'
  }

  render() {
    const greeting = this.data?.hello?.greeting ?? 'hello';
    const name = this.data?.hello?.name ?? 'world';
    return html`
      <span id="hello">
        ${greeting}, ${name}!
      </span>
    `;
  }
}
```

## Exports
