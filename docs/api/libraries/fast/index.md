---
layout: layout-api-index
package: '@apollo-elements/fast'
---
# Web Component Libraries >> FAST || 30

[FAST](https://fast.design) is a new and innovative web component library and design system from Microsoft. It features statically typed template literals and a flexible reactivity model.

## Installation

<code-tabs collection="package-managers" default-tab="npm">

```bash tab npm
npm i -S @apollo-elements/fast
```

```bash tab yarn
yarn add @apollo-elements/fast
```

```bash tab pnpm
pnpm add @apollo-elements/fast
```

</code-tabs>

`@apollo-elements/fast` base classes extend from [`FASTElement`](https://fast.design), with all it's ergonomics and reactivity.

```ts wcd UVnKokGfLD6cpG8GAuJT src/Hello.ts
import { ApolloQuery, customElement, html } from '@apollo-elements/fast';

import { HelloQuery } from './Hello.query.graphql';

const name = 'hello-query';

const template = html<HelloQueryElement>`
  <span id="hello">
    ${x => x.data?.hello?.greeting ?? 'hello'},
    ${x => x.data?.hello?.name ?? 'world'}!
  </span>
`;

@customElement({ name, template })
class HelloQueryElement extends ApolloQuery<typeof HelloQuery> {
  query = HelloQuery;

  variables = {
    name: 'Partner',
    greeting: 'Howdy',
  };
}
```

## Exports
