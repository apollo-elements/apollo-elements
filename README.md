# lit-apollo
[![Published on npm](https://img.shields.io/npm/v/lit-apollo.svg)](https://www.npmjs.com/package/lit-apollo)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/lit-apollo)
[![Build Status](https://travis-ci.org/bennypowers/lit-apollo.svg?branch=master)](https://travis-ci.org/bennypowers/lit-apollo)
[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)

🚀 Custom element base classes & mixins that connect to your Apollo cache 🌜

👩‍🚀 It's one small step for a dev, one giant leap for the web platform! 👨‍🚀

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
- [🍹 Mixins](#-mixins)
- [📖 Subscriptions](#-subscriptions)
- [☝️ Notifying Elements for Polymer Templates](#-notifying-elements-for-polymer-templates)
- [📦 Bundling](#-bundling)
- [😎 Cool Tricks](#-cool-tricks)
  - [📜 Inline Query Scripts](#-inline-query-scripts)
  - [🏦 Managing the Cache](#-managing-the-cache)
  - [⌚️ Asynchronous Client](#-asynchronous-client)

## 🔧 Installation
`lit-apollo` is distributed through `npm` the node package manager. To install a copy of the latest version of `lit-apollo` in your project's `node_modules` directory, first [Install npm on your system](https://www.npmjs.com/get-npm), then run the following command in your project's root directory:

```bash
npm install --save lit-apollo
```

## 👩‍🚀 Usage
You'll need to bundle the Apollo library with a tool like Rollup. See [instructions for bundling Apollo](#-bundling) for advice on how to build a working Apollo client.
After that, typical usage involves importing the base class and extending from it to define your component:

```js
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client';
import { ApolloQuery, html } from 'lit-apollo';
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
          <h1>😢 Such Sad, Very Error! 😰</h1>
          <div>${error ? error.message : 'Unknown Error'}</div>`
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
```

*NOTE*: By default, components will only render while loading or after receiving data or an error. Override the `shouldUpdate` method to control when the component renders.

```js
shouldUpdate(changedProps) {
  return (
    changedProps.has('someProp') ||
    this.loading != null ||
    this.data ||
    this.error
  );
}
```

## 🍹 Mixins
You don't need to use `LitElement` base class for your components if you use the mixins. You just have to handle the rendering part on your own: e.g. for a query component, you'd implement yourself what happens after `data`, `error`, `loading`, or `networkStatus` change.

Here's an example that uses `GluonElement` instead of `LitElement`.

```js
import { ApolloQueryMixin } from 'lit-apollo/mixins/apollo-query-mixin.js';
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

## 📖 Subscriptions
You can create components which use GraphQL subscriptions to update over websockets.

```js
import { ApolloQuery, html } from 'lit-apollo';
import { client } from '../client';
import { format } from 'date-fns/fp';
import { errorTemplate } from './error-template.js';
import gql from 'graphql-tag';
import './chat-subscription.js';

const messageTemplate = ({ message, user, date }) => html`
  <div>
    <dt><time>${format('HH:mm', date)}</time> ${user}:</dt>
    <dd>${message}</dd>
  </div>
`;

const subscription = gql`
  subscription {
    messageSent {
      date
      message
      user
    }
  }`

/**
 * <chat-query>
 * @customElement
 * @extends LitElement
 */
class ChatQuery extends ApolloQuery {
  render() {
    return html`
    <chat-subscription
        .client="${this.client}"
        .subscription="${subscription}"
        .onSubscriptionData=${this.onSubscriptionData}>
    </chat-subscription>
    ${( this.loading ? html`Loading...`
      : this.error ? errorTemplate(this.error)
      : html`<dl>${this.data.messages.map(messageTemplate)}</dl>`
      )}`;
  }

  constructor() {
    super();
    this.client = client;
    this.onSubscriptionData = this.onSubscriptionData.bind(this);
    this.query = gql`
    query {
      messages {
        date
        message
        user
      }
    }`;
  }

  onSubscriptionData({ client, subscriptionData: { data: { messageSent } } }) {
    const { query } = this;
    const { messages } = client.readQuery({ query });
    const data = { messages: [...messages, messageSent] };
    client.writeQuery({ query, data });
  }
}

customElements.define('chat-query', ChatQuery);
```

See this simple chat-app demo which demonstrates building custom elements which subscribe to a GraphQL server over websockets: [Chat App Demo](https://lit-apollo-subscriptions.herokuapp.com/)

## ☝️ Notifying Elements for Polymer Templates
If you want data elements which notify about changes to their properties,
import them from `lit-apollo/elements`:

```js
import 'lit-apollo/elements/apollo-query-element.js';
import 'lit-apollo/elements/apollo-mutation-element.js';
```

You could then use the `<apollo-query>` element inside a polymer template:
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

Always make sure that any required variables (e.g. `id` here) are defined in `variables` before adding your query element, or else an error will be thrown.

If you would like to control which properties notify, set `notifyingProps` to an array of property names:

```js
console.log(queryElement.notifyingProps) // ["data", "error", "loading", "networkStatus"]

// excludes `loading` and `networkStatus`
queryElement.notifyingProps = ['data', 'error'];
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

    commonjs()

  ]
}
```

You may also need to patch certain versions of some apollo packages in order for them to play nicely with standard tools. [See the chat app demo for examples of how to patch packages](https://gitlab.com/bennyp/demo-lit-apollo-subscriptions/tree/master/patches).

An alternative to bundling your whole app is to bundle and export your apollo-client separately, then import it into your browser-friendly component modules.
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

### 🏦 Managing the Cache
When defining components that issue graphql mutations, you may want to take control over how and when Apollo updates it's local cache. You can do this with the `onUpdate` property on elements that extend from `ApolloMutation`

```js
import gql from 'graphql-tag';
import { render, html } from 'lit-html/lit-html';
import { client } from './client';
import { ApolloMutation } from 'lit-apollo';

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

/**
 * Example update function which reads a cached query result, merges
 * it with the mutation result, and then writes it back to the cache.
 */
const updateFunc = (cache, response) => {
  // ostensibly looks up the cached object for mutationResult
  const query = MyQuery;
  const variables = { id: 1 };
  const cached = cache.readQuery({ query, variables });
  const changed = computeChanges(cached);
  // mergeMutationResult is a made-up function.
  const mutationResult = mergeMutationResult(cached, changed);
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

### ⌚️ Asynchronous Client
In some cases, you may want to wait for your ApolloClient to do some initial asynchronous setup before rendering your components' DOM. In that case, you can import a promise of a client and wait for it in `connectedCallback`:

```html
<async-element></async-element>

<script type="module">
  import formatDistance from 'date-fns/esm/formatDistance';
  import { ApolloClient } from 'apollo-client';
  import { ApolloQuery, html } from 'lit-apollo';
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
