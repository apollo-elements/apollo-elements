---
layout: sidebar.webc # layout-api-index
package: '@apollo-elements/lit-apollo'
title: lit-apollo
---

<inline-notification type="tip">

Looking for reactive Apollo controllers? See [`@apollo-elements/core`](/api/core/)

</inline-notification>

[`lit`](https://lit.dev) combines a reactive component base class with an 
efficient and expressive templating system. It's a popular and simple choice for 
building any kind of web component project.

## Installation

<npm-snippets npm="npm i -S @apollo-elements/lit-apollo"
              yarn="yarn add @apollo-elements/lit-apollo"
              pnpm="pnpm add @apollo-elements/lit-apollo"></npm-snippets>

`lit-apollo` base classes extend from `LitElement`, so you can quickly get up 
and running creating declarative front-ends with Apollo GraphQL.

<docs-playground id="lit-apollo" playground-name="lit-apollo"></docs-playground>
<style>
#lit-apollo {
  --playground-preview-width: 300px;
}
</style>
