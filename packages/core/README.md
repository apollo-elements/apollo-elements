# @apollo-elements/core

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/core.svg)](https://www.npmjs.com/package/@apollo-elements/core)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/core)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/core)](https://github.com/apollo-elements/apollo-elements/blob/main/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>🚀 Reactive GraphQL Controllers 🌜</strong>

<strong>👩‍🚀 Lander to Mission Controll, Come in, Over 👨‍🚀</strong>

<!-- <wcd-live data-title="Live Demo">

[![View Live Demo][1]][2]

[1]: https://img.shields.io/badge/Live%20Demo-WebComponents.dev-informational?style=for-the-badge
[2]: https://webcomponents.dev/edit/n67sjuzH56J05LOLnxx0/src/SpacexLaunches.ts

</wcd-live> -->

> 🔎 Read the [Full API Docs](https://apolloelements.dev/api/libraries/core/) 🔎

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
- [📚 Other Libraries](#-other-libraries)
- [❓ FAQs](#-faqs)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation
Apollo Elements is distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

<code-copy>

```bash
npm install --save @apollo-elements/core
```

</code-copy>

## 👩‍🚀 Usage
> See our [docs on setting up Apollo client](https://apolloelements.dev/guides/getting-started/apollo-client/) so your components can fetch their data.

First, let's define our [GraphQL query](https://graphql.org/learn/queries/).

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

Next, we'll define our UI component. Import the controller, query, and types:

<details>

<summary>Imports</summary>

<code-copy>

```ts
import { ApolloQueryController } from '@apollo-elements/core';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { HelloQuery } from './Hello.query.graphql';
```

</code-copy>

</details>

Then define your component's template. Make sure to set the `query` field, so your component starts fetching data automatically.

<code-copy>

```ts
@customElement('hello-world')
export class HelloWorldElement extends LitElement {
  query = new ApolloQueryController(this, HelloQuery);

  render() {
    return html`
      <what-spin-such-loader ?active="${this.query.loading}"></what-spin-such-loader>
    ${(
      this.query.error ? html`
        <h1>😢 Such Sad, Much Error! 😰</h1>
        <pre><code>${error.message}</code></pre>`
    : html`
        <p>
          ${this.query.data?.helloWorld.greeting ?? 'Hello'},
          ${this.query.data?.helloWorld.name ?? 'Friend'}!
        </p>`
    )}
    `;
   }
}
```

</code-copy>

## ❓ FAQs

### Is this package only for Lit users?

No! You can use these controllers on any object that implements the `ReactiveControllerHost` interface, even vanilla `HTMLElement` by way of the `ControllerHostMixin`

```ts
import { ControllerHostMixin } from '@apollo-elements/mixins/controller-host-mixin';
import { ApolloQueryController } from '@apollo-elements/core/apollo-query-controller';

customElements.define('hello-world', class HelloWorldElement extends ControllerHostMixin(HTMLElement) {
  query = new ApolloQueryController(this, HelloQuery);

  update() {
    const greeting = this.query.data?.helloWorld.greeting ?? 'Hello';
    const name = this.query.data?.helloWorld.name ?? 'Friend';
    // Just for demo purposes, Don't actually use innerHTML!
    this.innerHTML = `<p>${greeting}, ${name}!</p>`;
    super.update();
  }
});
```

## 📚 Other Libraries
Looking for other libraries? Want to use Apollo with vanilla `extends HTMLElement` components? Check out our [docs site](https://apolloelements.dev/)

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
