---
title: Class Mixins
layout: layout-api-index
package: mixins
sidebar: api
---

# Web Component Libraries >> Class Mixins

These custom element [class mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) give you all the features you need to connect your components to your Apollo cache without imposing a specific component library.

## Installation

<code-tabs collection="package-managers" default-tab="npm">
  {{<code-tab package="npm">}}npm i -S @apollo-elements/mixins{{</code-tab>}}
  {{<code-tab package="yarn">}}yarn add @apollo-elements/mixins{{</code-tab>}}
  {{<code-tab package="pnpm">}}pnpm add @apollo-elements/mixins{{</code-tab>}}
</code-tabs>

Use the `ApolloQueryMixin`, `ApolloMutationMixin`, or `ApolloSubscriptionMixin` to add GraphQL behaviour to any base class.

{{<docs-playground "apollo-mixins" "js">}}
{{<include Hello.ts>}}
{{</docs-playground>}}

{{<playground-file "apollo-mixins" "index.html">}}
{{<include index.html>}}
{{</playground-file>}}

{{<playground-file "apollo-mixins" "style.css">}}
{{<include style.css>}}
{{</playground-file>}}

{{<playground-file "apollo-mixins" "Hello.query.graphql.ts">}}
{{<include Hello.query.graphql.ts>}}
{{</playground-file>}}

{{<playground-file "apollo-mixins" "client.ts">}}
{{<include client.ts>}}
{{</playground-file>}}

<!-- TODO: Review and move to Hugo CSS -->
<!-- STYLE BLOCK:

#apollo-mixins {
  --playground-preview-width: 300px;
}

-->
