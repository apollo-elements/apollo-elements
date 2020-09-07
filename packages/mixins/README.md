# @apollo-elements/mixins

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/mixins.svg)](https://www.npmjs.com/package/@apollo-elements/mixins)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/mixins)
[![Actions Status](https://github.com/apollo-elements/apollo-elements/workflows/CD/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)


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

### ApolloElementMixin
This is the basic class which all others inherit from. You usually shouldn't need to use this directly.

### ApolloQueryMixin
Connects a web component to apollo client and associates it with a specific GraphQL query. When the query's data updates, so will the element's `data` property.

### ApolloMutationMixin
Connects a web component to apollo client and associates it with a specific GraphQL mutation. When the mutation resolves, so will the element's `data` property.

### ApolloSubscriptionMixin
Connects a web component to apollo client and associates it with a specific GraphQL subscription. When the subscription gets new data, the element's `data` property will update.

### ApolloClientMixin
Optional mixin which connects an element to a specific `ApolloClient` instance.

```ts
import { client } from './specific-apollo-client';

class SpecificClientElement extends ApolloClientMixin(client, ApolloQueryMixin(HTMLElement)) {
  // ...
}
```

## 👩‍🚀 Usage

Here's an example that uses `HTMLElement`

```js
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin.js';

class HelloQuery extends ApolloQueryMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>/* ... */</style>
      <p hidden>
        <span id="greeting"></span>
        <span id="name"></span>
      </p>
    `;
  }

  get data() {
    return this.__data;
  }

  set data(data) {
    this.__data = data;
    this.render();
  }

  render() {
    if (!this.data) return;
    this.shadowRoot.getElementById('greeting').textContent =
      this.data?.helloWorld.greeting ?? 'Hello';

    this.shadowRoot.getElementById('name').textContent =
      this.data?.helloWorld.name ?? 'Friend';

    this.shadowRoot.querySelector('p').hidden = false;
  }
}

customElements.define('hello-query', HelloQuery);
```

```html
<hello-query>
  <script type="application/graphql">
    query HelloQuery {
      helloWorld {
        name
        greeting
      }
    }
  </script>
</hello-query>
```

## Aren't Mixins Considered Harmful?

Different kind of mixin. These are [JS class mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/).

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
