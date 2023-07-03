# @apollo-elements/haunted

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/haunted.svg)](https://www.npmjs.com/package/@apollo-elements/haunted)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/haunted)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/haunted)](https://github.com/apollo-elements/apollo-elements/blob/main/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>👾 Haunted Hooks for Apollo GraphQL 🚀</strong>

<wcd-live data-title="Live Demo">

[![View Live Demo][1]][2]

[1]: https://img.shields.io/badge/Live%20Demo-WebComponents.dev-informational?style=for-the-badge
[2]: https://webcomponents.dev/edit/UJQKqT0Mb6s5qvEVsnjWsrc/index.js

</wcd-live>

> 🔎 Read the [Full API Docs](https://apolloelements.dev/api/libraries/haunted/) 🔎

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
  - [❓ Queries](#-queries)
  - [👾 Mutations](#-mutations)
  - [🗞 Subscriptions](#-subscriptions)
  - [📲 With `<apollo-client>`](#-with-apollo-client)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation

Apollo Elements haunted hooks are distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

```sh
npm install --save @apollo-elements/haunted
```

## 👩‍🚀 Usage

> See our [docs on setting up Apollo client](https://apolloelements.dev/guides/getting-started/apollo-client/) so your components can fetch their data.

This package provides `useMutation`, `useQuery`, and `useSubscription` [hooks](https://github.com/matthewp/haunted).

### ❓ Queries
Query data with the `useQuery` hook.

First, let's define our component's [GraphQL query](https://graphql.org/learn/queries/).

<code-copy>

```graphql
query HelloQuery {
  helloWorld {
    name
    greeting
  }
}
```

</code-copy>

> Read our [docs on working with GraphQL files during development](https://apolloelements.dev/guides/getting-started/buildless-development/) and [in production](https://apolloelements.dev/guides/getting-started/building-for-production/) for more info, and be sure to read about [generating TypeScript types from GraphQL](https://apolloelements.dev/guides/getting-started/codegen/) to enhance your developer experience and reduce bugs.

Next, we'll define our UI component with the `useQuery` hook. Import the hook and helpers, your query, and the types:

<details>

<summary>Imports</summary>

<code-copy>

```ts
import { useQuery, component, html } from '@apollo-elements/haunted';

import { HelloQuery } from './Hello.query.graphql';

declare global {
  interface HTMLElementTagNameMap {
    'hello-query': HTMLElement
  }
}
```

</code-copy>

</details>

Then define your component's template function.

<code-copy>

```ts
function Hello() {
  const { data, error, loading } = useQuery(HelloQuery);

  const greeting = data?.helloWorld.greeting ?? 'Hello';
  const name = data?.helloWorld.name ?? 'Friend';

  return html`
    <what-spin-such-loader ?active="${loading}"></what-spin-such-loader>
    <article id="error" ?hidden="${!error}">
      <h2>😢 Such Sad, Very Error! 😰</h2>
      <pre><code>${error?.message}</code></pre>
    </article>
    <p>${greeting}, ${name}!</p>
  `;
}

customElements.define('hello-query', component(Hello));
```

</code-copy>

### 👾 Mutations

Mutations are how you affect change on your graph. Define a mutation in graphql.

<code-copy>

```graphql
mutation UpdateUser($username: String, $haircolor: String) {
  updateUser(username: $username, haircolor: $haircolor) {
    nickname
  }
}
```

</code-copy>

Then import `useMutation` and the `haunted` API along with your data types.

<details>

<summary>Imports</summary>

<code-copy>

```ts
import { useMutation, useState, component, html } from '@apollo-elements/haunted';

import { UpdateUserMutation } from './UpdateUser.mutation.graphql';

declare global {
  interface HTMLElementTagNameMap {
    'update-user': HTMLElement;
  }
}
```

</code-copy>

</details>

Then to define your component's template function.

<code-copy>

```ts
function UpdateUser() {
  const [username, setUsername] = useState('');
  const [haircolor, setHaircolor] = useState('Black');
  const [updateUser, { data }] = useMutation(UpdateUserMutation);

  const variables = { username, haircolor };

  const nickname = data?.updateUser?.nickname ?? 'nothing';

  return html`
    <label> Name
      <input type="text" @input="${e => setUsername(e.target.value)}"/>
    </label>

    <label> Hair Colour
      <select @input="${e => setHaircolor(e.target.value)}">
        <option>Black</option>
        <option>Brown</option>
        <option>Auburn</option>
        <option>Red</option>
        <option>Blond</option>
        <option>Tutti Fruiti</option>
      </select>
    </label>

    <button @click="${() => updateUser({ variables })}">Save</button>

    <output ?hidden="${!data}">We'll call you ${nickname}</output>
  `;
}

customElements.define('update-user', component(UpdateUser));
```

</code-copy>

### 🗞 Subscriptions

Subscriptions let you update your front end with real-time changes to the data graph.

<code-copy>

```graphql
subscription NewsFlash {
  news
}
```

</code-copy>

<details>

<summary>Imports</summary>

<code-copy>

```ts
import { useSubscription, component, html } from '@apollo-elements/haunted';

import { NewsFlashSubscription } from './NewsFlash.subscription.graphql';

declare global {
  interface HTMLElementTagNameMap {
    'news-flash': HTMLElement;
  }
}
```

</code-copy>

</details>

```ts
function NewsFlash() {
  const { data } = useSubscription(NewsFlashSubscription);

  return html`
    Latest News: ${data.news}
  `;
}

customElements.define('news-flash', component(NewsFlashSubscription));
```

</code-copy>

### 📲 With Apollo Client

If you want your haunted components to register with the closest `<apollo-client>` element, you have to write them using the `function` keyword and pass `this` as the `hostElement` option.

```js
function Connected() {
  const { data } = useQuery(ConnectedQuery, {
    hostElement: this,
  });
}
```

That way, `<apollo-client>` will be able to find your element in the DOM tree and connect to the controller which powers the hook.

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
