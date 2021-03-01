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

```js wcd di6jOwGTWj7uFEWJK741 src/Hello.ts
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

import { HelloQuery } from './Hello.query.graphql';

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

  #data = null;
  set data(data: this['data']) { this.render(this.#data = data); }
  get data() { return this.#data; }

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

## Exports
