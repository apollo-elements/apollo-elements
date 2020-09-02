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
- [📖 Subscriptions](#-subscriptions)
- [😎 Cool Tricks](#-cool-tricks)
  - [🏦 Managing the Cache](#-managing-the-cache)
  - [⌚️ Asynchronous Client](#-asynchronous-client)
- [👷‍♂️ Maintainers](#-maintainers)

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


## 🍹 Mixins
You don't need to use `GluonElement` base class for your components if you use the [mixins](https://github.com/apollo-elements/apollo-elements/packages/mixins). You just have to handle the rendering part on your own: e.g. for a query component, you'd implement yourself what happens after `data`, `error`, `loading`, or `networkStatus` change.

## 📖 Subscriptions
You can create components which use GraphQL subscriptions to update over websockets.

In this example, `<chat-subscription>` has its `subscription` property passed in from the parent, rather than defined statically, as one normally would.
This could be useful in cases where `<chat-subscription>` can render a variety of different queries.

```js
import { ApolloQuery, html } from '@apollo-elements/gluon';
import { format } from 'date-fns/fp';
import gql from 'graphql-tag';
import './chat-subscription.js';

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
 */
class ChatQuery extends ApolloQuery {
  render() {
    return html`
    <chat-subscription
        .subscription="${subscription}"
        .onSubscriptionData=${this.onSubscriptionData}>
    </chat-subscription>
    ${(
        this.loading ? html`
          Loading...`
      : this.error ? html`
          <h1>😢 Such Sad, Very Error! 😰</h1>
          <div>${this.error?.message ?? 'Unknown Error'}</div>`
      : html`
          <dl>
            ${this.data.messages.map(x => html`
            <div>
              <dt><time>${format('HH:mm', date)}</time> ${user}:</dt>
              <dd>${message}</dd>
            </div>`
            )}
          </dl>`
    )}`;
  }

  constructor() {
    super();
    this.onSubscriptionData = this.onSubscriptionData.bind(this);
    this.query = gql`
      query {
        messages {
          date
          message
          user
        }
      }
    `;
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

Alternatively, you can call `subscribeToMore` on a query component with a subscription `document` and an `updateQuery` function to have your component update it's data based on subscription results:

```js
updateQuery(prev, { subscriptionData }) {
  if (!subscriptionData.data) return prev;
  return {
    ...prev,
    messages: [...prev.messages, subscriptionData.data.messageSent]
  };
}

async connectedCallback() {
  await this.render();
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
import { client } from './client';
import { ApolloMutation, html } from '@apollo-elements/gluon';

class MutatingElement extends ApolloMutation {
  get template() {
    return html`
      <loading-overlay ?active="${this.loading}"></loading-overlay>
      <button ?hidden="${this.data}" @click="${this.mutate}"></button>
      <div ?hidden="${!this.data}">${this.data?.myResponse}</div>
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

import { render } from 'lit-html';
render(template, container);
```

### ⌚️ Asynchronous Client
In some cases, you may want to wait for your ApolloClient to do some initial asynchronous setup before rendering your components' DOM. In that case, you can import a promise of a client and wait for it in `connectedCallback`:

```js
import formatDistance from 'date-fns/esm/formatDistance';
import { ApolloClient } from '@apollo/client/core';
import { ApolloQuery, html } from '@apollo-elements/gluon';
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
  get template() {
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
};

customElements.define('async-element', AsyncElement)
```

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
