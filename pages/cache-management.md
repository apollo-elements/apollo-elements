<meta name="description" content="How to use Apollo Elements to manage the Apollo client cache after mutations"/>

When defining components that issue graphql mutations, you may want to take control over how and when Apollo updates it's local cache. You can do this with the `updater` property on elements that extend from `ApolloMutation`

Say we had this mutation in `components/blog-post/BlogPost.mutation.graphql`:

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

And this component definition in `components/blog-post/blog-post.ts`:

```ts
import type {
  BlogPostMutationData as Data,
  BlogPostMutationVariables as Variables
} from '../../codegen/operations';

import { render, html } from 'lit-html';
import { client } from './client';
import { ApolloMutation } from '@apollo-elements/lit-apollo';

import BlogPostMutation from './BlogPost.mutation.graphql';

@customElement('blog-post')
class BlogPost extends ApolloMutation<Data, Variables> {
  mutation = BlogPostMutation;

  @query('textarea') textarea: HTMLTextAreaElement;

  render() {
    return html`
      <loading-overlay ?active="${this.loading}"></loading-overlay>

      <label>New Post <textarea @input="${this.onInput}"></textarea></label>

      <button ?hidden="${this.data}" @click="${() => this.mutate()}">
        Post!
      </button>

      <article ?hidden="${!this.data}">
        <strong>Post Succeeded!</strong>
        <p>${this.data?.summary}</p>
      </article>
    `;
  }

  onInput(event) {
    const content = event.target.value;
    this.variables = { content };
  }

  onCompleted() {
    this.textarea.value = '';
  }
}
```

This will set `data` on `blog-post` just fine, but let's say that you had a `<blog-snippets>` element which shows the latest posts with this query:

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

## Refetch Queries After Mutating
In that case, you could set the `refetchQueries` property on `<blog-post>` (either via the DOM, or using the `refetch-queries` attribute):

```html
<blog-post refetch-queries="LatestPosts"></blog-post>
```

But that would mean an extra network round-trip that you might not need.

## Update the Cache Synchronously
Instead, you can define an `updater` method on `BlogPost` which instructs the apollo cache how to handle the results of the `BlogPostMutation`.

```ts
/**
 * update function which reads a cached query result, merges
 * it with the mutation result, and then writes it back to the cache.
 */
updater(proxy: DataProxy, result: FetchResult<Data>) {
  // 1: Read the cache synchronously to get the current list of posts
  const query = LatestPostsQuery;
  const cached = proxy.readQuery({ query: LatestPostsQuery });

  // 2: Calculate the expected result of LatestPostsQuery,
  //    considering the mutation result
  const data = { posts: [result.data.postBlogPost, ...cached.posts] }

  // 3: Perform the cache update by calling `writeQuery`
  cache.writeQuery({ query, data });
}
```

## Optimistic UI

The `summary`, `datePosted`, and `url` fields that `BlogPostMutation` returns in this example are calculated by the server. If we know what they will be (or can offer a pretty good guess) at the moment we send the mutation, we can "optimistically" update the UI by setting the `optimisticResponse` property on our element:
```ts
onInput(event) {
  const content = event.target.value;
  this.variables = { content };
  this.optimisticResponse = {
    postBlogPost: {
      __typename: 'BlogPost',
      url: '#',
      // implementation left as an exercise to the reader
      summary: summarize(content),
      datePosted: new Date().toISOString(),
      content,
    },
  }
}
```

But what if the mutation fails? Notice that the first argument to `updater` is `proxy`, which has all the same methods as the apollo cache, except it's proxied so that it can roll back optimistic updates if the mutation fails. That way, as soon as the mutation is in flight, the cache will update once with the optimisticResponse, then if the mutation resolves, it will update again with the real data, and if the mutation rejects, it will roll the optimistic update back.