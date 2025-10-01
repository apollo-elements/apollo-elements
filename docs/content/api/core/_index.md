---
title: Core
weight: 10
description: Core Controllers for Apollo Elements
layout: layout-api-index
package: "'@apollo-elements/core'"
sidebar: api
---

The core of Apollo Elements is a set of JavaScript classes that implement the [ReactiveController](https://lit.dev/docs/composition/controllers/) interface. This means that the essential operating logic of queries, mutations, and subscriptions is encapsulated in independent objects, and that elements implementing `ReactiveControllerHost` (e.g. [LitElement](https://lit.dev/docs/components/overview/)) work with them straight-away. Apollo Element is more than just "Apollo for Lit", though - the core classes form the basis for all our framework integrations, from [custom element mixins](../libraries/mixins/), to [hybrids descriptor factories](../libraries/hybrids/), to [haunted hooks](../libraries/haunted/).

This also introduces a separation between GraphQL operations (like queries or mutations) and the web components which host them. Previous versions of Apollo Elements strongly tied each GraphQL document to a single custom element, meaning if you wanted to have several queries in one component, the component either needed to define those queries as children, or combine the queries into a single document.

<code-tabs collection="package-managers" default-tab="npm">
  {{<code-tab package="npm">}}npm i -S @apollo-elements/core{{</code-tab>}}
  {{<code-tab package="yarn">}}yarn add @apollo-elements/core{{</code-tab>}}
  {{<code-tab package="pnpm">}}pnpm add @apollo-elements/core{{</code-tab>}}
</code-tabs>

{{<docs-playground id="controller-host" lang="ts">}}
  {{<playground-file name="profile-home.ts" include="profile-home.ts" />}}
  {{<playground-file name="index.html" include="index.html" />}}

  {{<playground-file name="Profile.query.graphql.ts" include="Profile.query.graphql.ts" />}}

  {{<playground-file name="UpdateProfile.mutation.graphql.ts" include="UpdateProfile.mutation.graphql.ts" />}}

  {{<playground-file name="FriendCameOnline.subscription.graphql.ts" include="FriendCameOnline.subscription.graphql.ts" />}}

  {{<playground-file name="client.js" include="client.js" />}}
{{</docs-playground>}}