---
title: ApolloQueryMixin
weight: 20
layout: layout-api
package: mixins
module: apollo-query-mixin.js
sidebar: api
---

<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->


`ApolloQueryMixin` applies `ApolloElementMixin` and the [`ApolloQueryInterface`](/api/core/interfaces/query/).

## Demo

{% set query %}<!-- TODO: Include file '../_assets/Launches.query.graphql' - needs Hugo shortcode or static asset -->{% endset %}
{% set style %}<!-- TODO: Include file '../_assets/SpacexLaunches.css' - needs Hugo shortcode or static asset -->{% endset %}

{{<docs-playground "mixins-query" "ts">}}
{{<include launches.js>}}
{{</docs-playground>}}

{{<playground-file "mixins-query" "index.html">}}
{{<include index.html>}}
{{</playground-file>}}

Read the [query component guides](../../../../guides/usage/queries/) for more examples and tips.
