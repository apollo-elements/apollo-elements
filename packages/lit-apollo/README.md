# @apollo-elements/lit-apollo
[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/lit-apollo.svg)](https://www.npmjs.com/package/@apollo-elements/lit-apollo)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/lit-apollo)
[![Actions Status](https://github.com/apollo-elements/apollo-elements/workflows/CD/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>🚀 LitElement base classes that connect to your Apollo cache 🌜</strong>

<strong>👩‍🚀 It's one small step for a dev, one giant leap for the web platform! 👨‍🚀</strong>

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
- [🍹 Mixins](#-mixins)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation
Apollo elements' `lit-apollo` is distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

```bash
npm install --save @apollo-elements/lit-apollo
```

## 👩‍🚀 Usage
You'll need to bundle the Apollo library with a tool like Rollup. See [instructions for bundling Apollo](https://github.com/apollo-elements/apollo-elements#-bundling) for advice on how to build a working Apollo client.

We recommend assigning your `ApolloClient` instance to the `__APOLLO_CLIENT__` global variables. This not only automatically gives you [dev tools support](https://github.com/apollographql/apollo-client-devtools), but also lets all of your apollo elements connect to the client without needing to configure them.

```js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const cache =
  new InMemoryCache();

const link =
  new HttpLink({ uri: '/graphql' });

export const client =
  new ApolloClient({ cache, link });

window.__APOLLO_CLIENT__ = client;
```

Once that's been accomplished, import the base class and extend from it to define your component.

We recommend using [rollup-plugin-graphql](https://npm.im/@kocal/rollup-plugin-graphql) during bundling, and [es-dev-server-import-graphql](https://npm.im/es-dev-server-import-graphql) during development to allow importing graphql documents.

```graphql
query HelloQuery {
  helloWorld {
    name
    greeting
  }
}
```

```ts
import type {
  HelloQueryData as Data,
  HelloQueryVariables as Variables
} from '../codegen/schema';

import { ApolloQuery, html, customElement } from '@apollo-elements/lit-apollo';

import HelloQuery from './Hello.query.graphql';

@customElement('hello-query')
export class HelloQueryElement extends ApolloQuery<Data, Variables> {
  query = HelloQuery;

  render() {
    return html`
      <what-spin-such-loader ?active="${this.loading}"></what-spin-such-loader>
    ${(
      this.error ? html`
        <h1>😢 Such Sad, Very Error! 😰</h1>
        <pre>
          <code>${error.message}</code>
        </pre>`
    : html`
        <p>
          ${this.data?.helloWorld.greeting ?? 'Hello'},
          ${this.data?.helloWorld.name ?? 'Friend'}!
        </p>`
    )}
    `;
   }
}
```

## 🍹 Mixins
You don't need to use `LitElement` base class for your components if you use the [mixins](https://github.com/apollo-elements/apollo-elements/packages/mixins). You just have to handle the rendering part on your own: e.g. for a query component, you'd implement yourself what happens after `data`, `error`, `loading`, or `networkStatus` change.

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
