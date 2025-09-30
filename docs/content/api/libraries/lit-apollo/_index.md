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

{{<docs-playground "lit-apollo" "ts">}}
{{<include Hello.ts>}}
{{</docs-playground>}}

{{<playground-file "lit-apollo" "index.html">}}
{{<include index.html>}}
{{</playground-file>}}

{{<playground-file "lit-apollo" "style.css">}}
{{<include style.css>}}
{{</playground-file>}}

{{<playground-file "lit-apollo" "Hello.query.graphql.ts">}}
{{<include Hello.query.graphql.ts>}}
{{</playground-file>}}

{{<playground-file "lit-apollo" "client.ts">}}
{{<include client.ts>}}
{{</playground-file>}}

<!-- TODO: Review and move to Hugo CSS -->
<!-- STYLE BLOCK:

#lit-apollo {
  --playground-preview-width: 300px;
}

-->
