# @apollo-elements/hybrids

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/hybrids.svg)](https://www.npmjs.com/package/@apollo-elements/hybrids)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/hybrids)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/hybrids)](https://github.com/apollo-elements/apollo-elements/blob/master/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>👾 hybrids element descriptors that shoot for the moon 🚀</strong>

`hybrids` is a modern, functional, and opinionated UI library based on the web component standards. It sports a refreshing take on ui-as-value. Take a look at the [repository](https://github.com/hybridsjs/hybrids) and [documentation](https://hybrids.js.org), and this [blog post introduction to hybrids](https://dev.to/bennypowers/lets-build-web-components-part-7-hybrids-187l)

Apollo Elements hybrids make it easy to take existing hybrids component descriptors and connect them to your Apollo cache.

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

> See our [docs on setting up Apollo client](https://apolloelements.dev/pages/guides/getting-started/apollo-client.html) so your components can fetch their data.

This package provides `client`, `mutation`, `query`, and `subscription` [factories](https://hybrids.js.org/#/getting-started/concepts?id=factories) that you can apply to your hybrids definitions; as well as `ApolloQuery`, `ApolloMutation`, and `ApolloSubscription` objects which you can spread in to your hybrid property descriptors.

### ❓ Queries
Use the `client` and `query` factories to connect your element to the apollo cache:

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
import { client, query, define, html } from '@apollo-elements/hybrids';
import HelloQuery from './Hello.query.graphql';
```

</code-copy>

</details>

<code-copy>

```ts
const render = ({ data }) => html`
  <p>${data?.hello ?? 'Hello'}</p>
`;

define('hello-element', {
  client: client(),
  query: query(HelloQuery),
  render
});
```

</code-copy>

Alternatively, you can spread in the ApolloQuery hybrid property descriptors to define a generic querying element.

<code-copy>

```js
import { ApolloQuery, define, html } from '@apollo-elements/hybrids';

const render = ({ data }) => html`
  <p>${data?.hello ?? 'Hello'}</p>
`

define('any-hello-element', { ...ApolloQuery, render });
```

</code-copy>

Use them by assigning your graphql nodes to the `query` property.

<code-copy>

```js
import HelloQuery from './Hello.query.graphql';
const render = ({ data }) => html`
  <any-hello-element
      query="${HelloQuery}"
      variables="${{ name: 'Mr. Magoo' }}"
  ></any-hello-element>
`;
```

</code-copy>

### 👾 Mutations
Like queries, you can use the `client` and `mutation` factories, or you can spread the generalized Hybrid.

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
import NameMutation from './Name.mutation.graphql';
```

</code-copy>

</details>

<code-copy>

```ts
const onKeyup = ({ mutate }, { key, target: { value: name } }) => {
  if (key === 'Enter')
    mutate({ variables: { name } });
}

const render = ({ data }) =>
  html`<input aria-label="Name" placeholder="Name" onkeyup="${onKeyup}"/>`;

define('name-input', {
  client: client(),
  mutation: mutation(NameMutation),
  render,
});
```

</code-copy>

### 🗞 Subscriptions
Just like `query` and `mutation`, use the `client` and `subscription` factories, or spread in the `ApolloSubscription` Hybrid prototype to define your subscription element.

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
import { mutation, define, html } from '@apollo-elements/hybrids';
import NameMutation from './Name.mutation.graphql';
```

</code-copy>

</details>

<code-copy>

```ts
const render = ({ data, error }) => error ? html`Error! ${error}` : html`
  Latest News: ${data.news}
`;

define('subscribing-element', {
  client: client(),
  subscription: subscription(NewsSubscription),
  render
});
```

</code-copy>

If you'd like to set up a subscription with an initial value from a query, then update that query's cached value each time the subscription reports new data, pass a subscription `document` and an `updateQuery` function with signature `(prev: CachedValue, { subscriptionData }): next: CachedValue` to the `subscribeToMore` method on a query element:

```js
import { subscription, define, html } from '@apollo-elements/hybrids';
import { gql } from '@apollo/client/core';

import { apolloClient } from '../client'

const MessagesQuery = gql`
  query {
    messages
  }
`;

const subscription = gql`
  subscription {
    messagePosted
  }
`;

const updateQuery = (previous = [], { subscriptionData }) =>
    !subscriptionData.data ? previous
  : [subscriptionData.data.messagePosted, ...previous];

const message = message => html`<li>${message}</li>`;
const render = ({messages}) =>
  html`<ul>${messages.map(message)}</ul>`;


define('messages-list', {
  client: client(apolloClient),
  query: query(MessagesQuery),
  render,

  // add a 'private' property that calls `subscribeToMore` on connect
  __messagePosted_subscription: property(null, function connect(host) {
    host.subscribeToMore({ document: subscription, updateQuery });
  }),
});
```

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
