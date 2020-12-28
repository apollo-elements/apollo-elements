# Web Component Libraries >> Gluon || 60

Gluon is a minimalist web components base class that templates components with `lit-html`.

## Installation

<code-tabs collection="package-managers" default-tab="npm">

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

```ts wcd Gigu9IHmpP9NQuANSGcy src/Hello.ts
import { ApolloQuery, html } from '@apollo-elements/gluon';

import HelloQuery from './Hello.query.graphql';

class HelloQueryElement extends ApolloQuery<typeof HelloQuery> {
  query = HelloQuery;

  #data = null;
  set data(data) { this.#data = data; this.render(); }
  get data() { return this.#data; }

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

## Exports
