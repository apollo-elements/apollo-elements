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

{{<docs-playground id="apollo-gluon" lang="ts">}}
  {{<playground-file name="Hello.ts" include="Hello.ts" />}}
  {{<playground-file name="index.html" include="index.html" />}}
  {{<playground-file name="style.css" include="style.css" />}}
  {{<playground-file name="Hello.query.graphql.ts" include="Hello.query.graphql.ts" />}}
  {{<playground-file name="client.ts" include="client.ts" />}}
{{</docs-playground>}}

<style>
  #apollo-gluon {
    --playground-preview-width: 300px;
  }
</style>
