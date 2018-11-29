# lit-apollo
[![Published on npm](https://img.shields.io/npm/v/lit-apollo.svg)](https://www.npmjs.com/package/lit-apollo)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/lit-apollo)
[![Build Status](https://travis-ci.org/bennypowers/lit-apollo.svg?branch=master)](https://travis-ci.org/bennypowers/lit-apollo)
[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)

🚀 Custom element base classes & mixins that connect to your Apollo cache 🌜
👩‍🚀 It's one small step for a dev, one giant leap for the web platform! 👨‍🚀

## 📓 Contents
- [🔧 Installation](#-installation)
- [📦 Bundling](#-bundling)
- [👩‍🚀 Usage](#-usage)
- [🍹 Using as a Mixin](#-using-as-a-mixin)
- [😎 Cool Tricks](#-cool-tricks)
  - [📜 Inline Query Scripts](#-inline-query-scripts)
  - [🏦 Managing the Cache](#-managing-the-cache)
  - [⌚️ Asynchronous Client](#-asynchronous-client)
  - [🔥 Use lit-apollo elements in a Polymer Template](#-use-lit-apollo-in-a-polymer-template)

## 🔧 Installation
`lit-apollo` is distributed through `npm`. To install a copy of the latest version of `lit-apollo` in your project's `node_modules` directory, first [Install npm on your system](https://www.npmjs.com/get-npm), then run the following command in your project's root directory

```bash
npm install --save lit-apollo
```

## 📦 Bundling
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

    // REQUIRED to roll apollo-client up
    commonjs({
      namedExports: {
        'apollo-cache-persist': ['persistCache'],
        'graphql-anywhere/lib/async': ['graphql'],
      },
    })

  ]
}
```

An alternative to bundling your whole app is to bundle and export your apollo-client separately, then import it into your browser-friendly component modules.

## 👩‍🚀 Usage

```html
<script type="module">
  import gql from 'graphql-tag'
  import { ApolloClient } from 'apollo-client';
  import { ApolloQuery, html } from 'lit-apollo/apollo-query';
  import { cache } from './cache';
  import { link } from './link';

  // Create the Apollo Client
  const client = new ApolloClient({ cache, link });

  // Compute graphql documents statically for performance
  const query = gql`
    query {
      helloWorld {
        name
        greeting
      }
    }
  `;

  const childQuery = gql`
    query {
      child {
        foo
        bar
      }
    }
  `;

  class ConnectedElement extends ApolloQuery {
    render() {
      const { data, error, loading } = this;
      const { helloWorld = {} } = data || {}
      return (
          loading ? html`
            <what-spin></what-spin>`
        : error ? html`
            <h1>😢 Such sad, very error!</h1>
            <div>${error && error.message}</div>`
        : html`
            <div>${helloWorld.greeting}, ${helloWorld.name}</div>
            <connected-child id="child-component"
                .client="${this.client}"
                .query="${childQuery}"
            ></connected-child>`
      );
     }

     constructor() {
       super();
       this.client = client;
       this.query = query;
     }
  };

  customElements.define('connected-element', ConnectedElement)
</script>
```

*NOTE*: By default, components will only render while loading or after receiving data or an error. Override the `shouldUpdate` method to control when the component renders.

```js
shouldUpdate(changedProps) {
  return (
    changedProps.has('someProp') ||
    this.loading != null ||
    this.data ||
    this.error ||
  );
}
```

## 🍹 Using as a Mixin
You don't need to use `LitElement` base class for your components if you use the mixins. You just have to handle the rendering part on your own: e.g. for a query component, you'd implement yourself what happens after `data`, `error`, `loading`, or `networkStatus` change.

Here's an example that uses `GluonElement` instead of `LitElement`.

```js
import { ApolloQueryMixin } from 'lit-apollo/apollo-query-mixin.js';
import { GluonElement, html } from '@gluon/gluon';

class GluonQuery extends ApolloQueryMixin(GluonElement) {
  set data(data) {
    this.__data = data;
    this.render();
  }  

  get data() {
    return this.__data;
  }

  get template() {
    return html`
      <h1>${this.data.title}</h1>
    `;
  }
}
```

## 😎 Cool Tricks

### 📜 Inline Query Scripts
You can also provide a graphql query string in your markup by appending a
graphql script element to your connected element, like so:

```html
<connected-element>
  <script type="application/graphql">
    query {
      helloWorld {
        name
        greeting
      }
    }
  </script>
</connected-element>
```

## 🏦 Managing the Cache
When defining components that issue graphql mutations, you may want to take control over how and when Apollo updates it's local cache. You can do this with the `onUpdate` property on elements that extend from `ApolloMutation`
```js
import gql from 'graphql-tag';
import { render } from 'lit-html/lit-html';
import { client } from './client';
import { ApolloMutation, html } from 'lit-apollo/apollo-mutation';

class MutatingElement extends ApolloMutation {
  render() {
    return html`
      <loading-overlay ?active="${this.loading}"></loading-overlay>
      <button ?hidden="${this.data}" @click="${this.mutate}"></button>
      <div ?hidden="${!this.data}">${this.data.myResponse}</div>
      `;
  }
}

customElements.define('mutating-element', MutatingElement);

const mutation = gql`
  mutation($id: ID!) {
    MyMutation(id: $id) {
      mutationResult
    }
  }
`;

const updateFunc = (cache, response) => {
  // ostensibly looks up the cached object for mutationResult
  const query = MyMutationResultQuery;
  const variables = { id: 1 };

  const data = cache.readQuery({ query, variables });

  const changed = computeChanges(data);
  const mutationResult = mergeMutationResult(data, changed);

  return cache.writeData({ query, data: { mutationResult } });
};

const template = html`
  <mutating-element
    .client="${client}"
    .mutation="${mutation}"
    .variables="${{id: 1}}"
    .onUpdate="${updateFunc}"
  ></mutating-element>
`;

render(template, container);
```

## ⌚️ Asynchronous Client
In some cases, you may want to wait for your ApolloClient to do some initial asynchronous setup before rendering your components' DOM. In that case, you can import a promise of a client and wait for it in `connectedCallback`:

```html
<async-element></async-element>

<script type="module">
  import formatDistance from 'date-fns/esm/formatDistance';
  import { ApolloClient } from 'apollo-client';
  import { ApolloQuery, html } from 'lit-apollo/apollo-query';
  import { persistCache } from 'apollo-cache-persist'
  import { cache } from './cache';
  import { link } from './link';

  const clientPromise = new Promise(async function initApollo(resolve) {
    // Wait for the cache to be restored
    await persistCache({ cache, storage: localStorage });
    // Create the Apollo Client
    resolve(new ApolloClient({ cache, link }));
  });

  class AsyncElement extends ApolloQuery {
    render() {
      const { userSession: { name, lastActive } = {} } = this.data || {}
      const time = formatDistance(lastActive, Date.now(), { addSuffix: true });

      return html`
        <h1>👋 ${name}!</h1>
        <span>Your last activity was <time>${time}</time></span>`
     }

     async connectedCallback() {
       super.connectedCallback();
       // first instantiate the client locally
       this.client = await clientPromise;
       // afterwards, set the query to trigger fetch-then-render
       this.query = gql`query {
         userSession {
           name
           lastActive
         }
       }`;
     }

     shouldUpdate() {
       // only render when there is data.
       return !!this.data;
     }
  };

  customElements.define('async-element', AsyncElement)
</script>
```

## 🔥 Use lit-apollo in a Polymer Template
You can define an `<apollo-query>` element which will subscribe to a query and notify on change:

```js
customElements.define('apollo-query', class ApolloQueryEl extends ApolloQuery {
 fire(type, detail) {
   this.dispatchEvent(new CustomEvent(type, {
       bubbles: true,
       composed: true,
       detail,
     })
   );
 }

 update(changedProps) {
    super.update(changedProps);
    const {data, error, loading, networkStatus} = changedProps;
    (data) && this.fire("data-changed", { value: data });
    (error) && this.fire("error-changed", { value: error });
    (loading) && this.fire("loading-changed", { value: loading });
    (networkStatus) && this.fire("network-status-changed", { value: networkStatus });
 }
});
```

You could then use your new `<apollo-query>` element inside a polymer template:
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

<paper-icon-item>
  <iron-image slot="item-icon">[[data.user.picture]]</iron-image>
  [[data.user.name]]
</paper-icon-item>
```

In such a case, make sure that any required variables (e.g. `id` here) are defined in `variables` before adding your query element, or else an error will be thrown.
