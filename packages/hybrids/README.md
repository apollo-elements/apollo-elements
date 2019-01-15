# @apollo-elements/hybrids

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
  - [❓ Queries](#-queries)
  - [👾 Mutations](#-mutations)
  - [🗞 Subscriptions](#-subscriptions)
  - [🏭 Factories](#-factories)
- [😎 Cool Tricks](#-cool-tricks)
  - [📜 Inline Query Scripts](#-inline-query-scripts)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation

Apollo element mixins are distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

```bash
npm install --save @apollo-elements/hybrids
```

## 👩‍🚀 Usage

This package provides `ApolloQuery`, `ApolloMutation`, and `ApolloSubscription` objects which you can spread in to your hybrid prototypes.

### ❓ Queries
Spread in the ApolloQuery hybrid prototype to define a querying element.

```js
import { ApolloQuery, define, html } from '@apollo-elements/hybrids';

const render = ({data}) =>
  html`<div>${data.hello}</div>`;

define('connected-element', { ...ApolloQuery, render });
```

Which you can consume elsewhere like so:
```js
import gql from 'graphql-tag';
const query = gql`query { hello }`;
const template = html`
  <connected-element
      client="${client}"
      query="${query}"
  ></connected-element>
`;
```

*NOTE*: If you set `window.__APOLLO_CLIENT__`, you don't need to specify the `client` property when instantiating your elements, the way we do above.

### 👾 Mutations
Spread in the ApolloMutation hybrid prototype to define a mutating element.

```js
import { ApolloMutation, define, html } from '@apollo-elements/hybrids';

const onKeyup = (host, ({ key, target: { value: name } })) => {
  if (key === 'Enter') host.mutate({ variables: { name } });
}

const render = ({data}) =>
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

*NOTE*: If you set `window.__APOLLO_CLIENT__`, you don't need to specify the `client` property when instantiating your elements, the way we do above.

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

If you'd like to set up a subscription with an initial value from a query, then update that query's cached value each time the subscription reports new data, pass a subscription document and an `updateQuery` function with signature `(prev: CachedValue, { subscriptionData }): next: CachedValue` to the `subscribeToMore` property on a query element:

```js
import gql from 'graphql-tag';

const query = gql`query { messages }`;

const updateQuery = (prev, { subscriptionData }) =>
  !subscriptionData.data ? prev : [subscriptionData.data.messagePosted, ...prev];

const template = html`
  <messages-list
      query="${query}"
      subscribeToMore="${{ document: subscription, updateQuery }}
  "></messages-list>
`;
```

*NOTE*: If you set `window.__APOLLO_CLIENT__`, you don't need to specify the `client` property when instantiating your elements, the way we do above.

### 🏭 Factories
Use the provided `clientFactory`, `queryFactory`, `mutationFactory` or `subscriptionFactory` to set your element's graphql document at definition time:

```js
import { ApolloQuery, clientFactory, queryFactory, define, html } from '@apollo-elements/hybrids';
import gql from 'graphql-tag';
import client from './apollo-client';

const render = ({data}) =>
  html`<div>${data.hello}</div>`;

define('connected-element', {
  ...ApolloQuery,
  client: clientFactory(client),
  query: queryFactory(gql`query { hello }`),
  render,
});
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

## 👷‍♂️ Maintainers
`apollo-elements` is maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
