# @apollo-elements/fast

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/fast.svg)](https://www.npmjs.com/package/@apollo-elements/fast)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/fast)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/fast)](https://github.com/apollo-elements/apollo-elements/blob/main/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>🚀 FASTElement base classes that connect to your Apollo cache 🌜</strong>

<strong>👩‍🚀 Launch your app at escape velocity! 👨‍🚀</strong>

> 🔎 Read the [Full API Docs](https://apolloelements.dev/api/libraries/fast/) 🔎

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
- [📚 Other Libraries](#-other-libraries)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation
Apollo elements' `fast` is distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your computer](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

```bash
npm install --save @apollo-elements/fast
```

## 👩‍🚀 Usage
> See our [docs on setting up Apollo client](https://apolloelements.dev/guides/getting-started/apollo-client/) so your components can fetch their data.

First, let's define our component's [GraphQL query](https://graphql.org/learn/queries/).

```graphql
query HelloQuery {
  helloWorld {
    name
    greeting
  }
}
```

> Read our [docs on working with GraphQL files during development](https://apolloelements.dev/guides/getting-started/buildless-development/) and [in production](https://apolloelements.dev/guides/getting-started/building-for-production/) for more info, and be sure to read about [generating TypeScript types from GraphQL](https://apolloelements.dev/guides/getting-started/codegen/) to enhance your developer experience and reduce bugs.

Next, we'll define our UI component. Import the base class and helpers, query, and types:

<details>

<summary>Imports</summary>

<code-copy>

```ts
import { ApolloQuery, html, customElement } from '@apollo-elements/fast';

import HelloQuery from './Hello.query.graphql';

import type {
  HelloQueryData as Data,
  HelloQueryVariables as Variables
} from '../codegen/schema';
```

</code-copy>

</details>

Then define your component's template. Make sure to set the `query` field, so your component starts fetching data automatically.

> Read more about [working with Queries](https://apolloelements.dev/pages/using%20apollo/queries)

<code-copy>

```ts
const template = html<HelloQueryElement>`
    <what-spin-such-loader ?active="${x => x.loading}"></what-spin-such-loader>
  ${x => (
    x.error ? html`
      <h1>😢 Such Sad, Very Error! 😰</h1>
      <pre><code>${error.message}</code></pre>`
  : html`
      <p>
        ${x.data?.helloWorld?.greeting ?? 'Hello'},
        ${x.data?.helloWorld?.name ?? 'Friend'}!
      </p>`
  )}
`;

@customElement({ name: 'hello-query', template })
export class HelloQueryElement extends ApolloQuery<Data, Variables> {
  query = HelloQuery;
}
```

</code-copy>

## 📚 Other Libraries
Looking for other libraries? Want to use Apollo with vanilla `extends HTMLElement` components? Check out our [docs site](https://apolloelements.dev/)

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
