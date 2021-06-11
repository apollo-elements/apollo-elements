# @apollo-elements/lit-apollo

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/lit-apollo.svg)](https://www.npmjs.com/package/@apollo-elements/lit-apollo)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/lit-apollo)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/lit-apollo)](https://github.com/apollo-elements/apollo-elements/blob/master/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>🚀 Lit base classes that connect to your Apollo cache 🌜</strong>

<strong>👩‍🚀 It's one small step for a dev, one giant leap for the web platform! 👨‍🚀</strong>

> This package is for single-operation GraphQL components.
> **Looking for Apollo Reactive Controllers?** See [`@apollo-elements/core`](../core/)

<wcd-live data-title="Live Demo">

[![View Live Demo][1]][2]

[1]: https://img.shields.io/badge/Live%20Demo-WebComponents.dev-informational?style=for-the-badge
[2]: https://webcomponents.dev/edit/n67sjuzH56J05LOLnxx0/src/SpacexLaunches.ts

</wcd-live>

> 🔎 Read the [Full API Docs](https://apolloelements.dev/api/libraries/lit-apollo/) 🔎

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
- [📚 Other Libraries](#-other-libraries)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation
Apollo Elements' `lit-apollo` is distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

<code-copy>

```bash
npm install --save @apollo-elements/lit-apollo
```

</code-copy>

## 👩‍🚀 Usage
> See our [docs on setting up Apollo client](https://apolloelements.dev/guides/getting-started/apollo-client/) so your components can fetch their data.

First, let's define our component's [GraphQL query](https://graphql.org/learn/queries/).

<code-copy>

```graphql
query HelloQuery {
  helloWorld {
    name
    greeting
  }
}
```

</code-copy>

> Read our [docs on working with GraphQL files during development](https://apolloelements.dev/guides/getting-started/buildless-development/) and [in production](https://apolloelements.dev/guides/getting-started/building-for-production/) for more info, and be sure to read about [generating TypeScript types from GraphQL](https://apolloelements.dev/guides/getting-started/codegen/) to enhance your developer experience and reduce bugs.

Next, we'll define our UI component. Import the base class and helpers, query, and types:

<details>

<summary>Imports</summary>

<code-copy>

```ts
import { ApolloQuery, html, customElement } from '@apollo-elements/lit-apollo';

import HelloQuery from './Hello.query.graphql';

import type {
  HelloQueryData as Data,
  HelloQueryVariables as Variables
} from '../codegen/schema';
```

</code-copy>

</details>

Then define your component's template. Make sure to set the `query` field, so your component starts fetching data automatically.

<code-copy>

```ts
@customElement('hello-query')
export class HelloQueryElement extends ApolloQuery<Data, Variables> {
  query = HelloQuery;

  render() {
    return html`
      <what-spin-such-loader ?active="${this.loading}"></what-spin-such-loader>
    ${(
      this.error ? html`
        <h1>😢 Such Sad, Very Error! 😰</h1>
        <pre><code>${error.message}</code></pre>`
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

</code-copy>

## 📚 Other Libraries
Looking for other libraries? Want to use Apollo with vanilla `extends HTMLElement` components? Check out our [docs site](https://apolloelements.dev/)

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
