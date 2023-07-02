---
title: Cache Management
permalink: /guides/usage/mutations/cache-management/index.html
eleventyNavigation:
  order: 20
templateEngineOverride: webc,md
description: Use Apollo Elements to manage the Apollo client cache after GraphQL mutations
---

# Cache Management

When defining components that issue graphql mutations, you may want to take 
control over how and when Apollo updates it's local cache. You can do this with 
the `updater` property on elements that extend from `ApolloMutation`

Say we had this mutation in `components/blog-post/BlogPost.mutation.graphql`:

<code-copy>

  ```graphql
  mutation BlogPostMutation($content: String) {
    postBlogPost(content: $content) {
      content
      datePosted
      summary
      url
    }
  }
  ```

</code-copy>

And this component definition:

<code-tabs collection="libraries" default-tab="lit">
  <code-tab tab-id="html" src="snippets/blogPost/html.html"></code-tab>
  <code-tab tab-id="mixins" src="snippets/blogPost/mixins.ts"></code-tab>
  <code-tab tab-id="lit" src="snippets/blogPost/lit.ts"></code-tab>
  <code-tab tab-id="fast" src="snippets/blogPost/fast.ts"></code-tab>
  <code-tab tab-id="haunted" src="snippets/blogPost/haunted.js"></code-tab>
  <code-tab tab-id="atomico" src="snippets/blogPost/atomico.jsx"></code-tab>
  <code-tab tab-id="hybrids" src="snippets/blogPost/hybrids.js"></code-tab>
</code-tabs>

This will set `data` on `blog-post` just fine, but let's say that you had a 
`<blog-snippets>` element which shows the latest posts with this query:

<code-copy>

  ```graphql
  query LatestPostsQuery {
    posts(limit: 10) {
      content
      datePosted
      summary
      url
    }
  }
  ```

</code-copy>

## Refetch Queries After Mutating
In that case, you could set the `refetchQueries` property on `<blog-post>` 
(either via the DOM, or using the `refetch-queries` attribute):

<code-copy>

  ```html
  <blog-post refetch-queries="LatestPosts"></blog-post>
  ```

</code-copy>

But that would mean an extra network round-trip that you might not need.

## Update the Cache Synchronously
Instead, you can define an `updater` method on `BlogPost` which instructs the 
apollo cache how to handle the results of the `BlogPostMutation`.

<code-tabs collection="libraries" default-tab="lit">
  <code-tab tab-id="html" src="snippets/updater/html.html"></code-tab>
  <code-tab tab-id="mixins" src="snippets/updater/mixins.ts"></code-tab>
  <code-tab tab-id="lit" src="snippets/updater/lit.ts"></code-tab>
  <code-tab tab-id="fast" src="snippets/updater/fast.ts"></code-tab>
  <code-tab tab-id="haunted" src="snippets/updater/haunted.js"></code-tab>
  <code-tab tab-id="atomico" src="snippets/updater/atomico.jsx"></code-tab>
  <code-tab tab-id="hybrids" src="snippets/updater/hybrids.js"></code-tab>
</code-tabs>

## Optimistic UI

The `summary`, `datePosted`, and `url` fields that `BlogPostMutation` returns in 
this example are calculated by the server. If we know what they will be (or can 
offer a pretty good guess) at the moment we send the mutation, we can 
"optimistically" update the UI by setting the `optimisticResponse` property on 
our element:

<code-tabs collection="libraries" default-tab="lit">
  <code-tab tab-id="html" src="snippets/optimistic/html.html"></code-tab>
  <code-tab tab-id="mixins" src="snippets/optimistic/mixins.ts"></code-tab>
  <code-tab tab-id="lit" src="snippets/optimistic/lit.ts"></code-tab>
  <code-tab tab-id="fast" src="snippets/optimistic/fast.ts"></code-tab>
  <code-tab tab-id="haunted" src="snippets/optimistic/haunted.js"></code-tab>
  <code-tab tab-id="atomico" src="snippets/optimistic/atomico.jsx"></code-tab>
  <code-tab tab-id="hybrids" src="snippets/optimistic/hybrids.js"></code-tab>
</code-tabs>

But what if the mutation fails? Apollo client's cache can roll back optimistic 
updates if the mutation fails. That way, as soon as the mutation is in flight, 
the cache will update once with the optimisticResponse, then if the mutation 
resolves, it will update again with the real data, and if the mutation rejects, 
it will roll the optimistic update back.
