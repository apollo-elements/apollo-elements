---
title: Atomico
layout: layout-api-index
package: atomico
sidebar: api
---

# Web Component Libraries >> Atomico

[Atomico](https://atomico.gitbook.io) is a hooks-based web components library.

## Installing

<code-tabs collection="package-managers" default="npm">
  {{<code-tab package="npm">}}npm i -S @apollo-elements/atomico{{</code-tab>}}
  {{<code-tab package="yarn">}}yarn add @apollo-elements/atomico{{</code-tab>}}
  {{<code-tab package="pnpm">}}pnpm add @apollo-elements/atomico{{</code-tab>}}
</code-tabs>

Import `useQuery`, `useMutation`, or `useSubscription` to define your operation.

{{<docs-playground "apollo-atomico" "ts">}}
{{<include Hello.ts>}}
{{</docs-playground>}}

{{<playground-file "apollo-atomico" "index.html">}}
{{<include index.html>}}
{{</playground-file>}}

{{<playground-file "apollo-atomico" "style.css">}}
{{<include style.css>}}
{{</playground-file>}}

{{<playground-file "apollo-atomico" "Hello.query.graphql.ts">}}
{{<include Hello.query.graphql.ts>}}
{{</playground-file>}}

{{<playground-file "apollo-atomico" "client.ts">}}
{{<include client.ts>}}
{{</playground-file>}}

<style>
#apollo-atomico {
  --playground-preview-width: 300px;
}
</style>
