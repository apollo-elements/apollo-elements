---
layout: sidebar.webc # layout-api-index
package: '@apollo-elements/core'
description: Core Controllers for Apollo Elements
title: Core
eleventyNavigation:
  order: 10
---

The core of Apollo Elements is a set of JavaScript classes that implement the 
[ReactiveController](https://lit.dev/docs/composition/controllers/) interface. 
This means that the essential operating logic of queries, mutations, and 
subscriptions is encapsulated in independent objects, and that elements 
implementing `ReactiveControllerHost` (e.g. 
[LitElement](https://lit.dev/docs/components/overview/)) work with them 
straight-away. Apollo Element is more than just "Apollo for Lit", though - the 
core classes form the basis for all our framework integrations, from [custom 
element mixins](../libraries/mixins/), to [hybrids descriptor 
factories](../libraries/hybrids/), to [haunted hooks](../libraries/haunted/).

This also introduces a separation between GraphQL operations (like queries or 
mutations) and the web components which host them. Previous versions of Apollo 
Elements strongly tied each GraphQL document to a single custom element, meaning 
if you wanted to have several queries in one component, the component either 
needed to define those queries as children, or combine the queries into a single 
document.

<npm-snippets npm="npm i -S @apollo-elements/core"
              yarn="yarn add @apollo-elements/core"
              pnpm="pnpm add @apollo-elements/core"></npm-snippets>

<docs-playground id="controller-host" playground-name="controller-host"></docs-playground>

