# @apollo-elements/polymer
[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/polymer.svg)](https://www.npmjs.com/package/@apollo-elements/polymer)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/polymer)
[![Actions Status](https://github.com/apollo-elements/apollo-elements/workflows/CD/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>🚀 Custom Elements that support two-way binding from your Apollo cache 🌜</strong>

<strong>👩‍🚀 For developing with space-age Polymers 👨‍🚀</strong>

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation
`apollo-elements` are distributed through `npm` the node package manager. To install a copy of the latest version of these elements in your project's `node_modules` directory, first [Install npm on your system](https://www.npmjs.com/get-npm), then run the following command in your project's root directory:

```bash
npm install --save @apollo-elements/polymer
```

## 👩‍🚀 Usage
By default, these elements will use the client assigned to `window.__APOLLO_CLIENT__`, but you could alternatively assign to each element's `client` property directly.

```js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

window.__APOLLO_CLIENT__ = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.spacex.land/graphql',
  })
});
```

After that, import the elements.

```js
import '@apollo-elements/polymer/apollo-query-element';
import '@apollo-elements/polymer/apollo-mutation-element';
```

You can now use them in your polymer template:
```html
<apollo-query data="{{data}}" variables="[[variables]]">
  <script type="application/graphql">
    query User($id: ID!)
      user(id: $id) {
        name
        picture
      }
    }
  </script>
</apollo-query>

<paper-icon-item>
  <iron-image slot="item-icon">[[data.user.picture]]</iron-image>
  [[data.user.name]]
</paper-icon-item>
```

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
