---
name: interop

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
---

## Use them Anywhere

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
          data-icon-href="/_merged_assets/brand-logos/{{ demo.framework }}.svg">
      <codesandbox-button sandbox-id="{{ demo.sandboxId }}" module="{{ demo.module }}">
        <span slot="button" hidden></span>
      </codesandbox-button>
    </code-tab>
  {%- endfor -%}
</code-tabs>

{%- for demo in frameworkDemos -%}
  <link data-helmet rel="preconnect" href="https://{{demo.sandboxId}}.csb.app">
  <link data-helmet rel="preload" href="https://{{demo.sandboxId}}.csb.app" as="document">
  <link data-helmet rel="preload" href="https://codesandbox.io/embed/{{ demo.sandboxId }}?fontSize=14&hidenavigation=0&module={{demo.module}}&theme=dark" as="document">
{%- endfor -%}
