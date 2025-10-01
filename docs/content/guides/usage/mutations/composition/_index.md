---
title: "Composing Mutations and Queries"
sidebar: guides
weight: 30
---

Consider an "edit my profile" page in a typical web app. As the developer, you'll want to first fetch the user's profile (the query), display it in some pleasant page layout (the template), and offer controls to update profile fields like nickname or avatar (the mutation).

Combining queries with mutations in the same component like this is a common pattern. Apollo Elements provides some different ways to accomplish that goal. Let's take these GraphQL documents as an example and see how we can combine them on one page.

<style>
  #gql-documents {
    display: grid;
    gap: 12px 6px;
    grid-template: auto auto / auto;
  }

  #gql-documents pre {
    height: 100%;
  }

  @media (min-width: 600px) {
    #gql-documents {
      grid-template: auto / auto auto;
    }
  }
</style>

<div id="gql-documents">

```graphql copy
query ProfileQuery(
  $userId: ID!
) {
  profile(userId: $userId) {
    id
    name
    picture
    birthday
  }
}
```

```graphql copy
mutation UpdateProfileMutation(
  $input: UpdateProfileInput
) {
  updateProfile(input: $input) {
    id
    name
    picture
    birthday
  }
}
```

</div>

## Using `<apollo-mutation>`

<a hidden id="#example-edit-user-profile"></a>

Import the `<apollo-mutation>` element from `@apollo-elements/components` to write declarative mutations right in your template. In this way, we combine our query and mutation into a single component:

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}{{<include "apollo-mutation-html.html">}}{{</code-tab>}}
  {{<code-tab package="mixins">}}{{<include "apollo-mutation-mixins.ts">}}{{</code-tab>}}
  {{<code-tab package="lit">}}{{<include "apollo-mutation-lit.ts">}}{{</code-tab>}}
  {{<code-tab package="fast">}}{{<include "apollo-mutation-fast.ts">}}{{</code-tab>}}
  {{<code-tab package="haunted">}}{{<include "apollo-mutation-haunted.ts">}}{{</code-tab>}}
  {{<code-tab package="atomico">}}{{<include "apollo-mutation-atomico.tsx">}}{{</code-tab>}}
  {{<code-tab package="hybrids">}}{{<include "apollo-mutation-hybrids.ts">}}{{</code-tab>}}
</code-tabs>

Read more about the [`<apollo-mutation>` component](/api/components/apollo-mutation/).

## Using `ApolloMutationController`

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}{{<include "mutation-controller-html.html">}}{{</code-tab>}}
  {{<code-tab package="mixins">}}{{<include "mutation-controller-mixins.ts">}}{{</code-tab>}}
  {{<code-tab package="lit">}}{{<include "mutation-controller-lit.ts">}}{{</code-tab>}}
  {{<code-tab package="fast">}}{{<include "mutation-controller-fast.ts">}}{{</code-tab>}}
  {{<code-tab package="haunted">}}{{<include "mutation-controller-haunted.ts">}}{{</code-tab>}}
  {{<code-tab package="atomico">}}{{<include "mutation-controller-atomico.tsx">}}{{</code-tab>}}
  {{<code-tab package="hybrids">}}{{<include "mutation-controller-hybrids.ts">}}{{</code-tab>}}
</code-tabs>

Read more about [`ApolloMutationController`](/api/core/controllers/mutation/) in the API docs.
