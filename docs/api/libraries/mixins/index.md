---
layout: sidebar.webc # layout-api-index
package: '@apollo-elements/mixins'
title: Class Mixins
---

These custom element [class 
mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) 
give you all the features you need to connect your components to your Apollo 
cache without imposing a specific component library.

## Installation

<npm-snippets npm="npm i -S @apollo-elements/mixins"
              yarn="yarn add @apollo-elements/mixins"
              pnpm="pnpm add @apollo-elements/mixins"></npm-snippets>

Use the `ApolloQueryMixin`, `ApolloMutationMixin`, or `ApolloSubscriptionMixin` 
to add GraphQL behaviour to any base class.

<docs-playground id="apollo-mixins" playground-name="apollo-mixins"></docs-playground>

<style>
#apollo-mixins {
  --playground-preview-width: 300px;
}
</style>
