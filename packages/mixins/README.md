# @apollo-elements/mixins

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
- [😎 Cool Tricks](#-cool-tricks)
  - [📜 Inline Query Scripts](#-inline-query-scripts)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation

Apollo element mixins are distributed through `npm`, the node package manager. To install a copy of the latest version in your project's `node_modules` directory, [install npm on your system](https://www.npmjs.com/get-npm) then run the following command in your project's root directory:

```bash
npm install --save @apollo-elements/lit-apollo
```


Here's an example that uses `GluonElement` instead of `LitElement`.

```js
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin.js';
import { GluonElement, html } from '@gluon/gluon';

class GluonQuery extends ApolloQueryMixin(GluonElement) {
  set data(data) {
    this.__data = data;
    this.render();
  }  

  get data() {
    return this.__data;
  }

  get template() {
    return html`
      <h1>${this.data.title}</h1>
    `;
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
`apollo-elements` is maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
