---
title: "Interfaces"
weight: 20
sidebar: api
---

Each of the web component library packages provides lets you build GraphQL apps differently, depending on the paradigm represented by the base package, they all share the same common interfaces

These interfaces represent the common core of Apollo Elements. Each library package (e.g. `lit-apollo`, `fast`, etc) implement these interfaces using their own idioms when needed.

That is to say, whether you create a query element with `lit-apollo`, `haunted`, or vanilla JS mixins, once they connect to the DOM, they all behave the same vis-a-vis GraphQL.

<figure aria-label="Inheritance diagram">

  {{<include path="../../../../static/assets/core/interfaces/mermaid-inheritance.svg">}}

  <figcaption class="visually-hidden">

  Class inheritance diagram of Apollo Elements, showing

  1. `ApolloQuery`, `ApolloMutation`, and `ApolloSubscription` inheriting from `ApolloElement`
  2. `ApolloElement` inheriting from `CustomElement`
  2. `CustomElement` inheriting from `HTMLElement`

  </figcaption>
</figure>
