<img alt="Rocket Ship in Angle Brackets" align="center" width="512" src="https://raw.githubusercontent.com/apollo-elements/apollo-elements/master/logo.png" />

# 🚀 Apollo Elements 👩‍🚀

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/lit-apollo.svg)](https://www.npmjs.com/package/@apollo-elements/lit-apollo)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/lit-apollo)
[![Build Status](https://travis-ci.org/apollo-elements/apollo-elements.svg?branch=master)](https://travis-ci.org/apollo-elements/apollo-elements)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ef02d5cc61cb95938aad/test_coverage)](https://codeclimate.com/github/apollo-elements/apollo-elements/test_coverage)

🚀 Custom element base classes, mixins, and more to connect to your Apollo cache 🌜

👩‍🚀 It's one small step for a dev, one giant leap for the web platform! 👨‍🚀

## 📓 Contents
- [📦 Packages](#-packages)
  - [🔥 `lit-apollo`](#-lit-apollo)
  - [👩‍🔬 `gluon`](#-gluon)
  - [‍🦄 `hybrids`](#-hybrids)
  - [🧱 `polymer`](#-polymer)
  - [🍸 `mixins`](#-mixins)
- [🗞 Bundling](#-bundling)
- [😎 Cool Tricks](#-cool-tricks)
  - [📜 Inline Query Scripts](#-inline-query-scripts)
- [👷‍♂️ Maintainers](#-maintainers)

## 📦 Packages
Apollo Elements offers packages based on a variety of underlying web component authoring libraries. You can pick the one that suits your project in order to keep your app sizes small.

### [🔥 `lit-apollo`](https://github.com/apollo-elements/apollo-elements/tree/master/packages/lit-apollo)
These base classes extend from `LitElement`, so you can quickly get up and running creating declarative front-ends with Apollo GraphQL.

```bash
npm i -S @apollo-elements/lit-apollo
```

```js
import gql from 'graphql-tag'
import { ApolloQuery, html, render } from '@apollo-elements/lit-apollo';
import { client } from './apollo-client';
import { render } from ''

class ApolloApp extends ApolloQuery {
  render() {
    const { data, error, loading } = this;
    return (
        loading ? html`<what-spin></what-spin>`
      : error ? html` <h1>😢 Such Sad, Very Error! 😰</h1> <div>${error.message}</div>`
      : html`<div>${data.helloWorld.greeting}, ${helloWorld.name}</div>`
    );
   }
};

customElements.define('apollo-app', ConnectedElement);

render(
  html`<apollo-app
      .client="${client}"
      .query="${gql`
        query {
          helloWorld {
            greeting
            name
          }
        }
      `}"
  ></apollo-app>`,
  document.body
)
```

### [👩‍🔬 `gluon`](https://github.com/apollo-elements/apollo-elements/tree/master/packages/gluon)
These base classes extend from [`GluonElement`](https://github.com/ruphin/gluonjs), a simplified <abbr title="web components">wc</abbr> library that uses `lit-html` for templating while keeping component state and lifecycle concerns 'close to the metal'.

```bash
npm i -S @apollo-elements/gluon
```

```js
import gql from 'graphql-tag'
import { ApolloQuery, html, render } from '@apollo-elements/gluon';
import { client } from './apollo-client';

class ApolloApp extends ApolloQuery {
  get template() {
    const { data, error, loading } = this;
    return (
        loading ? html`<what-spin></what-spin>`
      : error ? html` <h1>😢 Such Sad, Very Error! 😰</h1> <div>${error.message}</div>`
      : html`<div>${data.helloWorld.greeting}, ${helloWorld.name}</div>`
    );
   }
};

customElements.define('apollo-app', ConnectedElement);

render(
  html`<apollo-app
      .client="${client}"
      .query="${gql`
        query {
          helloWorld {
            greeting
            name
          }
        }
      `}"
  ></apollo-app>`,
  document.body
)
```

### [🦄 `hybrids`](https://github.com/apollo-elements/apollo-elements/tree/master/packages/hybrids)

A set of objects you can roll into your hybrids to make it easier to connect to your Apollo cache.

```bash
npm i -S @apollo-elements/hybrids
```

```js
import { ApolloQuery, queryFactory, define, html } from '@apollo-elements/hybrids';
import gql from 'graphql-tag';

const ConnectedElement = {
  ...ApolloQuery,
  query: queryFactory(gql`query { hello }`),
  render: ({data}) => html`<div>${data.hello}</div>`
};

define('connected-element', ConnectedElement);
```

### [🧱 `polymer`](https://github.com/apollo-elements/apollo-elements/tree/master/packages/polymer)
These custom elements fire polymer-style `*-changed` events when the Apollo cache updates their state. They extend directly from `HTMLElement` so they're small in size, and their notifying properties make them perfect for use in Polymer templates.

```bash
npm i -S @apollo-elements/polymer
```

```html
<apollo-query data="{{data}}" variables="[[variables]]">
  <script type="application/graphql">
    query User($id: ID!)
      user(id: $id) {
        name
        picture
      }
    }
  </script>
</apollo-query>
```

### [🍸 `mixins`](https://github.com/apollo-elements/apollo-elements/tree/master/packages/mixins)
These custom element [class mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) give you all the features you need to connect your components to your Apollo cache without imposing a specific component library.

```bash
npm i -S @apollo-elements/mixins
```

```js
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin.js';

class VanillaQuery extends ApolloQueryMixin(HTMLElement) {
  get data() {
    return this.__data;
  }

  set data(data) {
    this.__data = data;
    this.shadowRoot.innerText = `${data.helloWorld.greeting}, ${data.helloWorld.name}`;
  }  
}
```

## 🗞 Bundling
Since Apollo client [cannot be imported directly into the browser](https://github.com/apollographql/apollo-client/issues/3047), you must transpile and bundle apollo-client in order to use it in your app. We recommend using [Rollup](https://rollupjs.com) for this. Your `rollup.config.js` might look something like this:

```js
// rollup 0.62.0
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  experimentalCodeSplitting: true,
  experimentalDynamicImport: true,

  input: [
    'src/components/app-shell/app-shell.js',
    'src/components/app-view1/app-view1.js',
    'src/components/app-view2/app-view2.js',
    'src/components/app-view404/app-view404.js',
  ],

  output: [{
    dir: 'build/modern',
    format: 'es',
    sourcemap: true,
  }, {
    dir: 'build/nomodule',
    format: 'amd',
    sourcemap: true,
  }],

  plugins: [

    // REQUIRED to roll apollo-client up
    resolve({
      browser: true,
      jsnext: true,
      module: true,
    }),

    commonjs()

  ]
}
```

You may also need to patch certain versions of some Apollo packages in order for them to play nicely with standard tools. [See the chat app demo for examples of how to patch packages](https://gitlab.com/bennyp/demo-lit-apollo-subscriptions/tree/master/patches).

Alternatively, you might bundle and export your Apollo client separately, then import it into your browser-friendly component modules.

## 😎 Cool Tricks

### 📜 Inline Query Scripts
You can provide a GraphQL query string in your markup by appending a
GraphQL script element to your connected element, like so:

```html
<apollo-app>
  <script type="application/graphql">
    query {
      helloWorld {
        name
        greeting
      }
    }
  </script>
</apollo-app>
```

## 👷‍♂️ Maintainers
`apollo-elements` is maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
