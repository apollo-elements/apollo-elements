# @apollo-elements/mixins

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/mixins.svg)](https://www.npmjs.com/package/@apollo-elements/mixins)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/mixins)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/mixins)](https://github.com/apollo-elements/apollo-elements/blob/master/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>🍹 Moon mixins for cosmic components 👩‍🚀</strong>

A set of [class mixin functions](https://alligator.io/js/class-composition/#composition-with-javascript-classes) that add Apollo GraphQL goodness to your web component classes.

## 📓 Contents
- [🔧 Installation](#-installation)
- [🍸 Mixins](#-mixins)
- [👩‍🚀 Usage](#-usage)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation

Apollo element mixins are distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

```bash
npm install --save @apollo-elements/mixins
```

## 🍸 Mixins

### 🧱 ApolloElementMixin
This is the basic class which all others inherit from. You usually shouldn't need to use this directly.

### ❓ ApolloQueryMixin
Connects a web component to apollo client and associates it with a specific GraphQL query. When the query's data updates, so will the element's `data` property.

With it, you can create vanilla custom elements that render query data, for example:

Create a template

<code-copy>

```js
const template = document.createElement('template');
      template.innerHTML = `
        <style>
          :host([loading]) span {
            opacity: 0;
          }

          span {
            opacity: 1;
            will-change: opacity;
            transition: opacity 0.2s ease-in-out;
          }
        </style>

        <article id="error">
          <pre><code></code></pre>
        </article>

        <p>
          <span id="greeting"></span>
          <span id="name"></span>
        </p>
      `;
```

</code-copy>

Define the custom element

<code-copy>

```js
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin.js';

class HelloQuery extends ApolloQueryMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
  }
}

customElements.define('hello-query', HelloQuery);
```

</code-copy>

Add reactivity

<code-copy>

```js
#data = null;
get data() { return this.#data; }
set data(data) { this.#data = data; this.render(); }

#loading = false;
get loading() { return this.#loading; }
set loading(loading) { this.#loading = loading; this.render(); }

#error = null;
get error() { return this.#error; }
set error(error) { this.#error = error; this.render(); }
```

</code-copy>

Render the data

<code-copy>

```js

$(id) { return this.shadowRoot.getElementById(id); }

render() {
  if (this.loading)
    this.setAttribute('loading', '');
  else
    this.removeAttribute('loading');

  this.$('error').hidden =
    !this.error;

  this.$('error').querySelector("code").textContent =
    this.error?.message ?? '';

  this.$('greeting').textContent =
    this.data?.helloWorld?.greeting ?? 'Hello';

  this.$('name').textContent =
    this.data?.helloWorld?.name ?? 'Friend';
}
```

</code-copy>

And use it in HTML

```html
<hello-query>
  <script type="application/graphql">
    query HelloQuery($user: ID, $greeting: String) {
      helloWorld(user: $user) {
        name
        greeting
      }
    }
  </script>
  <script type="application/json">
    {
      "greeting": "shalom",
      "user": "haver"
    }
  </script>
</hello-query>
```

### 👾 ApolloMutationMixin
Connects a web component to apollo client and associates it with a specific GraphQL mutation. When the mutation resolves, so will the element's `data` property.

### 🗞 ApolloSubscriptionMixin
Connects a web component to apollo client and associates it with a specific GraphQL subscription. When the subscription gets new data, the element's `data` property will update.

### 💼 ApolloClientMixin
Optional mixin which connects an element to a specific `ApolloClient` instance.

<code-copy>

```ts
import { client } from './specific-apollo-client';

class SpecificClientElement
extends ApolloClientMixin(client, ApolloQueryMixin(HTMLElement)) {
  // ... do stuff with your client
}
```

</code-copy>

### ValidateVariablesMixin
Optional mixin which prevents queries from automatically subscribing until their non-nullable variables are defined.

### TypePoliciesMixin
Optional mixin which lets you declare type policies for a component's query.

## Aren't Mixins Considered Harmful?

Different kind of mixin. These are [JS class mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/), which are essentially function composition.

## 📚 Other Libraries
Looking for other libraries? Want to use Apollo with your favourite custom-elements library? Check out our [docs site](https://apolloelement.dev)

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
