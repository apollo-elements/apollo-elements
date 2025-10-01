---
title: apollo-query
weight: 30
layout: layout-api
package: components
module: apollo-query.js
sidebar: api
---

<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->


`<apollo-query>` lets you query GraphQL without writing any JavaScript. Import the custom element then write your template, query, and variables in HTML. The element class inherits from [`ApolloQueryInterface`](/api/core/interfaces/query/)

<inline-notification type="tip">

This page has detailed API documentation for `<apollo-query>`. See the [`<apollo-query>` HTML Element guide](/guides/usage/queries/html/) for a HOW-TO guide.

</inline-notification>

## Live Demo

{{<docs-playground id="query-component" lang="html">}}
  {{<playground-file name="index.html" include="index.html" />}}
  {{<playground-file name="Friends.query.graphql" include="Friends.query.graphql" />}}

  {{<playground-file name="Friends.css" include="Friends.css" />}}

  {{<playground-file name="client.js" include="client.js" />}}
{{</docs-playground>}}