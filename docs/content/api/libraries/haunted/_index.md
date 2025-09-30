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

{{<docs-playground "apollo-haunted" "ts">}}
{{<include Hello.ts>}}
{{</docs-playground>}}

{{<playground-file "apollo-haunted" "index.html">}}
{{<include index.html>}}
{{</playground-file>}}

{{<playground-file "apollo-haunted" "style.css">}}
{{<include style.css>}}
{{</playground-file>}}

{{<playground-file "apollo-haunted" "Hello.query.graphql.ts">}}
{{<include Hello.query.graphql.ts>}}
{{</playground-file>}}

{{<playground-file "apollo-haunted" "client.ts">}}
{{<include client.ts>}}
{{</playground-file>}}

<!-- TODO: Review and move to Hugo CSS -->
<!-- STYLE BLOCK:

#apollo-haunted {
  --playground-preview-width: 300px;
}

-->
