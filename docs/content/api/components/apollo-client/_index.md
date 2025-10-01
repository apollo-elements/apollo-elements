---
title: apollo-client
weight: 10
description: Write declarative GraphQL mutations with &lt;apollo-client&gt; custom element. Connect all your Apollo Elements to an Apollo GraphQL client instance, no matter how deep they are in the shadow DOM.
layout: layout-api
package: components
module: apollo-client.js
sidebar: api
---

<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->


Use `<apollo-client>` for a declarative way to create a simple Apollo Client, or when you want to use a particular Apollo Client for a part of the DOM tree.

## Live Demo

Reuse the same query component for two different GraphQL endpoints.

{{<docs-playground id="client-component" lang="html">}}
  {{<playground-file name="index.html" include="index.html" />}}
  {{<playground-file name="introspection-queries.js" include="introspection-queries.js" />}}

  {{<playground-file name="introspection-queries.css" include="introspection-queries.css" />}}

  {{<playground-file name="IntrospectionQueries.query.graphql.js" include="IntrospectionQueries.query.graphql.js" />}}
{{</docs-playground>}}