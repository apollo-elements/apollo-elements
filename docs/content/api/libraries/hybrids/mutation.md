---
title: "Mutation Factory"
weight: 20
layout: "layout-api"
package: "hybrids"
module: "factories/mutation.js"
sidebar: api
---

<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->


Use the `mutation` factory to add a GraphQL mutation to you hybrids element.

{{<docs-playground id="mutation-factory" lang="ts">}}
  {{<playground-file name="add-user.ts" include="add-user.ts" />}}
  {{<playground-file name="add-user.css" include="add-user.css" />}}

  {{<playground-file name="AddUser.mutation.graphql.ts" include="AddUser.mutation.graphql.ts" />}}

  {{<playground-file name="index.html" include="index.html" />}}

  {{<playground-file name="client.ts" include="client.ts" />}}
{{</docs-playground>}}