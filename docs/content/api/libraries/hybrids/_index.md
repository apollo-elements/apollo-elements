---
title: Hybrids
layout: layout-api-index
package: hybrids
sidebar: api
---

# Web Component Libraries >> Hybrids

Hybrids is a unique web components framework which combines aspects of functional and object-oriented paradigms into something entirely it's own.

## Installation

<code-tabs collection="package-managers" default-tab="npm">
  {{<code-tab package="npm">}}npm i -S @apollo-elements/hybrids{{</code-tab>}}
  {{<code-tab package="yarn">}}yarn add @apollo-elements/hybrids{{</code-tab>}}
  {{<code-tab package="pnpm">}}pnpm add @apollo-elements/hybrids{{</code-tab>}}
</code-tabs>

Import the `query`, `mutation`, and `subscription` descriptor factories and use them in your [hybrids](https://hybrids.js.org) to connect them to your Apollo cache.

{{<docs-playground id="hybrids-app" lang="ts">}}
  {{<playground-file name="users-list.ts" include="users-list.ts" />}}
  {{<playground-file name="users-list.css" include="users-list.css" />}}

  {{<playground-file name="Users.query.graphql.ts" include="Users.query.graphql.ts" />}}

  {{<playground-file name="AddUser.mutation.graphql.ts" include="AddUser.mutation.graphql.ts" />}}

  {{<playground-file name="RemoveUser.mutation.graphql.ts" include="RemoveUser.mutation.graphql.ts" />}}

  {{<playground-file name="style.css" include="style.css" />}}

  {{<playground-file name="index.html" include="index.html" />}}

  {{<playground-file name="client.ts" include="client.ts" />}}
{{</docs-playground>}}