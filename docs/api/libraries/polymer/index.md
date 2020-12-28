---
layout: api-index
package: '@apollo-elements/polymer'
---

# Web Component Libraries >> Polymer || 70

Polymer is the <abbr title="original gangsta">OG</abbr> web components library, and while it's now in maintenance ([the library, not the project](https://dev.to/bennypowers/lets-build-web-components-part-4-polymer-library-4dk2#the-polymer-project)), it's still in use all over the web.

## Installation

<code-tabs collection="package-managers" default-tab="npm">

```bash tab npm
npm i -S @apollo-elements/polymer
```

```bash tab yarn
yarn add @apollo-elements/polymer
```

```bash tab pnpm
pnpm add @apollo-elements/polymer
```

</code-tabs>

Import `apollo-query`, `apollo-mutation`, or `apollo-subscription` to bind data up into your Polymer elements.

These custom elements fire [polymer](https://polymer-library.polymer-project.org)-style `*-changed` events when the Apollo cache updates their state. They extend directly from `HTMLElement` so they're small in size, and their notifying properties make them perfect for use in Polymer templates.

```ts wcd 9kmJUbA735YuF4HRBzO7 src/Hello.ts
import { PolymerElement, html } from '@polymer/polymer';
import '@apollo-elements/polymer/apollo-query';

class HelloQueryElement extends PolymerElement {
  static get template() {
    return html`
      <apollo-query data="{%raw%}{{data}}{%endraw%}">
        <script type="application/graphql">
          query HelloQuery($name: String, $greeting: String) {
            hello(name: $name, greeting: $greeting) {
              name
              greeting
            }
          }
        </script>
      </apollo-query>

      <span id="hello">
        [[getGreeting(data)]], [[getName(data)]]!
      </span>
    `;
  }

  static get properties() {
    return {
      data: {
        type: Object,
        value: () => null,
      },
    };
  }

  getGreeting(data) {
    return data?.hello?.greeting ?? 'hello';
  }

  getName(data) {
    return data?.hello?.name ?? 'world';
  }
}

customElements.define('hello-query', HelloQueryElement);
```
