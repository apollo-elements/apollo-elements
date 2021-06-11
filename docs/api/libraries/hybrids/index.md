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

Import `client`, `query`, `mutation`, and `subscription` descriptor factories and spread them into your [hybrids](https://hybrids.js.org) to connect them to your Apollo cache.

```ts wcd ZZG6TLZRHQ9gG6SH35Be src/Hello.ts
import { query, define, html } from '@apollo-elements/hybrids';

import HelloQuery from './Hello.query.graphql';

define('hello-query', {
  query: query(HelloQuery),
  render: ({ query }) => html`
    <span id="hello">
      ${query.data?.hello?.greeting ?? 'hello'},
      ${query.data?.hello?.name ?? 'world'}!
    </span>
  `,
});
```
