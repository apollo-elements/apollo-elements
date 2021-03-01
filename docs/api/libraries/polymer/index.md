---
layout: layout-api-index
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

## Examples

These custom elements fire [polymer](https://polymer-library.polymer-project.org)-style `*-changed` events when the Apollo cache updates their state. They extend directly from `HTMLElement` so they're small in size, and their notifying properties make them perfect for use in Polymer templates.

### Using `<apollo-client>` to Scope a Client to it's Children

This example uses [`<apollo-client>`](/api/components/apollo-client/) to create a client and assign it to `<apollo-query>`. There's no need to explicitly assign the `client` property, since `<apollo-client>` automatically sets the client on all it's deeply nested children.

```ts wcd 9kmJUbA735YuF4HRBzO7 src/Hello.ts
import { PolymerElement, html } from '@polymer/polymer';
import '@apollo-elements/components/apollo-client';
import '@apollo-elements/polymer/apollo-query';

class HelloQueryElement extends PolymerElement {
  static get template() {
    return html`
      <apollo-client uri="/graphql">
        <apollo-query data="{%raw%}{{data}}{%endraw%}" variables="[[variables]]">
          <script type="application/graphql">
            query HelloQuery($name: String, $greeting: String) {
              hello(name: $name, greeting: $greeting) {
                name
                greeting
              }
            }
          </script>
        </apollo-query>
      </apollo-client>

      <span id="hello">
        [[getGreeting(data)]], [[getName(data)]]!
      </span>
    `;
  }

  static get properties() {
    return {
      data: { type: Object },
      variables: {
        type: Object,
        value: () => ({
          name: 'Partner',
          greeting: 'Howdy',
        }),
      },
    };
  }

  getGreeting(data) {
    return data && data.hello && data.hello.greeting || 'hello';
  }

  getName(data) {
    return data && data.hello && data.hello.name || 'world';
  }
}

customElements.define('hello-query', HelloQueryElement);
```

### Using Two-Way Binding to Set the Client

If you prefer, you can use Polymer's two-way binding to set an element's client property, instead of nesting the apollo elements under an `<apollo-client>` element.

```html
<apollo-client uri="/graphql" client="{%raw%}{{ownClient}}{%endraw%}"></apollo-client>
<apollo-client uri="https://api.spacex.land/graphql" client="{%raw%}{{spaceXClient}}{%endraw%}"></apollo-client>

<apollo-query
    client="[[ownClient]]"
    data="{%raw%}{{helloData}}{%endraw%}"
    variables="[[helloVariables]]">
  <script type="application/graphql">
    query HelloQuery($name: String, $greeting: String) {
      hello(name: $name, greeting: $greeting) {
        name
        greeting
      }
    }
  </script>
</apollo-query>

<apollo-query
    client="[[spacexClient]]"
    data="{%raw%}{{launchesData}}{%endraw%}"
    variables="[[launchesVariables]]">
  <script type="application/graphql">
    query LaunchesQuery($sort: String = "launch_date_utc"){
      launches(sort: $sort, order: "desc") {
        launch_date_utc
        mission_name
        rocket {
          rocket_name
        }
      }
    }
  </script>
</apollo-query>

<p>
  <span>[[getGreeting(helloData)]]</span>,
  <span>[[getGreeting(helloData)]]</span>!
  Latest launch is
  <span>[[launchesData.launches.0.mission_name]]</span>.
</p>
```

## Exports
