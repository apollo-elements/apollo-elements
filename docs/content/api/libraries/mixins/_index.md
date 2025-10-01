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

{{<docs-playground id="apollo-mixins" lang="js">}}
  {{<playground-file name="Hello.ts" include="Hello.ts" />}}
  {{<playground-file name="index.html" include="index.html" />}}
  {{<playground-file name="style.css" include="style.css" />}}
  {{<playground-file name="Hello.query.graphql.ts" include="Hello.query.graphql.ts" />}}
  {{<playground-file name="client.ts" include="client.ts" />}}
{{</docs-playground>}}

<style>
  #apollo-mixins {
    --playground-preview-width: 300px;
  }
</style>
