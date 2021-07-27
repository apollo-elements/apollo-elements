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

frameworkDemos:
  - framework: angular
    frameworkAlt: Angular
    sandboxId: apollo-elements-in-angular-9smgl
    module: /src/app/app.component.html
    color: '#dd0031'

  - framework: preact
    frameworkAlt: Preact
    sandboxId: apollo-elements-in-preact-yowom
    module: /src/components/LaunchesDemo.js
    color: '#673ab8'

  - framework: react
    frameworkAlt: React
    sandboxId: apollo-elements-in-react-00ev3
    module: /src/LaunchesDemo.js
    color: '#61dafb'

  - framework: svelte
    frameworkAlt: Svelte
    sandboxId: apollo-elements-in-svelte-u6js9
    module: /LaunchesDemo.svelte
    color: '#ff3e00'

  - framework: vue
    frameworkAlt: Vue
    sandboxId: apollo-elements-in-vue-cq769
    module: /src/components/ApolloElementsDemo.vue
    color: '#41b883'

libraries:
  - lib: mixins
    name: Vanilla
    logo: html5

  - lib: lit-apollo
    name: Lit
    logo: lit

  - lib: fast
    name: FAST
    logo: fast

  - lib: haunted
    name: Haunted
    logo: haunted

  - lib: atomico
    name: Atomico
    logo: atomico

  - lib: hybrids
    name: Hybrids
    logo: hybrids

  - lib: polymer
    name: Polymer
    logo: polymer

---

```html playground query-spacex
<apollo-client uri="https://api.spacex.land/graphql">
  <apollo-query>
    <script type="application/graphql" src="queries/LatestLaunch.graphql"></script>
    <template>
      <link rel="stylesheet" href="components/spacex-launch.css"/>
      <article class="{%raw%}{{ data ? 'resolved' : 'loading' }}{%endraw%}">
        <h2>Latest Launch</h2>
        <img .src="{%raw%}{{ data.launchLatest.links.mission_patch }}{%endraw%}"
             alt="mission patch"/>
        <p>
          Mission {%raw%}{{ data.launchLatest.id }}{%endraw%},
                   <strong>{%raw%}{{ data.launchLatest.mission_name }}{%endraw%}</strong>
          Launched <time>{%raw%}{{ data.launchLatest.launch_date_utc }}{%endraw%}</time>
          aboard   <strong>{%raw%}{{ data.launchLatest.rocket.rocket_name }}{%endraw%}</strong>
        </p>
      </article>
    </template>
  </apollo-query>
</apollo-client>
<script src="type-policies.js" type="module"></script>
```

```js playground-file query-spacex type-policies.js
import '@apollo-elements/components';

const client = document.querySelector('apollo-client');
(async function() {
  await customElements.whenDefined('apollo-client');
  await client.updateComplete;
  client.typePolicies = {
    Launch: {
      fields: {
        launch_date_utc(next) {
          try {
            return new Date(next).toDateString();
          } catch(e) {
            return next;
          }
        }
      }
    }
  };
})();
```

```css playground-file query-spacex style.css
html,
body {
  background: black;
  font-family: 'Open sans';
  color: white;
}
```

```css playground-file query-spacex components/spacex-launch.css
article {
  display: grid;
  grid-template-areas: 'h i' 'p p';
  grid-template-columns: auto min-content;
  gap: 12px;
  padding: 0 12px;
}

:host([loading]) article { display: none; }
article { opacity: 0; }
h2 { grid-area: h; }
p { grid-area: p; }
img, p { display: block; }

.resolved {
  opacity: 1;
  transition: opacity 0.2s ease-in;
}

img {
  max-width: 50px;
  grid-area: i;
  place-self: center;
}
```

```graphql playground-file query-spacex queries/LatestLaunch.graphql
query LatestLaunch {
  launchLatest {
    id
    launch_date_utc
    links { mission_patch }
    mission_name
    rocket { rocket_name }
  }
}
```

<h2 class="reason-header">Why Apollo Elements?</h2>

<section class="reasons">

<article>
  <h3>High-Performance</h3>
  Leverage the modern web platform to deliver less JavaScript, without sacrificing <abbr title="developer experience">DX</abbr>.
</article>

<article>
  <h3>GraphQL</h3>
  Write declarative, expressive frontends and manage client-side state using GraphQL.
</article>

<article>
  <h3>Interoperable</h3>
  Use your GraphQL components in any other frontend framework, or none!
</article>

</section>

Write GraphQL web applications with **declarative HTML** templates.
Define **custom** query, mutation, or subscription components in JavaScript or TypeScript using your favourite web component library.
**Mix and match** programming styles and libraries in a single app, or publish GraphQL-connected components for use in any front-end framework.

## Use your Favourite Web Components Library

Apollo Elements comes with support for popular web components libraries.
Components built using different libraries can coexist seamlessly in the same app.

<ul id="libraries">
{%- for library in libraries -%}
  {%- set path = './_assets/brand-logos/' + library.logo + '.svg' -%}
  <li>
    <a href="./api/libraries/{{ library.lib }}/" class="library {{ library.lib }}">
      <figure>
        {%- include path -%}
        <figcaption>{{ library.name }}</figcaption>
      </figure>
    </a>
  </li>
{%- endfor -%}
</ul>


## Interoperable

**Write GraphQL components once** and **use them everywhere** with ease.
Elements created with Apollo Elements work in any framework or none,
even in Angular, Preact, React, Svelte, or Vue apps.

These demos all import the same Apollo Element component from NPM.

<wibbler-wobbler>
<code-tabs id="demos" collection="frameworks">
  <article id="default-tab" slot="default">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.794 39.794">
      <path d="M32.901 39.794a3.32 3.32 0 01-1.933-.604L10.182 24.344l-6.001 6a.998.998 0 01-1.703-.622L.004 1.086A1 1 0 011.086.004l28.638 2.475a1 1 0 01.622 1.703l-6 6 14.847 20.786c.926 1.297.769 3.197-.359 4.325l-3.539 3.539c-.637.635-1.516.962-2.394.962zM10.075 22.038c.202 0 .406.061.581.186l21.475 15.339c.499.357 1.315.288 1.748-.146l3.539-3.539c.433-.434.501-1.25.146-1.749l-15.34-21.474a1 1 0 01.107-1.288l5.081-5.081L2.098 2.098l2.188 25.314 5.081-5.081a.999.999 0 01.708-.293z"/>
    </svg>
    <p>Click a tab to view the demo</p>
  </article>
  {%- for demo in frameworkDemos -%}
    <code-tab no-copy
          data-id="{{ demo.framework }}"
          data-synonyms="{{ demo.frameworkAlt }}"
          data-label="{{ demo.frameworkAlt }}"
          data-color="{{ demo.color }}"
          data-icon-href="{{ ('/_assets/brand-logos/' + demo.framework + '.svg') | asset | url }}">
      <codesandbox-button sandbox-id="{{ demo.sandboxId }}" module="{{ demo.module }}">
        <span slot="button" hidden></span>
      </codesandbox-button>
    </code-tab>
  {%- endfor -%}
</code-tabs>
</wibbler-wobbler>

```js script
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

```js script
import './wibbler.js';
```
