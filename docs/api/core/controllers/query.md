---
layout: sidebar.webc # layout-api
package: '@apollo-elements/core'
module: apollo-query-controller.js
description: Query Controller for Apollo Elements
title: ApolloQueryController
eleventyNavigation:
  order: 20
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

`ApolloQueryController` gets data from your GraphQL server. Pass it a GraphQL 
query, and any options you choose, and it will update its host when it's state 
(e.g. `data`, `error`, or `loading`) changes.

The (optional) third argument to the constructor is an 
[`ApolloQueryControllerOptions`](#options) object, with all properties optional. 
Pass a `fetchPolicy`, or `variables` to customize the query, `noAutoSubscribe: 
false` or a `shouldSubscribe` predicate function to prevent automatically 
fetching data, or `onData`/`onError` callbacks to run side-effects when the 
query resolves or errors.

<inline-notification type="tip">

Apollo Elements controllers are not limited to Lit. Use them with any object 
that [implements the `ReactiveControllerHost` 
interface](https://lit.dev/docs/composition/controllers/). See 
[`ControllerHostMixin`](/api/libraries/mixins/controller-host-mixin/) for an 
example.

</inline-notification>

<docs-playground id="query-controller"
    playground-name="query-controller"></docs-playground>

<cem-module package="@apollo-elements/core"
            module="apollo-query-controller.js">
</cem-module>
