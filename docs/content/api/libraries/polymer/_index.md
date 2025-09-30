---
title: Polymer
layout: layout-api-index
package: polymer
sidebar: api
---

# Web Component Libraries >> Polymer

Polymer is the <abbr title="original gangsta">OG</abbr> web components library, and while it's now in maintenance ([the library, not the project](https://dev.to/bennypowers/lets-build-web-components-part-4-polymer-library-4dk2#the-polymer-project)), it's still in use all over the web.

## Installation

<code-tabs collection="package-managers" default-tab="npm">
  {{<code-tab package="npm">}}npm i -S @apollo-elements/polymer{{</code-tab>}}
  {{<code-tab package="yarn">}}yarn add @apollo-elements/polymer{{</code-tab>}}
  {{<code-tab package="pnpm">}}pnpm add @apollo-elements/polymer{{</code-tab>}}
</code-tabs>

Import `apollo-query`, `apollo-mutation`, or `apollo-subscription` to bind data up into your Polymer elements.

## Examples

These custom elements fire [polymer](https://polymer-library.polymer-project.org)-style `*-changed` events when the Apollo cache updates their state. They extend directly from `HTMLElement` so they're small in size, and their notifying properties make them perfect for use in Polymer templates.

### Using `<apollo-client>` to Scope a Client to it's Children

This example uses [`<apollo-client>`](/api/components/apollo-client/) to create a client and assign it to `<apollo-query>`. There's no need to explicitly assign the `client` property, since `<apollo-client>` automatically sets the client on all it's deeply nested children.

{{<docs-playground "polymer-apollo" "ts">}}
{{<include Hello.ts>}}
{{</docs-playground>}}

{{<playground-file "polymer-apollo" "Hello.query.graphql.js">}}
{{<include Hello.query.graphql.js>}}
{{</playground-file>}}

{{<playground-file "polymer-apollo" "client.js">}}
{{<include client.js>}}
{{</playground-file>}}

{{<playground-file "polymer-apollo" "index.html">}}
{{<include index.html>}}
{{</playground-file>}}

### Using Two-Way Binding to Set the Client

If you prefer, you can use Polymer's two-way binding to set an element's client property, instead of nesting the apollo elements under an `<apollo-client>` element.

```html
<apollo-client uri="/graphql" client="{{ownClient}}"></apollo-client>
<apollo-client uri="https://api.spacex.land/graphql" client="{{spaceXClient}}"></apollo-client>

<apollo-query
    client="[[ownClient]]"
    data="{{helloData}}"
    query="[[helloQuery]]"
    variables="[[helloVariables]]">
</apollo-query>

<apollo-query
    client="[[spacexClient]]"
    data="{{launchesData}}"
    query="[[launchesQuery]]"
    variables="[[launchesVariables]]">
</apollo-query>

<p>
  <span>[[getName(helloData)]]</span>,
  <span>[[getGreeting(helloData)]]</span>!
  Latest launch is
  <span>[[launchesData.launches.0.mission_name]]</span>.
</p>
```

## Exports
