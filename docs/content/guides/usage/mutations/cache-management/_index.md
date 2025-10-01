---
title: "Cache Management"
sidebar: guides
weight: 20
description: "Use Apollo Elements to manage the Apollo client cache after GraphQL mutations"
---

When defining components that issue graphql mutations, you may want to take control over how and when Apollo updates it's local cache. You can do this with the `updater` property on elements that extend from `ApolloMutation`

Say we had this mutation in `components/blog-post/BlogPost.mutation.graphql`:

```graphql copy
mutation BlogPostMutation($content: String) {
  postBlogPost(content: $content) {
    content
    datePosted
    summary
    url
  }
}
```

And this component definition:

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}
{{<include "blog-post-html.html">}}
{{</code-tab>}}
  {{<code-tab package="mixins">}}
{{<include "blog-post-mixins.ts">}}
{{</code-tab>}}
  {{<code-tab package="lit">}}
{{<include "blog-post-lit.ts">}}
{{</code-tab>}}
  {{<code-tab package="fast">}}
{{<include "blog-post-fast.ts">}}
{{</code-tab>}}
  {{<code-tab package="haunted">}}
{{<include "blog-post-haunted.ts">}}
{{</code-tab>}}
  {{<code-tab package="atomico">}}
{{<include "blog-post-atomico.tsx">}}
{{</code-tab>}}
  {{<code-tab package="hybrids">}}
{{<include "blog-post-hybrids.ts">}}
{{</code-tab>}}
</code-tabs>

This will set `data` on `blog-post` just fine, but let's say that you had a `<blog-snippets>` element which shows the latest posts with this query:

```graphql copy
query LatestPostsQuery {
  posts(limit: 10) {
    content
    datePosted
    summary
    url
  }
}
```

## Refetch Queries After Mutating
In that case, you could set the `refetchQueries` property on `<blog-post>` (either via the DOM, or using the `refetch-queries` attribute):

```html copy
<blog-post refetch-queries="LatestPosts"></blog-post>
```

But that would mean an extra network round-trip that you might not need.

## Update the Cache Synchronously
Instead, you can define an `updater` method on `BlogPost` which instructs the apollo cache how to handle the results of the `BlogPostMutation`.

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}
{{<include "cache-update-html.html">}}
{{</code-tab>}}
  {{<code-tab package="mixins">}}
{{<include "cache-update-mixins.ts">}}
{{</code-tab>}}
  {{<code-tab package="lit">}}
{{<include "cache-update-lit.ts">}}
{{</code-tab>}}
  {{<code-tab package="fast">}}
{{<include "cache-update-fast.ts">}}
{{</code-tab>}}
  {{<code-tab package="haunted">}}
{{<include "cache-update-haunted.ts">}}
{{</code-tab>}}
  {{<code-tab package="atomico">}}
{{<include "cache-update-atomico.tsx">}}
{{</code-tab>}}
  {{<code-tab package="hybrids">}}
{{<include "cache-update-hybrids.ts">}}
{{</code-tab>}}
</code-tabs>

## Optimistic UI

The `summary`, `datePosted`, and `url` fields that `BlogPostMutation` returns in this example are calculated by the server. If we know what they will be (or can offer a pretty good guess) at the moment we send the mutation, we can "optimistically" update the UI by setting the `optimisticResponse` property on our element:

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}
{{<include "optimistic-response-html.html">}}
{{</code-tab>}}
  {{<code-tab package="mixins">}}
{{<include "optimistic-response-mixins.ts">}}
{{</code-tab>}}
  {{<code-tab package="lit">}}
{{<include "optimistic-response-lit.ts">}}
{{</code-tab>}}
  {{<code-tab package="fast">}}
{{<include "optimistic-response-fast.ts">}}
{{</code-tab>}}
  {{<code-tab package="haunted">}}
{{<include "optimistic-response-haunted.ts">}}
{{</code-tab>}}
  {{<code-tab package="atomico">}}
{{<include "optimistic-response-atomico.tsx">}}
{{</code-tab>}}
  {{<code-tab package="hybrids">}}
{{<include "optimistic-response-hybrids.ts">}}
{{</code-tab>}}
</code-tabs>

But what if the mutation fails? Apollo client's cache can roll back optimistic updates if the mutation fails. That way, as soon as the mutation is in flight, the cache will update once with the optimisticResponse, then if the mutation resolves, it will update again with the real data, and if the mutation rejects, it will roll the optimistic update back.
