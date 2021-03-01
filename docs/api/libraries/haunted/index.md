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

```ts wcd LO2h5x8jgucn83YKGNeB src/Hello.ts
import { useQuery, component, html } from '@apollo-elements/haunted';

import { HelloQuery } from './Hello.query.graphql';

function HelloQueryElement() {
  const { data } = useQuery(HelloQuery, {
    variables: {
      name: 'Partner',
      greeting: 'Howdy',
    }
  });

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

## Exports
