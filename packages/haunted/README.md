# @apollo-elements/haunted

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/haunted.svg)](https://www.npmjs.com/package/@apollo-elements/haunted)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/haunted)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/haunted)](https://github.com/apollo-elements/apollo-elements/blob/master/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>👾 Haunted Hooks for Apollo GraphQL 🚀</strong>

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
  - [❓ Queries](#-queries)
  - [👾 Mutations](#-mutations)
  - [🗞 Subscriptions](#-subscriptions)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation

Apollo Elements haunted hooks are distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

```bash
npm install --save @apollo-elements/haunted
```

## 👩‍🚀 Usage

> See our [docs on setting up Apollo client](https://apolloelements.dev/pages/guides/getting-started/apollo-client.html) so your components can fetch their data.

This package provides `useApolloClient`, `useMutation`, `useQuery`, and `useSubscription` [hooks](https://github.com/matthewp/haunted).

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

> Read our [docs on working with GraphQL files during development](https://apolloelements.dev/pages/guides/getting-started/buildless-development.html) and [in production](https://apolloelements.dev/pages/guides/getting-started/building-for-production.html) for more info, and be sure to read about [generating TypeScript types from GraphQL](https://apolloelements.dev/pages/guides/getting-started/codegen.html) to enhance your developer experience and reduce bugs.

Next, we'll define our UI component with the `useQuery` hook. Import the hook and helpers, your query, and the types:

<details>

<summary>Imports</summary>

<code-copy>

```ts
import { useQuery, component, html } from '@apollo-elements/haunted';

import HelloQuery from './Hello.query.graphql';

import type { ApolloQueryElement } from '@apollo-elements/haunted';

import type {
  HelloQueryData as Data,
  HelloQueryVariables as Variables
} from '../codegen/schema';

declare global {
  interface HTMLElementTagNameMap {
    'hello-query': ApolloQueryElement<Data, Variables>;
  }
}
```

</code-copy>

</details>

Then define your component's template function.

<code-copy>

```ts
function Hello() {
  const { data, error, loading } = useQuery<Data, Variables>(HelloQuery);

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

import type { ApolloMutationElement } from '@apollo-elements/haunted';

import type {
  UpdateUserMutationData as Data,
  UpdateUserMutationVariables as Variables,
} from '../codegen/schema';

declare global {
  interface HTMLElementTagNameMap {
    'update-user': ApolloMutationElement<Data, Variables>;
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
  const [updateUser, { data }] = useMutation<Data, Variables>(UpdateUserMutation);

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

import type { ApolloSubscriptionElement } from '@apollo-elements/haunted';

import type {
  NewsFlashData as Data,
  NewsFlashVariables as Variables,
} from '../codegen/schema';

declare global {
  interface HTMLElementTagNameMap {
    'news-flash': ApolloSubscriptionElement<Data, Variables>
  }
}
```

</code-copy>

</details>

```ts
function NewsFlash() {
  const { data } = useSubscription<Data, Variables>(NewsFlashSubscription);

  return html`
    Latest News: ${data.news}
  `;
}

customElements.define('news-flash', component(NewsFlashSubscription));
```

</code-copy>

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
