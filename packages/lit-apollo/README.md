# @apollo-elements/lit-apollo
[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/lit-apollo.svg)](https://www.npmjs.com/package/@apollo-elements/lit-apollo)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/lit-apollo)
[![Actions Status](https://github.com/apollo-elements/apollo-elements/workflows/CD/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>🚀 LitElement base classes that connect to your Apollo cache 🌜</strong>

<strong>👩‍🚀 It's one small step for a dev, one giant leap for the web platform! 👨‍🚀</strong>

## 📓 Contents
- [📑 API Docs](#-api-docs)
- [🤖 Demo](#-demo)
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
- [🍹 Mixins](#-mixins)
- [📖 Subscriptions](#-subscriptions)
- [😎 Cool Tricks](#-cool-tricks)
  - [🏦 Managing the Cache](#-managing-the-cache)
  - [⌚️ Asynchronous Client](#-asynchronous-client)
- [👷‍♂️ Maintainers](#-maintainers)

## 📑 API Docs
If you just want to see the API Docs, check them out at [apolloelements.dev/lit-apollo/](https://apolloelements.dev/lit-apollo/)

## 🤖 Demo
[`#leeway`](https://lit-apollo-subscriptions.herokuapp.com) is a progressive web app that uses `lit-apollo` to make it easier for you to avoid doing actual work. Check out the [source repo](https://gitlab.com/bennyp/demo-lit-apollo-subscriptions) for an example of how to build apps with Apollo Elements. The demo includes:

- <abbr title="server side rendering">SSR</abbr>
- Code Splitting
- Aggressive minification, including `lit-html` template literals
- CSS-in-CSS ( e.g. `import shared from '../shared-styles.css';`)
- GQL-in-GQL ( e.g. `import query from './my-component-query.graphql';`)
- GraphQL Subscriptions over websocket

[![Lighthouse Scores: 98 (performance), 100 (accessibility), 93 (best practises), 100 (SEO), 12/12 (PWA)](https://user-images.githubusercontent.com/1466420/52176144-5c25f280-27b7-11e9-8e14-290651f98e36.png)](https://github.com/apollo-elements/apollo-elements/files/2825459/lit-apollo-subscriptions.herokuapp.com-20190203T132249.zip)

## 🔧 Installation
Apollo elements' `lit-apollo` is distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

```bash
npm install --save @apollo-elements/lit-apollo
```

## 👩‍🚀 Usage
You'll need to bundle the Apollo library with a tool like Rollup. See [instructions for bundling Apollo](https://github.com/apollo-elements/apollo-elements#-bundling) for advice on how to build a working Apollo client.

We recommend assigning your `ApolloClient` instance to the `__APOLLO_CLIENT__` global variables. This not only automatically gives you [dev tools support](https://github.com/apollographql/apollo-client-devtools), but also lets all of your apollo elements connect to the client without needing to configure them.

```js
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache =
  new InMemoryCache();

const link =
  new HttpLink({ uri: '/graphql' });

export const client =
  new ApolloClient({ cache, link });

window.__APOLLO_CLIENT__ = client;
```

Once that's been accomplished, import the base class and extend from it to define your component.

We recommend using [rollup-plugin-graphql](https://npm.im/@kocal/rollup-plugin-graphql) during bundling, and [es-dev-server-import-graphql](https://npm.im/es-dev-server-import-graphql) during development to allow importing graphql documents.

```js
import { ApolloQuery, html } from '@apollo-elements/lit-apollo';
import ParentQuery from './Parent.query.graphql';
import ChildQuery from './Child.query.graphql';

class ConnectedElement extends ApolloQuery {
  query = ParentQuery;

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
          <connected-child id="child-component"></connected-child>
        `
    );
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

```graphql
query ChildQuery {
  child {
    foo
    bar
  }
}
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
You don't need to use `LitElement` base class for your components if you use the [mixins](https://github.com/apollo-elements/apollo-elements/packages/mixins). You just have to handle the rendering part on your own: e.g. for a query component, you'd implement yourself what happens after `data`, `error`, `loading`, or `networkStatus` change.

## 📖 Subscriptions
You can create components which use GraphQL subscriptions to update over websockets.

In this example, `<chat-subscription>` has its `subscription` property passed in from the parent, rather than defined statically, as one normally would.
This could be useful in cases where `<chat-subscription>` can render a variety of different queries.

```js
import { ApolloQuery, html } from '@apollo-elements/lit-apollo';
import { format } from 'date-fns/fp';
import { errorTemplate } from './error-template.js';
import './chat-subscription.js';
import MessageSentSubscription from './MessageSent.subscription.graphql';

const messageTemplate = ({ message, user, date }) => html`
  <div>
    <dt><time>${format('HH:mm', date)}</time> ${user}:</dt>
    <dd>${message}</dd>
  </div>
`;

/**
 * <chat-query>
 * @customElement
 * @extends LitElement
 */
class ChatQuery extends ApolloQuery {
  query = MessagesQuery;

  render() {
    return html`
    <chat-subscription
        .subscription="${MessageSentSubscription}"
        .onSubscriptionData=${this.onSubscriptionData}>
    </chat-subscription>
    ${( this.loading ? html`Loading...`
      : this.error ? errorTemplate(this.error)
      : html`<dl>${this.data.messages.map(messageTemplate)}</dl>`
      )}`;
  }

  constructor() {
    super();
    this.onSubscriptionData = this.onSubscriptionData.bind(this);
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

```graphql
query MessagesQuery {
  messages {
    date
    message
    user
  }
}
```

```graphql
subscription MessageSentSubscription {
  messageSent {
    date
    message
    user
  }
}
```

Alternatively, you can call `subscribeToMore` on a query component with a subscription `document` and an `updateQuery` function to have your component update it's data based on subscription results:

```js
updateQuery(prev, { subscriptionData }) {
  if (!subscriptionData.data) return prev;
  return {
    ...prev,
    messages: [...prev.messages, subscriptionData.data.messageSent]
  };
}

firstUpdated() {
  const { updateQuery } = this;
  this.subscribeToMore({
    updateQuery,
    document: gql`
      subscription {
        messageSent {
          date
          message
          user
        }
      }`
  });
}

```

See this simple chat-app demo which demonstrates building custom elements which subscribe to a GraphQL server over websockets: [Chat App Demo](https://lit-apollo-subscriptions.herokuapp.com/)

## 😎 Cool Tricks

### 🏦 Managing the Cache
When defining components that issue graphql mutations, you may want to take control over how and when Apollo updates it's local cache. You can do this with the `updater` property on elements that extend from `ApolloMutation`

```js
import gql from 'graphql-tag';
import { render, html } from 'lit-html/lit-html';
import { client } from './client';
import { ApolloMutation } from '@apollo-elements/lit-apollo';

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
    .mutation="${mutation}"
    .variables="${{id: 1}}"
    .updater="${updateFunc}"
  ></mutating-element>
`;

render(template, container);
```

### ⌚️ Asynchronous Client
In some cases, you may want to wait for your Apollo client to do some initial asynchronous setup (for example reloading a persistent cache or getting a user token) before you can make your client available to your app.

```js
// client.js
import { ApolloClient } from 'apollo-client';
import { persistCache } from 'apollo-cache-persist'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { link } from './link';

const cache = new InMemoryCache();

export async function getClient() {
  // Wait for the cache to be restored
  await persistCache({ cache, storage: localStorage });
  // Create the Apollo Client
  return new ApolloClient({ cache, link });
};
```

In that case, you can import a promise of a client and wait for it in `connectedCallback`:

```js
// async-element.js
import formatDistance from 'date-fns/esm/formatDistance';
import { ApolloQuery, html } from '@apollo-elements/lit-apollo';
import { getClient } from './client';

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
```

Alternatively, you can use the dynamic `import()` feature to wait on your client before loading element modules:

```js
// app.js
import { getClient } from './client.js';
(async function init() {
  window.__APOLLO_CLIENT__ = await getClient();
  await Promise.all([
    import('./components/connected-element.js'),
    import('./components/connected-input.js'),
  ]);
})();
```

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
