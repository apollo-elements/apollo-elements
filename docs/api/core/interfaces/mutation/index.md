---
layout: sidebar.webc # layout-api
package: '@apollo-elements/core'
className: ApolloMutationElement
module: types.js
title: ApolloMutation
eleventyNavigation:
  order: 20
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

Mutation components affect your app's state by issuing mutations to the GraphQL 
server. Manage your cache by implementing an [updater](#updater) function, and 
provide the perception of performance with [Optimistic UI](#optimisticresponse).

Mutation components inherit the [ApolloElementInterface](../element/).
