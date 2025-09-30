---
title: Gluon
layout: layout-api-index
package: gluon
sidebar: api
---

# Web Component Libraries >> Gluon

Gluon is a minimalist web components base class that templates components with `lit-html`.

## Installation

<code-tabs collection="package-managers" default-tab="npm">
  {{<code-tab package="npm">}}npm i -S @apollo-elements/gluon{{</code-tab>}}
  {{<code-tab package="yarn">}}yarn add @apollo-elements/gluon{{</code-tab>}}
  {{<code-tab package="pnpm">}}pnpm add @apollo-elements/gluon{{</code-tab>}}
</code-tabs>

Import `ApolloQuery`, `ApolloMutation`, or `ApolloSubscription` to define your components.

{{<docs-playground "apollo-gluon" "ts">}}
{{<include Hello.ts>}}
{{</docs-playground>}}

{{<playground-file "apollo-gluon" "index.html">}}
{{<include index.html>}}
{{</playground-file>}}

{{<playground-file "apollo-gluon" "style.css">}}
{{<include style.css>}}
{{</playground-file>}}

{{<playground-file "apollo-gluon" "Hello.query.graphql.ts">}}
{{<include Hello.query.graphql.ts>}}
{{</playground-file>}}

{{<playground-file "apollo-gluon" "client.ts">}}
{{<include client.ts>}}
{{</playground-file>}}

<!-- TODO: Review and move to Hugo CSS -->
<!-- STYLE BLOCK:

#apollo-gluon {
  --playground-preview-width: 300px;
}

-->
