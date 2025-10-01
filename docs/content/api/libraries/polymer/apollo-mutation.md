---
title: polymer-apollo-mutation
weight: 20
layout: layout-api
package: polymer
module: polymer-apollo-mutation.js
sidebar: api
---

<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->


`<apollo-mutation>` fires Polymer-style prop-changed events when its `called`, `data`, `error`, or `loading` properties change.

See [ApolloMutationInterface](/api/core/interfaces/mutation/) for more information.

{{<docs-playground id="polymer-apollo" lang="js">}}
  {{<playground-file name="AddUser.js" include="AddUser.js" />}}
  {{<playground-file name="Hello.query.graphql.js" include="Hello.query.graphql.js" />}}

  {{<playground-file name="index.html" include="index.html" />}}

  {{<playground-file name="elements.js" include="elements.js" />}}
{{</docs-playground>}}