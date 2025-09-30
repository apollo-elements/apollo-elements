---
title: FAST
layout: layout-api-index
package: fast
sidebar: api
---

# Web Component Libraries >> FAST

<style>
#apollo-fast {
  --playground-preview-width: 300px;
}
</style>

[FAST](https://fast.design) is a new and innovative web component library and design system from Microsoft. It features statically typed template literals and a flexible reactivity model.

## Installation

<code-tabs collection="package-managers" default-tab="npm">
  {{<code-tab package="npm">}}npm i -S @apollo-elements/fast{{</code-tab>}}
  {{<code-tab package="yarn">}}yarn add @apollo-elements/fast{{</code-tab>}}
  {{<code-tab package="pnpm">}}pnpm add @apollo-elements/fast{{</code-tab>}}
</code-tabs>

`@apollo-elements/fast` base classes extend from [`FASTElement`](https://fast.design), with all it's ergonomics and reactivity.

{{<docs-playground "apollo-fast" "ts">}}
{{<include Profile.ts>}}
{{</docs-playground>}}

{{<playground-file "apollo-fast" "user-profile.css.js">}}
{{<include user-profile.css.js>}}
{{</playground-file>}}

{{<playground-file "apollo-fast" "index.html">}}
{{<include index.html>}}
{{</playground-file>}}

{{<playground-file "apollo-fast" "style.css">}}
{{<include style.css>}}
{{</playground-file>}}

{{<playground-file "apollo-fast" "Profile.query.graphql.ts">}}
{{<include Profile.query.graphql.ts>}}
{{</playground-file>}}

{{<playground-file "apollo-fast" "Countries.query.graphql.ts">}}
{{<include Countries.query.graphql.ts>}}
{{</playground-file>}}

{{<playground-file "apollo-fast" "UpdateProfile.mutation.graphql.ts">}}
{{<include UpdateProfile.mutation.graphql.ts>}}
{{</playground-file>}}

{{<playground-file "apollo-fast" "client.ts">}}
{{<include client.ts>}}
{{</playground-file>}}

{{<playground-file "apollo-fast" "countries.ts">}}
{{<include countries.ts>}}
{{</playground-file>}}
