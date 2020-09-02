# @apollo-elements/gluon
[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/gluon.svg)](https://www.npmjs.com/package/@apollo-elements/gluon)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/gluon)
[![Actions Status](https://github.com/apollo-elements/apollo-elements/workflows/CD/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>🚀 GluonElement base classes that connect to your Apollo cache 🌜</strong>

<strong>👩‍🚀 We choose to Use the Platform not because it is easy, but because it is awesome 👨‍🚀</strong>

Gluon is a simple, unopinionated UI library which uses `lit-html` for templating without piling on property observation or lifecycle cruft. Check out the [gluon repository](https://github.com/ruphin/gluon) or this [introductory blog post](https://dev.to/bennypowers/lets-build-web-components-part-6-gluon-27ll)

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
- [🍹 Mixins](#-mixins)
- [👷‍♂️ Maintainers](#-maintainers)
- [📖 Subscriptions](#-subscriptions)

## 🔧 Installation
Apollo Gluon elements are distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

```bash
npm install --save @apollo-elements/gluon
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

After that, typical usage involves importing the base class and extending from it to define your component:

### Queries

```js
import { ApolloQuery, html } from '@apollo-elements/gluon';
import ParentQuery from './Parent.query.graphql';

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

```graphql
query ParentQuery {
  helloWorld {
    name
    greeting
  }
}
```

### Mutations

```js
import { ApolloMutation, html } from '@apollo-elements/gluon';
import InputMutation from './Input.mutation.graphql';

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

## 🍹 Mixins
You don't need to use `GluonElement` base class for your components if you use the [mixins](https://github.com/apollo-elements/apollo-elements/packages/mixins). You just have to handle the rendering part on your own: e.g. for a query component, you'd implement yourself what happens after `data`, `error`, `loading`, or `networkStatus` change.

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
