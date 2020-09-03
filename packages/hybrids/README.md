# @apollo-elements/hybrids
[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/hybrids.svg)](https://www.npmjs.com/package/@apollo-elements/hybrids)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/hybrids)
[![Actions Status](https://github.com/apollo-elements/apollo-elements/workflows/CD/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

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

This package provides `ApolloQuery`, `ApolloMutation`, and `ApolloSubscription` objects which you can spread in to your hybrid property descriptors.

### ❓ Queries
Spread in the ApolloQuery hybrid property descriptors to define a querying element.

```js
import { ApolloQuery, queryFactory, define, html } from '@apollo-elements/hybrids';
import gql from 'graphql-tag';

const render = ({ data }) => html`
  <p>${data?.hello ?? 'Hello'}</p>
`

define('hello-element', { ...ApolloQuery, render });
```

Use them by assigning your graphql nodes to the `query` property.

```js
import HelloQuery from './Hello.query.graphql';
const render = ({ data }) => html`
  <hello-element query="${HelloQuery}" variables="${{ name: 'Mr. Magoo' }}></hello-element>
`;
```

*NOTE*: If you set `window.__APOLLO_CLIENT__`, you don't need to specify the `client` property when instantiating your elements, the way we do above.

### 👾 Mutations
Spread in the ApolloMutation hybrid property descriptors to define a mutating element.

```js
import { ApolloMutation, define, html } from '@apollo-elements/hybrids';

const onKeyup = ({ mutate }, ({ key, target: { value: name } })) => {
  if (key === 'Enter') mutate({ variables: { name } });
}

const render = ({ data }) =>
  html`<input aria-label="Name" placeholder="Name" onkeyup="${onKeyup}"/>`;

define('name-input', { ...ApolloMutation, render });
```

Which you add to your templates thus:
```js
import gql from 'graphql-tag';

const mutation = gql`
  mutation Name($name: String!) {
    name(name: $name) {
      name
    }
  }
`;

const template = html`
  <name-input
      client="${client}"
      mutation="${mutation}"
  ></name-input>
`;
```

### 🗞 Subscriptions
Spread in the `ApolloSubscription` Hybrid prototype to define your subscription element.

```js
import { ApolloSubscription, define, html } from '@apollo-elements/hybrids';

const render = ({ data, error }) => error ? html`Error! ${error}` : html`
  Latest News: ${data.news}
`;

define('subscribing-element', { ...ApolloSubscription, render });
```

And instantiate it like so:

```js
import gql from 'graphql-tag';

const subscription = gql`subscription { news }`;

const template = html`
  <subscribing-element
      client="${client}"
      subscription="${subscription}"
  ></subscribing-element>
`;
```

If you'd like to set up a subscription with an initial value from a query, then update that query's cached value each time the subscription reports new data, pass a subscription `document` and an `updateQuery` function with signature `(prev: CachedValue, { subscriptionData }): next: CachedValue` to the `subscribeToMore` method on a query element:

```js
import gql from 'graphql-tag';

const query = gql`
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

const messageList = document.createElement('message-list');
messagesList.query = query;
messagesList.subscribeToMore({ document: subscription, updateQuery });
document.body.append(messageList);

define('messages-list', { ...ApolloQuery, render }
```

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
