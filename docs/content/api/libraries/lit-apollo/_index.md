---
title: lit-apollo
layout: layout-api-index
package: lit-apollo
sidebar: api
---

# Web Component Libraries >> lit-apollo

<inline-notification type="tip">

Looking for reactive Apollo controllers? See [`@apollo-elements/core`](/api/core/)

</inline-notification>

[`lit`](https://lit.dev) combines a reactive component base class with an efficient and expressive templating system. It's a popular and simple choice for building any kind of web component project.

## Installation

<code-tabs collection="package-managers" default-tab="npm">
  {{<code-tab package="npm">}}npm i -S @apollo-elements/lit-apollo{{</code-tab>}}
  {{<code-tab package="yarn">}}yarn add @apollo-elements/lit-apollo{{</code-tab>}}
  {{<code-tab package="pnpm">}}pnpm add @apollo-elements/lit-apollo{{</code-tab>}}
</code-tabs>

`lit-apollo` base classes extend from `LitElement`, so you can quickly get up and running creating declarative front-ends with Apollo GraphQL.

{{<docs-playground id="lit-apollo" lang="ts">}}
  {{<playground-file name="Hello.ts" include="Hello.ts" />}}
  {{<playground-file name="index.html" include="index.html" />}}
  {{<playground-file name="style.css" include="style.css" />}}
  {{<playground-file name="Hello.query.graphql.ts" include="Hello.query.graphql.ts" />}}
  {{<playground-file name="client.ts" include="client.ts" />}}
{{</docs-playground>}}

<style>
#lit-apollo {
  --playground-preview-width: 300px;
}
</style>
