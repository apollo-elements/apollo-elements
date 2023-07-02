---
title: Composing Mutations and Queries
permalink: /guides/usage/mutations/composition/index.html
eleventyNavigation:
  order: 30
templateEngineOverride: webc,md
subtitle: "Using <apollo-mutation> element"
---

Consider an "edit my profile" page in a typical web app. As the developer, 
you'll want to first fetch the user's profile (the query), display it in some 
pleasant page layout (the template), and offer controls to update profile fields 
like nickname or avatar (the mutation).

Combining queries with mutations in the same component like this is a common 
pattern. Apollo Elements provides some different ways to accomplish that goal. 
Let's take these GraphQL documents as an example and see how we can combine them 
on one page.

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
  <code-copy>

  ```graphql
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

  </code-copy>
  <code-copy>

  ```graphql
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

  </code-copy>
</div>

## Using `<apollo-mutation>`

<a hidden id="#example-edit-user-profile"></a>

Import the `<apollo-mutation>` element from `@apollo-elements/components` to 
write declarative mutations right in your template. In this way, we combine our 
query and mutation into a single component:

<code-tabs collection="libraries" default-tab="lit">
  <code-tab tab-id="html" src="snippets/composition/html.html"></code-tab>
  <code-tab tab-id="mixins" src="snippets/composition/mixins.ts"></code-tab>
  <code-tab tab-id="lit" src="snippets/composition/lit.ts"></code-tab>
  <code-tab tab-id="fast" src="snippets/composition/fast.ts"></code-tab>
  <code-tab tab-id="haunted" src="snippets/composition/haunted.js"></code-tab>
  <code-tab tab-id="atomico" src="snippets/composition/atomico.jsx"></code-tab>
  <code-tab tab-id="hybrids" src="snippets/composition/hybrids.js"></code-tab>
</code-tabs>

Read more about the [`<apollo-mutation>` 
component](/api/components/apollo-mutation/).

## Using `ApolloMutationController`

<code-tabs collection="libraries" default-tab="lit">
  <code-tab tab-id="html" src="snippets/ApolloMutationController/html.html"></code-tab>
  <code-tab tab-id="mixins" src="snippets/ApolloMutationController/mixins.ts"></code-tab>
  <code-tab tab-id="lit" src="snippets/ApolloMutationController/lit.ts"></code-tab>
  <code-tab tab-id="fast" src="snippets/ApolloMutationController/fast.ts"></code-tab>
  <code-tab tab-id="haunted" src="snippets/ApolloMutationController/haunted.js"></code-tab>
  <code-tab tab-id="atomico" src="snippets/ApolloMutationController/atomico.jsx"></code-tab>
  <code-tab tab-id="hybrids" src="snippets/ApolloMutationController/hybrids.js"></code-tab>
</code-tabs>

Read more about [`ApolloMutationController`](/api/core/controllers/mutation/) in 
the API docs.
