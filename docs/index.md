---
title: Apollo Elements
layout: layout-home
templateEngineOverride: njk,md
slogan: Build high-performance web apps with GraphQL and web components.

callToActionItems:
  - text: Guides
    href: /guides/
  - text: API Docs
    href: /api/

blurbHeader: What is Apollo Elements?
blurbs:
  - header: High-Performance
    text: 'Leverage the modern web platform to deliver less JavaScript, without sacrificing <abbr title="developer experience">DX</abbr>.'
  - header: GraphQL
    text: Write declarative, expressive frontends and manage client-side state using GraphQL.
  - header: Interoperable
    text: Use your GraphQL components in any other frontend framework, or none!

frameworkDemos:
  - framework: angular
    frameworkAlt: Angular
    sandboxId: apollo-elements-in-angular-9smgl
    module: /src/app/app.component.html

  - framework: preact
    frameworkAlt: Preact
    sandboxId: apollo-elements-in-preact-yowom
    module: /src/components/LaunchesDemo.js

  - framework: react
    frameworkAlt: React
    sandboxId: apollo-elements-in-react-00ev3
    module: /src/LaunchesDemo.js

  - framework: svelte
    frameworkAlt: Svelte
    sandboxId: apollo-elements-in-svelte-u6js9
    module: /LaunchesDemo.svelte

  - framework: vue
    frameworkAlt: Vue
    sandboxId: apollo-elements-in-vue-cq769
    module: /src/components/ApolloElementsDemo.vue

libraries:
  - lib: mixins
    name: Vanilla
    logo: html5

  - lib: lit-apollo
    name: LitElement
    logo: lit

  - lib: fast
    name: FAST
    logo: fast

  - lib: haunted
    name: Haunted
    logo: haunted

  - lib: hybrids
    name: Hybrids
    logo: hybrids

  - lib: polymer
    name: Polymer
    logo: polymer

---

## Use your Favourite Web Components Library

Apollo Elements comes with support for many popular web components libraries.
Choose the one that suits your project and team, or mix-and-match.
Components built using different libraries can easily coexist in the same app.

{% include 'partials/libraries.njk' %}

## Interoperable

**Write GraphQL components once** and **use them everywhere** with ease.
Elements created with Apollo Elements work in any framework or none,
even in Angular, Preact, React, Svelte, or Vue apps.

These demos all import the same Apollo Element component from NPM.

{% include 'partials/frameworks.njk' %}

```js script
import '@power-elements/codesandbox-button';
const demos = document.getElementById('demos');
demos.addEventListener('select', loadDemo);
function loadDemo() {
  const sandbox = document.querySelector('#demos [selected] > *');
  sandbox.theme =
    document.body.getAttribute('theme') ||
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  sandbox.showDemo = true;
}
```
