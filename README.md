<div align="center">
  <img src="./logo.svg" alt="Apollo Elements" width="256" height="256"/>
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

## 🗺 Guides and Docs
If you just want to see the API Docs, check them out for all our packages at [apolloelements.dev](https://apolloelements.dev)

- [🥑 Core](https://apolloelements.dev/api/core/)
- [🧱 Components](https://apolloelements.dev/api/components/)
- [🍸 Mixins](https://apolloelements.dev/api/libraries/mixins/)
- [🔥 Lit](https://apolloelements.dev/api/libraries/lit-apollo/)
- [🏁 FAST](https://apolloelements.dev/api/libraries/fast/)
- [👻 Haunted](https://apolloelements.dev/api/libraries/haunted/)
- [⚛️ Atomico](https://apolloelements.dev/api/libraries/atomico/)
- [🦄 Hybrids](https://apolloelements.dev/api/libraries/hybrids/)
- [🔬 Gluon](https://apolloelements.dev/api/libraries/gluon/)
- [🧬 Polymer](https://apolloelements.dev/api/libraries/polymer/)

## Use in any Framework

Elements created with Apollo Elements work in any framework. Write GraphQL components once and use them in page with ease, even Angular, Preact, React, Svelte, or Vue apps.

- [Angular ❤️ Apollo Elements](https://codesandbox.io/s/apollo-elements-in-angular-9smgl?file=/src/app/app.component.html)
- [Preact 💙 Apollo Elements](https://codesandbox.io/s/apollo-elements-in-preact-yowom?file=/src/index.js)
- [React 💜 Apollo Elements](https://codesandbox.io/s/apollo-elements-in-react-00ev3?file=/src/LaunchesDemo.js)
- [Svelte 🧡 Apollo Elements](https://codesandbox.io/s/apollo-elements-in-svelte-u6js9?file=/LaunchesDemo.svelte)
- [Vue 💚 Apollo Elements](https://codesandbox.io/s/apollo-elements-in-vue-cq769?file=/src/components/ApolloElementsDemo.vue)

## 📦 Packages
Apollo Elements offers packages based on a variety of underlying web component authoring libraries. You can pick the one that suits your project and keep your bundle size small, or mix and match different libraries and approaches in the same app.

### 🥑 Core

Reactive GraphQL controllers contain sharable, reusable, and stackable logic.

<code-copy>

```
npm i -S @apollo-elements/core@next
```

</code-copy>

<code-copy>

```js
import { ApolloQueryController } from '@apollo-elements/core/apollo-query-controller';
import { ApolloMutationController } from '@apollo-elements/core/apollo-mutation-controller';
import { ApolloSubscriptionController } from '@apollo-elements/core/apollo-subscription-controller';
```

</code-copy>

### 🧱 Components

Write GraphQL apps in HTML.

- `<apollo-client>` provides all it's children (even across open shadow roots) with a client instance.
- `<apollo-query>` write GraphQL queries and their templates in HTML.
- `<apollo-mutation>` declarative mutation components in HTML.
- `<apollo-subscription>` write realtime GraphQL subscriptions and their templates in HTML.

<code-copy>

```
npm i -S @apollo-elements/components@next
```

</code-copy>

<code-copy>

```js
import '@apollo-elements/components/apollo-client';
import '@apollo-elements/components/apollo-query';
import '@apollo-elements/components/apollo-mutation';
import '@apollo-elements/components/apollo-subscription';
```

</code-copy>

[Read More](https://apolloelements.dev/api/components/)

### 🍸 Mixins

These custom element [class mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) give you all the features you need to connect your components to your Apollo cache without imposing a specific component library.

<code-copy>

```bash
npm i -S @apollo-elements/mixins@next
```

</code-copy>

<code-copy>

```js
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';
```

</code-copy>

[Read More](https://apolloelements.dev/api/libraries/mixins/)

### 🔥 lit-apollo
These base classes extend from [`LitElement`](https://lit.dev), so you can quickly get up and running creating declarative front-ends with Apollo GraphQL.

<code-copy>

```bash
npm i -S @apollo-elements/lit-apollo@next
```

</code-copy>

<code-copy>

```js
import { ApolloQuery } from '@apollo-elements/lit-apollo/apollo-query';
import { ApolloMutation } from '@apollo-elements/lit-apollo/apollo-mutation';
import { ApolloSubscription } from '@apollo-elements/lit-apollo/apollo-subscription';
```

</code-copy>

[Read More](https://apolloelements.dev/api/libraries/lit-apollo/)

### 🏁 FAST
These base classes extend from [`FASTElement`](https://fast.design), with all it's ergonomics and reactivity.

<code-copy>

```bash
npm i -S @apollo-elements/fast@next
```

</code-copy>

<code-copy>

```js
import { ApolloQuery } from '@apollo-elements/fast/apollo-query';
import { ApolloMutation } from '@apollo-elements/fast/apollo-mutation';
import { ApolloSubscription } from '@apollo-elements/fast/apollo-subscription';
```

</code-copy>

[Read More](https://apolloelements.dev/api/libraries/fast/)

### 👻 Haunted

Apollo hooks for web components, with [haunted](https://github.com/matthewp/haunted)!

<code-copy>

```bash
npm i -S @apollo-elements/haunted@next
```

</code-copy>

<code-copy>

```js
import { useQuery } from '@apollo-elements/haunted/useQuery';
import { useMutation } from '@apollo-elements/haunted/useMutation';
import { useSubscription } from '@apollo-elements/haunted/useSubscription';
```

</code-copy>

[Read More](https://apolloelements.dev/api/libraries/haunted/)

### ⚛️ Atomico

Alternate hooks implementation for web components, with [atomico](https://atomico.gitbook.io/doc/)!

<code-copy>

```bash
npm i -S @apollo-elements/atomico@next
```

</code-copy>

<code-copy>

```js
import { useQuery } from '@apollo-elements/atomico/useQuery';
import { useMutation } from '@apollo-elements/atomico/useMutation';
import { useSubscription } from '@apollo-elements/atomico/useSubscription';
```

</code-copy>

[Read More](https://apolloelements.dev/api/libraries/atomico/)

### 🦄 Hybrids

Descriptor factories and object spreads you can roll into your [hybrids](https://hybrids.js.org) to make it easier to connect to your Apollo cache.

<code-copy>

```bash
npm i -S @apollo-elements/hybrids@next
```

</code-copy>

<code-copy>

```js
import { query, mutation, subscription } from '@apollo-elements/hybrids';
```

</code-copy>

[Read More](https://apolloelements.dev/api/libraries/hybrids/)

### 👩‍🔬 Gluon
These base classes extend from [`GluonElement`](https://github.com/ruphin/gluonjs), a simplified <abbr title="web components">wc</abbr> library that uses `lit-html` for templating while keeping component state and lifecycle concerns 'close to the metal'.

<code-copy>

```bash
npm i -S @apollo-elements/gluon@next
```

</code-copy>

<code-copy>

```js
import { ApolloQuery } from '@apollo-elements/gluon/apollo-query';
import { ApolloMutation } from '@apollo-elements/gluon/apollo-mutation';
import { ApolloSubscription } from '@apollo-elements/gluon/apollo-subscription';
```

</code-copy>

[Read More](https://apolloelements.dev/api/libraries/gluon/)

### 🧬 Polymer

These custom elements fire [polymer](https://polymer-library.polymer-project.org)-style `*-changed` events when the Apollo cache updates their state. They extend directly from `HTMLElement` so they're small in size, and their notifying properties make them perfect for use in Polymer templates.

<code-copy>

```bash
npm i -S @apollo-elements/polymer@next
```

</code-copy>

<code-copy>

```js
import '@apollo-elements/polymer/polymer-apollo-query';
import '@apollo-elements/polymer/polymer-apollo-mutation';
import '@apollo-elements/polymer/polymer-apollo-subscription';
```

</code-copy>

[Read More](https://apolloelements.dev/api/libraries/polymer/)

## ‍🙏️ Acknowledgements
`apollo-elements` is a community project maintained by Benny Powers. We proudly use [Open Web Components](https://open-wc.org) and [Modern Web](https://modern-web.dev) tools. Thanks to [Netlify](https://netlify.com) and [Heroku](https://heroku.com) for hosting our documentation and demos.

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/bennyp?utm_source=github&utm_medium=button&utm_term=bennyp&utm_campaign=github)
