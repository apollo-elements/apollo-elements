# lit-apollo
[![Published on npm](https://img.shields.io/npm/v/lit-apollo.svg)](https://www.npmjs.com/package/lit-apollo)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/lit-apollo)

🚀 A set of custom element base classes that connect to your Apollo cache 🌜

## 📓 Contents
- [Installation](#-installation)
- [Usage](#-usage)
- [Cool Tricks](#-cool-tricks)
  - [Asynchronous Client](#-asynchronous-client)
  - [Inline Query Scripts](#-inline-query-scripts)
  - [Use lit-apollo in a Polymer Template](#-use-lit-apollo-in-a-polymer-template)

## 🔧 Installation
`lit-apollo` is distributed through `npm`. To install a copy of the latest version of `lit-apollo` in your project's `node_modules` directory, first [Install npm on your system](https://www.npmjs.com/get-npm), then run the following command in your project's root directory
```bash
npm install --save lit-apollo
```

## 👩‍🚀 Usage

```html
<script type="module">
  import { cache } from './cache';
  import { link } from './link';
  import { ApolloClient } from 'apollo-client';
  import { ApolloQuery, html } from 'lit-apollo/apollo-query';

  // Create the Apollo Client
  const client = new ApolloClient({ cache, link });

  class ConnectedElement extends ApolloQuery {
    render({ data, loading, error, networkStatus }) {
      return (
          loading ? html`
            <what-spin></what-spin>`
        : error ? html`
            <h1>😢 Such sad, very error!</h1>
            <div>${error.message}</div>`
        : html`
            <div>${data.helloWorld.greeting}, ${data.helloWorld.name}</div>`
      );
     }

     constructor() {
       super();
       this.client = client;
       this.query = gql`query {
         helloWorld {
           name
           greeting
         }
       }`;
     }
  };

  customElements.define('connected-element', ConnectedElement)
</script>
```

# 😎 Cool Tricks

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
    render({ data: { userSession: { name, lastActive }} }) {
      return html`
        <h1>👋 ${name}!</h1>
        <span>Your last activity was </span>
        <time>${formatDistance(lastActive, Date.now(), { addSuffix: true })}</time>`
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

     shouldUpdate({ data }) {
       // only render when there is data.
       return !!data;
     }
  };

  customElements.define('async-element', AsyncElement)
</script>
```

## 📜 Inline Query Scripts
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
