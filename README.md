<div align="center">
  <img src="./logo.svg" alt="Apollo Elements"/>
  <h1>🚀 Apollo Elements 👩‍🚀</h1>
  <p><strong>🌑 Custom elements meet Apollo GraphQL 🌜</strong></p>
  <p><strong>👩‍🚀 It's one small step for a dev, one giant leap for the web platform! 👨‍🚀</strong></p>
</div>

[![Made with open-wc](https://img.shields.io/badge/made%20with-open--wc-blue)](https://open-wc.org)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/apollo-elements/apollo-elements/issues)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/polymer)](https://github.com/apollo-elements/apollo-elements/blob/master/LICENCE.md)
[![Maintainability](https://api.codeclimate.com/v1/badges/9766ab3cacfe5bfeab25/maintainability)](https://codeclimate.com/github/apollo-elements/apollo-elements/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9766ab3cacfe5bfeab25/test_coverage)](https://codeclimate.com/github/apollo-elements/apollo-elements/test_coverage)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

Apollo Elements offers packages based on a variety of underlying web component authoring libraries. You can pick the one that suits your project in order to keep your app sizes small.

```
npm init @apollo-elements
```

## 🤖 Demos
- [`#leeway`](https://leeway.apolloelements.dev) is an example chat PWA that uses `lit-apollo` to make it easier for you to avoid doing actual work. [Source Repository](https://github.com/apollo-elements/leeway)
- [`LaunchCTL`](https://launchctl.apolloelements.dev) is a simple PWA that displays info about [SpaceX](https://spacex.com) launches. It uses the unofficial [spacex.land](https://spacex.land) GraphQL API. [Source Repository](https://github.com/apollo-elements/launchctl)

## 📦 Packages
Apollo Elements offers packages based on a variety of underlying web component authoring libraries. You can pick the one that suits your project in order to keep your app sizes small.

### 🧱 Components

Utility components that help you factor your graphql-based app.

- `<apollo-client>` provides all it's children (even across open shadow roots) with a client instance.
- `<apollo-mutation>` lets you write declarative mutation components without subclassing.

```
npm i -S @apollo-elements/components
```

### 🍸 Mixins

These custom element [class mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) give you all the features you need to connect your components to your Apollo cache without imposing a specific component library.

```bash
npm i -S @apollo-elements/mixins
```

[Read More](./packages/mixins)

### 🔥 lit-apollo
These base classes extend from [`LitElement`](https://lit-element.polymer-project.org), so you can quickly get up and running creating declarative front-ends with Apollo GraphQL.

```bash
npm i -S @apollo-elements/lit-apollo
```

[Read More](./packages/lit-apollo)

### 👩‍🔬 Gluon
These base classes extend from [`GluonElement`](https://github.com/ruphin/gluonjs), a simplified <abbr title="web components">wc</abbr> library that uses `lit-html` for templating while keeping component state and lifecycle concerns 'close to the metal'.

```bash
npm i -S @apollo-elements/gluon
```

[Read More](./packages/gluon)

### 🦄 Hybrids

A set of objects you can roll into your [hybrids](https://hybrids.js.org) to make it easier to connect to your Apollo cache.

```bash
npm i -S @apollo-elements/hybrids
```

[Read More](./packages/hybrids)

### 🧬 Polymer

These custom elements fire [polymer](https://polymer-library.polymer-project.org)-style `*-changed` events when the Apollo cache updates their state. They extend directly from `HTMLElement` so they're small in size, and their notifying properties make them perfect for use in Polymer templates.

```bash
npm i -S @apollo-elements/polymer
```

[Read More](./packages/polymer)

## 🗺 Guides and Docs
If you just want to see the API Docs, check them out for all our packages at [apolloelements.dev](https://apolloelements.dev)

## ‍🙏️ Acknowledgements
`apollo-elements` is a community project maintained by Benny Powers. We proudly use [Open Web Components](https://open-wc.org) and [Modern Web](https://modern-web.dev) tools. Thanks to [Netlify](https://netlify.com) and [Heroku](https://heroku.com) for hosting our documentation and demos.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
