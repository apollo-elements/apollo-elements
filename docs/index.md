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

## Declarative GraphQL Components

```html playground query-spacex
<apollo-client uri="https://api.spacex.land/graphql">
  <apollo-query>
    <template>
      <link rel="stylesheet" href="components/spacex-launch.css"/>
      <h2>Latest Launch</h2>
      <img src="{%raw%}{{ data.launchLatest.links.patch }}{%endraw%}"
           alt="mission patch"/>
      <p>
        Mission {%raw%}{{ data.launchLatest.id }}{%endraw%},
                 <strong>{%raw%}{{ data.launchLatest.name }}{%endraw%}</strong>
        Launched <time>{%raw%}{{ data.launchLatest.date }}{%endraw%}</time>
        aboard   <strong>{%raw%}{{ data.launchLatest.rocket.name }}{%endraw%}</strong>
      </p>
    </template>
    <script type="application/graphql">
      query LatestLaunch {
        launchLatest {
          id
          date: launch_date_utc
          links { patch: mission_patch }
          name: mission_name
          rocket { name: rocket_name }
        }
      }
    </script>
  </apollo-query>
</apollo-client>
```

Write GraphQL web applications with **declarative HTML** templates.
Define **custom** query, mutation, or subscription components in JavaScript or TypeScript using your favourite web component library.
**Mix and match** programming styles and libraries in a single app, or publish GraphQL-connected components for use in any front-end framework.

## Use your Favourite Web Components Library

Apollo Elements comes with support for popular web components libraries.
Components built using different libraries can coexist seamlessly in the same app.

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
document.querySelector('docs-playground')
  .addEventListener('request-load-playground-elements', async function(event) {
    await import('https://cdn.skypack.dev/playground-elements@^0.8.0/');

    const promises = []
    if (!customElements.get('mwc-tab-bar'))
      promises.push(import('@material/mwc-tab-bar'));
    if (!customElements.get('mwc-icon-button'))
      promises.push(import('@material/mwc-icon-button'));
    console.log(await Promise.allSettled(promises));

    event.target.dispatchEvent(new CustomEvent('loaded-playground-elements'));
  })
```

<script type="playground-config" data-helmet for="query-spacex">
{
  "files":{
    "style.css":{
      "content":"html,\nbody {\n  background: black;\n  font-family: 'Open sans';\n  color: white;\n}"
    },
    "components/spacex-launch.css":{
      "content":":host {\n  display: flex;\n  flex-direction: column; \n  gap: 12px; \n  padding: 0 12px;\n }\n\nimg, p {\n  display: block;\n}"
    }
  },
  "importMap": {
    "imports": {
      "@apollo-elements/components": "ORIGIN/_assets/_static/apollo-elements.js"
    }
  }
}
</script>
