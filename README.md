<div align="center">

  <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <title>Apollo Elements</title>
    <g fill="none" fill-rule="evenodd">
      <path fill="#FFF" d="M288.5,18.7638837 L445.202503,109.236116 C465.313573,120.847248 477.702503,142.305504 477.702503,165.527767 L477.702503,346.472233 C477.702503,369.694496 465.313573,391.152752 445.202503,402.763884 L288.5,493.236116 C268.38893,504.847248 243.61107,504.847248 223.5,493.236116 L66.7974966,402.763884 C46.6864266,391.152752 34.2974966,369.694496 34.2974966,346.472233 L34.2974966,165.527767 C34.2974966,142.305504 46.6864266,120.847248 66.7974966,109.236116 L223.5,18.7638837 C243.61107,7.15275208 268.38893,7.15275208 288.5,18.7638837 Z"/>
      <g fill="#000" fill-rule="nonzero" transform="translate(67 122.5)">
        <polygon points="0 133.396 45.196 .5 101 .5 51.691 132.999 88.733 266.477 39.336 266.5"/>
        <polygon points="277 134.004 322.196 .5 378 .5 328.691 134.004 365.733 266.477 316.336 266.5" transform="rotate(180 327.5 133.5)"/>
        <polygon points="158.486 .5 220.463 .5 310 266.442 253.912 266.442 189.487 57.087 153.31 171.604 208.991 171.604 224.287 221.446 139.722 221.446 125.088 266.5 69 266.5"/>
      </g>
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
