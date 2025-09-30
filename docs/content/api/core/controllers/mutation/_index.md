---
title: "ApolloMutationController"
weight: 30
description: "Mutation Controller for Apollo Elements"
layout: "layout-api"
package: "core"
module: "apollo-mutation-controller.js"
sidebar: api
---

<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->


`ApolloMutationController` modifies data on your GraphQL server. Pass it a GraphQL mutation document, and any options you choose, and when you call its `mutate()` method, it will issue the mutation. It then updates its host when it's state (e.g. `data`, `error`, or `loading`) changes.

The (optional) third argument to the constructor is an [`ApolloMutationControllerOptions`](#options) object, which is the same as the `MutationOptions` parameter to `mutate()`, as well as `onComplete`/`onError` callbacks to run your side-effects, if you choose.

<inline-notification type="tip">

Apollo Elements controllers are not limited to Lit. Use them with any object that [implements the `ReactiveControllerHost` interface](https://lit.dev/docs/composition/controllers/). See [`ControllerHostMixin`](/api/libraries/mixins/controller-host-mixin/) for an example.

</inline-notification>

{{<docs-playground "mutation-controller" "ts">}}
{{<include add-user.ts>}}
{{</docs-playground>}}

{{<playground-file "mutation-controller" "index.html">}}
{{<include index.html>}}
{{</playground-file>}}

{{<playground-file "mutation-controller" "AddUser.mutation.graphql.ts">}}
{{<include AddUser.mutation.graphql.ts>}}
{{</playground-file>}}

{{<playground-file "mutation-controller" "client.js">}}
{{<include client.js>}}
{{</playground-file>}}
