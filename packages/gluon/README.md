# @apollo-elements/gluon

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/gluon.svg)](https://www.npmjs.com/package/@apollo-elements/gluon)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/gluon)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/gluon)](https://github.com/apollo-elements/apollo-elements/blob/main/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>🚀 GluonElement base classes that connect to your Apollo cache 🌜</strong>

<strong>👩‍🚀 We choose to Use the Platform not because it is easy, but because it is awesome 👨‍🚀</strong>

Gluon is a simple, unopinionated UI library which uses `lit-html` for templating without piling on property observation or lifecycle cruft. Check out the [gluon repository](https://github.com/ruphin/gluonjs) or this [introductory blog post](https://dev.to/bennypowers/lets-build-web-components-part-6-gluon-27ll)

> 🔎 Read the [Full API Docs](https://apolloelements.dev/api/libraries/gluon/) 🔎

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
- [🍹 Mixins](#-mixins)
- [👷‍♂️ Maintainers](#-maintainers)
- [📖 Subscriptions](#-subscriptions)

## 🔧 Installation
Apollo Gluon elements are distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

```sh
npm install --save @apollo-elements/gluon
```

## 👩‍🚀 Usage
> See our [docs on setting up Apollo client](https://apolloelements.dev/guides/getting-started/apollo-client/) so your components can fetch their data.

> Read our [docs on working with GraphQL files during development](https://apolloelements.dev/guides/getting-started/buildless-development/) and [in production](https://apolloelements.dev/guides/getting-started/building-for-production/) for more info, and be sure to read about [generating TypeScript types from GraphQL](https://apolloelements.dev/guides/getting-started/codegen/) to enhance your developer experience and reduce bugs.

Typical usage involves importing the base class and extending from it to define your component:

### Queries

```graphql
query ParentQuery {
  helloWorld {
    name
    greeting
  }
}
```

<details>

<summary>Imports</summary>

<code-copy>

```js
import { ApolloQuery, html } from '@apollo-elements/gluon';
import ParentQuery from './Parent.query.graphql';
```

</code-copy>

</details>

```js
class ConnectedElement extends ApolloQuery {
  get template() {
    return (
        this.loading ? html`
          <what-spin></what-spin>`
      : this.error ? html`
          <h1>😢 Such Sad, Very Error! 😰</h1>
          <div>${this.error?.message ?? 'Unknown Error'}</div>`
      : html`
          <div>${this.data?.helloWorld?.greeting}, ${this.data?.helloWorld?.name}</div>
          <connected-child id="child-component"></connected-child>`
    );
   }

   constructor() {
     super();
     this.query = query;
   }
};

customElements.define('connected-element', ConnectedElement)
```

### Mutations

<details>

<summary>Imports</summary>

<code-copy>

```js
import { ApolloMutation, html } from '@apollo-elements/gluon';
import InputMutation from './Input.mutation.graphql';
```

</code-copy>

</details>

<code-copy>

```js
class MutationElement extends ApolloMutation {
  mutation = InputMutation;

  get template() {
    return html`<input @keyup="${this.onInput}"/>`;
  }

  onInput({ target: { value: input }, key }) {
    this.variables = { input };
    if (key === 'Enter') return this.mutate();
  }
};

customElements.define('input-mutation', MutationElement)
```

</code-copy>

## 📚 Other Libraries
Looking for other libraries? Want to use Apollo with vanilla `extends HTMLElement` components? Check out our [docs site](https://apolloelements.dev/)

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
