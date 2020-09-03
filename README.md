<div align="center">
  <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <title>Apollo Elements</title>
    <g transform="translate(0 77)">
      <polygon points="0 179.359 61.305 0 137 0 70.116 178.823 120.361 358.969 53.357 359"/>
      <polygon points="375 180.18 436.305 0 512 0 445.116 180.18 495.361 358.969 428.357 359" transform="rotate(180 443.5 179.5)"/>
      <polygon points="214.047 0 297.884 0 419 358.921 343.13 358.921 255.983 76.371 207.047 230.926 282.365 230.926 303.057 298.195 188.665 298.195 168.87 359 93 359"/>
    </g>
  </svg>

  <h1>🚀 Apollo Elements 👩‍🚀</h1>
  <p><strong>🚀 Custom elements meet Apollo GraphQL 🌜</strong></p>
  <p><strong>👩‍🚀 It's one small step for a dev, one giant leap for the web platform! 👨‍🚀</strong></p>
</div>

[![Made with open-wc](https://img.shields.io/badge/made%20with-open--wc-blue)](https://open-wc.org)
[![Maintained with Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/apollo-elements/apollo-elements/issues)
[![Actions Status](https://github.com/apollo-elements/apollo-elements/workflows/CD/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/9766ab3cacfe5bfeab25/maintainability)](https://codeclimate.com/github/apollo-elements/apollo-elements/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9766ab3cacfe5bfeab25/test_coverage)](https://codeclimate.com/github/apollo-elements/apollo-elements/test_coverage)

Apollo Elements offers packages based on a variety of underlying web component authoring libraries. You can pick the one that suits your project in order to keep your app sizes small.

## 🤖 Demos
- [`#leeway`](https://leeway.apolloelements.dev) is an example chat PWA that uses `lit-apollo` to make it easier for you to avoid doing actual work. [Source Repository](https://github.com/apollo-elements/leeway)
- [`LaunchCTL`](https://launchctl.apolloelements.dev) is a simple PWA that displays info about [SpaceX](https://spacex.com) launches. It uses the unofficial [spacex.land](https://spacex.land) GraphQL API. [Source Repository](https://github.com/apollo-elements/launchctl)

## 📦 Packages
Apollo Elements offers packages based on a variety of underlying web component authoring libraries. You can pick the one that suits your project in order to keep your app sizes small.

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

### 🧱 Polymer

These custom elements fire [polymer](https://polymer-library.polymer-project.org)-style `*-changed` events when the Apollo cache updates their state. They extend directly from `HTMLElement` so they're small in size, and their notifying properties make them perfect for use in Polymer templates.

```bash
npm i -S @apollo-elements/polymer
```

[Read More](./packages/polymer)

## 🗺 Guides and Docs
If you just want to see the API Docs, check them out for all our packages at [apolloelements.dev](https://apolloelements.dev)

## 👷‍♂️ Maintainers
`apollo-elements` is a community project maintained by Benny Powers.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
