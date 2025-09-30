---
title: "ReactiveVariableController"
weight: 100
description: "Reactive Variable Controller for Apollo Elements"
layout: "layout-api"
package: "core"
module: "reactive-variable-controller.js"
sidebar: api
---

<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->


`ReactiveVariableController` is a convenience wrapper around [apollo reactive variables](https://www.apollographql.com/docs/react/local-state/reactive-variables/).

<inline-notification type="tip">

Apollo Elements controllers are not limited to Lit. Use them with any object that [implements the `ReactiveControllerHost` interface](https://lit.dev/docs/composition/controllers/). See [`ControllerHostMixin`](/api/libraries/mixins/controller-host-mixin/) for an example.

</inline-notification>

{{<docs-playground "reactive-variable-controller" "ts">}}
{{<include profile-page.ts>}}
{{</docs-playground>}}

{{<playground-file "reactive-variable-controller" "profile-page.css.ts">}}
{{<include profile-page.css.ts>}}
{{</playground-file>}}

{{<playground-file "reactive-variable-controller" "index.html">}}
{{<include index.html>}}
{{</playground-file>}}

{{<playground-file "reactive-variable-controller" "router.ts">}}
{{<include router.ts>}}
{{</playground-file>}}
