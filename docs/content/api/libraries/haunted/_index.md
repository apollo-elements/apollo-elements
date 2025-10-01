---
title: Haunted
layout: layout-api-index
package: haunted
sidebar: api
---

# Web Component Libraries >> Haunted

[Haunted](https://github.com/matthewp/haunted) is an implementation of the React hooks API for web components.

## Installing

<code-tabs collection="package-managers" default-tab="npm">
  {{<code-tab package="npm">}}npm i -S @apollo-elements/haunted{{</code-tab>}}
  {{<code-tab package="yarn">}}yarn add @apollo-elements/haunted{{</code-tab>}}
  {{<code-tab package="pnpm">}}pnpm add @apollo-elements/haunted{{</code-tab>}}
</code-tabs>

Import `useQuery`, `useMutation`, or `useSubscription` to define your operation.

{{<docs-playground id="apollo-haunted" lang="ts">}}
  {{<playground-file name="Hello.ts" include="Hello.ts" />}}
  {{<playground-file name="index.html" include="index.html" />}}
  {{<playground-file name="style.css" include="style.css" />}}
  {{<playground-file name="Hello.query.graphql.ts" include="Hello.query.graphql.ts" />}}
  {{<playground-file name="client.ts" include="client.ts" />}}
{{</docs-playground>}}

<style>
  #apollo-haunted {
    --playground-preview-width: 300px;
  }
</style>
