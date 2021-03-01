---
layout: layout-api-index
package: '@apollo-elements/hybrids'
---

# Web Component Libraries >> Hybrids || 50

Hybrids is a unique web components framework which combines aspects of functional and object-oriented paradigms into something entirely it's own.

## Installation

<code-tabs collection="package-managers" default-tab="npm">

```bash tab npm
npm i -S @apollo-elements/hybrids
```

```bash tab yarn
yarn add @apollo-elements/hybrids
```

```bash tab pnpm
pnpm add @apollo-elements/hybrids
```

</code-tabs>

Import `client`, `query`, `mutation`, and `subscription` descriptor factories and corresponding object spreads you can roll into your [hybrids](https://hybrids.js.org) to make it easier to connect to your Apollo cache.

```ts wcd ZZG6TLZRHQ9gG6SH35Be src/Hello.ts
import type { ApolloQueryElement } from '@apollo-elements/interfaces';
import { client, query, define, html } from '@apollo-elements/hybrids';

import HelloQuery from './Hello.query.graphql';

define<ApolloQueryElement<typeof HelloQuery>>('hello-query', {
  client: client(),
  query: query(HelloQuery),
  render: ({ data }) => html`
    <span id="hello">
      ${data?.hello?.greeting ?? 'hello'},
      ${data?.hello?.name ?? 'world'}!
    </span>
  `,
});
```
