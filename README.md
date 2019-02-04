<div align="center">
  <img alt="Rocket Ship in Angle Brackets" width="256" src="https://raw.githubusercontent.com/apollo-elements/apollo-elements/master/logo.png" />
  <h1>🚀 Apollo Elements 👩‍🚀</h1>
  <p><strong>🚀 Custom elements meet Apollo GraphQL 🌜</strong></p>
  <p><strong>👩‍🚀 It's one small step for a dev, one giant leap for the web platform! 👨‍🚀</strong></p>
</div>

[![Maintained with Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/apollo-elements/apollo-elements/issues)
[![Build Status](https://travis-ci.org/apollo-elements/apollo-elements.svg?branch=master)](https://travis-ci.org/apollo-elements/apollo-elements)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ef02d5cc61cb95938aad/test_coverage)](https://codeclimate.com/github/apollo-elements/apollo-elements/test_coverage)
[![Demo Online](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://lit-apollo-subscriptions.herokuapp.com)

## 📓 Contents
- [🤖 Demo](#-demo)
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

## 🤖 Demo
[`#leeway`](https://lit-apollo-subscriptions.herokuapp.com) is a progressive web app that uses `lit-apollo` to make it easier for you to avoid doing actual work. Check out the [source repo](https://gitlab.com/bennyp/demo-lit-apollo-subscriptions) for an example of how to build apps with Apollo Elements. The demo includes:

- <abbr title="server side rendering">SSR</abbr>
- Code Splitting
- Aggressive minification, including `lit-html` template literals
- CSS-in-CSS ( e.g. `import shared from '../shared-styles.css';`)
- GQL-in-GQL ( e.g. `import query from './my-component-query.graphql';`)
- GraphQL Subscriptions over websocket

[![Lighthouse Scores: 98 (performance), 100 (accessibility), 93 (best practises), 100 (SEO), 12/12 (PWA)](https://user-images.githubusercontent.com/1466420/52176144-5c25f280-27b7-11e9-8e14-290651f98e36.png)](https://github.com/apollo-elements/apollo-elements/files/2825459/lit-apollo-subscriptions.herokuapp.com-20190203T132249.zip)


## 📦 Packages
Apollo Elements offers packages based on a variety of underlying web component authoring libraries. You can pick the one that suits your project in order to keep your app sizes small.

### [🔥 `lit-apollo`](https://github.com/apollo-elements/apollo-elements/tree/master/packages/lit-apollo)
These base classes extend from [`LitElement`](https://lit-element.polymer-project.org), so you can quickly get up and running creating declarative front-ends with Apollo GraphQL.

```bash
npm i -S @apollo-elements/lit-apollo
```

```html
<!-- index.html -->
<script type="module" src="app.bundle.js"></script>
<script nomodule src="app.bundle.system.js"></script>
<apollo-app>
  <script type="application/graphql">
    query {
      helloWorld {
        greeting
        name
      }
    }
  </script>
</apollo-app>
```

```js
// app.js
import gql from 'graphql-tag'
import { ApolloQuery, html } from '@apollo-elements/lit-apollo';
import { client } from './apollo-client';
import { render } from ''

customElements.define('apollo-app', class ApolloApp extends ApolloQuery {
  render() {
    const { data, error, loading } = this;
    return (
        loading ? html`<what-spin></what-spin>`
      : error ? html` <h1>😢 Such Sad, Very Error! 😰</h1> <div>${error.message}</div>`
      : html`<div>${data.helloWorld.greeting}, ${helloWorld.name}</div>`
    );
   }
});
```

### [👩‍🔬 `gluon`](https://github.com/apollo-elements/apollo-elements/tree/master/packages/gluon)
These base classes extend from [`GluonElement`](https://github.com/ruphin/gluonjs), a simplified <abbr title="web components">wc</abbr> library that uses `lit-html` for templating while keeping component state and lifecycle concerns 'close to the metal'.

```bash
npm i -S @apollo-elements/gluon
```

```js
import gql from 'graphql-tag'
import { ApolloQuery, html } from '@apollo-elements/gluon';
import { client } from './apollo-client';

customElements.define('apollo-app', class ApolloApp extends ApolloQuery {
  get template() {
    const { data, error, loading } = this;
    return (
        loading ? html`<what-spin></what-spin>`
      : error ? html` <h1>😢 Such Sad, Very Error! 😰</h1> <div>${error.message}</div>`
      : html`<div>${data.helloWorld.greeting}, ${helloWorld.name}</div>`
    );
   }
});
```

### [🦄 `hybrids`](https://github.com/apollo-elements/apollo-elements/tree/master/packages/hybrids)

A set of objects you can roll into your [hybrids](https://hybrids.js.org) to make it easier to connect to your Apollo cache.

```bash
npm i -S @apollo-elements/hybrids
```

```js
import { ApolloQuery, queryFactory, define, html } from '@apollo-elements/hybrids';
import gql from 'graphql-tag';

export const ConnectedElement = {
  ...ApolloQuery,
  query: queryFactory(gql`query { hello }`),
  render: ({data}) => html`<div>${data.hello}</div>`
};

define('connected-element', ConnectedElement);
```

### [🧱 `polymer`](https://github.com/apollo-elements/apollo-elements/tree/master/packages/polymer)
These custom elements fire [polymer](https://polymer-library.polymer-project.org)-style `*-changed` events when the Apollo cache updates their state. They extend directly from `HTMLElement` so they're small in size, and their notifying properties make them perfect for use in Polymer templates.

```bash
npm i -S @apollo-elements/polymer
```

```js
// app.js
import { client } from './apollo-client.js'
import '@apollo-elements/polymer/apollo-query.js';
window.__APOLLO_CLIENT__ = client
```

```js
import { PolymerElement, html } from '@polymer/polymer';
import '@apollo-elements/polymer/apollo-query.js';
import '@polymer/paper-card/paper-card.js';

customElements.define('my-app', class MyTemplate extends PolymerElement {
  static get template() {
    return html`
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

    <paper-card heading="[[data.name]]" image="[[data.picture]]"></paper-card>
    `;
  }

  static get properties() {
    return {
      variables: {
        type: Object,
        value: () => ({id: ''});
      }
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    const { id = '' } = await getToken();
    this.variables = { id };
  }
}
```

### [🍸 `mixins`](https://github.com/apollo-elements/apollo-elements/tree/master/packages/mixins)
These custom element [class mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) give you all the features you need to connect your components to your Apollo cache without imposing a specific component library.

```bash
npm i -S @apollo-elements/mixins
```

```js
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin.js';

customElements.define('vanilla-query', class VanillaQuery extends ApolloQueryMixin(HTMLElement) {
  get data() {
    return this.__data;
  }

  set data(data) {
    this.__data = data;
    this.shadowRoot.innerText = `${data.helloWorld.greeting}, ${data.helloWorld.name}`;
  }  
});
```

## 🗞 Bundling
Since Apollo client [cannot be imported directly into the browser](https://github.com/apollographql/apollo-client/issues/3047), you must transpile and bundle apollo-client in order to use it in your app. We recommend using [Rollup](https://rollupjs.com) for this. Your `rollup.config.js` might look something like this:

```js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
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
    format: 'system',
    sourcemap: true,
  }],

  plugins: [

    // REQUIRED to roll apollo-client up
    resolve({
      browser: true,
      jsnext: true,
      module: true,
    }),

    commonjs({
      namedExports: {
        // Necessary to roll apollo-link-state up.
        // until graphql-anywhere 5.0
        'graphql-anywhere/lib/async': ['graphql'],
        // Needed to roll up apollo-cache-persist
        'apollo-cache-persist': ['persistCache']
      }
    }),

  ]
}
```

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
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
