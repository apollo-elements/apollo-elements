# @apollo-elements/mixins
[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/mixins.svg)](https://www.npmjs.com/package/@apollo-elements/mixins)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/mixins)
[![Build Status](https://circleci.com/gh/apollo-elements/apollo-elements/tree/master.svg?style=svg)](https://circleci.com/gh/apollo-elements/apollo-elements/tree/master)


<strong>🍹 Moon mixins for cosmic components 👩‍🚀</strong>

A set of [class mixin functions](https://alligator.io/js/class-composition/#composition-with-javascript-classes) that add Apollo GraphQL goodness to your web component classes.

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
- [😎 Cool Tricks](#-cool-tricks)
  - [📜 Inline Query Scripts](#-inline-query-scripts)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation

Apollo element mixins are distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

```bash
npm install --save @apollo-elements/mixins
```

Here's an example that uses `HTMLElement`

```js
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin.js';

class VanillaQuery extends ApolloQueryMixin(HTMLElement) {
  get data() {
    return this.__data;
  }

  set data(data) {
    this.__data = data;
    this.shadowRoot.innerText = `${data.helloWorld.greeting}, ${data.helloWorld.name}`;
  }  
}
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
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
