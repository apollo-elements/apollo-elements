# @apollo-elements/hybrids

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/hybrids.svg)](https://www.npmjs.com/package/@apollo-elements/hybrids)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/hybrids)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/hybrids)](https://github.com/apollo-elements/apollo-elements/blob/master/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>👾 hybrids GraphQL factories that shoot for the moon 🚀</strong>

`hybrids` is a modern, functional, and opinionated UI library based on the web component standards. It sports a refreshing take on ui-as-value. Take a look at the [repository](https://github.com/hybridsjs/hybrids) and [documentation](https://hybrids.js.org), and this [blog post introduction to hybrids](https://dev.to/bennypowers/lets-build-web-components-part-7-hybrids-187l)

Apollo Elements hybrids make it easy to add GraphQL to your hybrids components.

> 🔎 Read the [Full API Docs](https://apolloelements.dev/api/libraries/hybrids/) 🔎

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
  - [❓ Queries](#-queries)
  - [👾 Mutations](#-mutations)
  - [🗞 Subscriptions](#-subscriptions)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation

Apollo Elements hybrids are distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

```bash
npm install --save @apollo-elements/hybrids
```

## 👩‍🚀 Usage

> See our [docs on setting up Apollo client](https://apolloelements.dev/guides/getting-started/apollo-client/) so your components can fetch their data.

This package provides `mutation`, `query`, and `subscription` [factories](https://hybrids.js.org/#/getting-started/concepts?id=factories) that you can apply to your hybrids definitions.

### ❓ Queries
Use the `query` factory to connect your element to the apollo cache:

<code-copy>

```graphql
query HelloQuery($name: String) {
  hello(name: $name)
}
```

</code-copy>

<details>

<summary>Imports</summary>

<code-copy>

```ts
import { query, define, html } from '@apollo-elements/hybrids';
import HelloQuery from './Hello.query.graphql';
```

</code-copy>

</details>

<code-copy>

```ts
const render = ({ hello }) => html`
  <p>${hello.data?.hello ?? 'Hello'}</p>
`;

define('hello-element', {
  hello: query(HelloQuery),
  render
});
```

</code-copy>

### 👾 Mutations
Like queries, you can use the `mutation` factory.

<code-copy>

```graphql
mutation Name($name: String!) {
  name(name: $name) {
    name
  }
}
```

</code-copy>

<details>

<summary>Imports</summary>

<code-copy>

```ts
import { mutation, define, html } from '@apollo-elements/hybrids';
import UpdateNameMutation from './UpdateName.mutation.graphql';
```

</code-copy>

</details>

<code-copy>

```ts
const onKeyup = (host, event) => {
  if (event.key === 'Enter')
    host.updateName.mutate({ variables: { name: event.target.value } });
}

const render = () =>
  html`<input aria-label="Name" placeholder="Name" onkeyup="${onKeyup}"/>`;

define('name-input', {
  updateName: mutation(UpdateNameMutation),
  render,
});
```

</code-copy>

### 🗞 Subscriptions
Just like `query` and `mutation`, use `subscription` factory.

<code-copy>

```graphql
subscription {
  news
}
```

</code-copy>

<details>

<summary>Imports</summary>

<code-copy>

```ts
import { subscription, define, html } from '@apollo-elements/hybrids';
import NewsSubscription from './News.subscription.graphql';
```

</code-copy>

</details>

<code-copy>

```ts
const render = ({ news }) => news.error ? html`
  Error! ${news.error.message}
` : html`
  Latest News: ${news.data?.news}
`;

define('subscribing-element', {
  news: subscription(NewsSubscription),
  render
});
```

</code-copy>

If you'd like to set up a subscription with an initial value from a query, then update that query's cached value each time the subscription reports new data, pass a subscription `document` and an `updateQuery` function with signature `(prev: CachedValue, { subscriptionData }): next: CachedValue` to the `subscribeToMore` method on a query element:

```js
import { subscription, define, html } from '@apollo-elements/hybrids';
import { gql } from '@apollo/client/core';

import { apolloClient } from '../client'

define('messages-list', {
  messages: query(gql`{ messages }`),
  render({ messages }) {
    const messages = messages.data?.messages ?? [];
    return html`<ul>${messages.map(message => html`<li>${message}</li>`)}</ul>`;
  },
  /** a 'private' property that calls `subscribeToMore` on connect */
  __messagePosted_subscription: {
    connect(host) {
      host.messages.subscribeToMore({
        document: gql`
          subscription {
            messagePosted
          }
        `,
        updateQuery(previous = [], { subscriptionData }) {
          return (
              !subscriptionData.data ? previous
            : [subscriptionData.data.messagePosted, ...previous]
          );
        }
      });
    }
  }
});
```

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
