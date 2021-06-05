# @apollo-elements/polymer

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/polymer.svg)](https://www.npmjs.com/package/@apollo-elements/polymer)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/polymer)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/polymer)](https://github.com/apollo-elements/apollo-elements/blob/master/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>🚀 Custom Elements with Polymer-style two-way binding from your Apollo cache 🌜</strong>

<strong>👩‍🚀 For developing with space-age Polymers 👨‍🚀</strong>

> 🔎 Read the [Full API Docs](https://apolloelements.dev/api/libraries/polymer/) 🔎

## 📓 Contents
- [🔧 Installation](#-installation)
- [👩‍🚀 Usage](#-usage)
- [👷‍♂️ Maintainers](#-maintainers)

## 🔧 Installation
`apollo-elements` are distributed through `npm` the node package manager. To install a copy of the latest version of these elements in your project's `node_modules` directory, first [Install npm on your system](https://www.npmjs.com/get-npm), then run the following command in your project's root directory:

```bash
npm install --save @apollo-elements/polymer
```

`@apollo-elements/polymer` does not depend on `@polymer/polymer`. The components extend directly from HTMLElement, so they're suitable for use in any project, not just [Polymer library](https://polymer-library.polymer-project.org/) apps.

## 👩‍🚀 Usage
> See our [docs on setting up Apollo client](https://apolloelements.dev/guides/getting-started/apollo-client/) so your components can fetch their data.

Import the elements.

<code-copy>

  ```js
  import '@apollo-elements/polymer/polymer-apollo-query';
  import '@apollo-elements/polymer/polymer-apollo-mutation';
  ```

</code-copy>

You can now use them in your polymer template:

<code-copy>

```html
<polymer-apollo-query
    data="{{data}}"
    variables="[[variables]]"
    query="[[UserQuery]]"
></polymer-apollo-query>

<paper-icon-item>
  <iron-image slot="item-icon">[[data.user.picture]]</iron-image>
  [[data.user.name]]
</paper-icon-item>
```

</code-copy>

## 📚 Other Libraries
Looking for other libraries? Want to use Apollo with vanilla `extends HTMLElement` components? Check out our [docs site](https://apolloelements.dev/)

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
