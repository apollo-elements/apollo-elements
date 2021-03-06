---
description: Use Apollo Elements to manage the Apollo client cache after GraphQL mutations
---

# Building Apps >> Mutations >> Cache Management || 20

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

And this component definition in `components/blog-post/blog-post.ts`:

<code-tabs collection="libraries" default-tab="lit">

  ```ts tab mixins
  import type {
    BlogPostMutationData as Data,
    BlogPostMutationVariables as Variables
  } from '../../codegen/operations';

  import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation/mixin';

  import BlogPostMutation from './BlogPost.mutation.graphql';

  const template = document.createElement('template');
  template.innerHTML = `
    <loading-overlay></loading-overlay>

    <label>New Post <textarea></textarea></label>

    <button>Post!</button>

    <article>
      <strong>Post Succeeded!</strong>
      <p></p>
    </article>
  `;

  class BlogPost extends ApolloMutationMixin(HTMLElement)<Data, Variables> {
    mutation = BlogPostMutation;

    @query('textarea') textarea: HTMLTextAreaElement;

    $(selector) { return this.shadowRoot.querySelector(selector); }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      this.$('textarea').addEventListener('input', this.onInput.bind(this));
      this.$('button').addEventListener('click', () => mutate());
    }

    render() {
      if (this.loading)
        this.$('loading-overlay').setAttribute('active', '');
      else
        this.$('loading-overlay').removeAttribute('active');
      this.$('button').hidden = !!this.data;
      this.$('article').hidden = !this.data;
      this.$('article p').textContent = this.data?.summary;
    }

    onInput(event) {
      const content = event.target.value;
      this.variables = { content };
    }

    onCompleted() {
      this.$('textarea').value = '';
    }
  }

  customElements.define('blog-post', BlogPost);
  ```

  ```ts tab lit
  import type {
    BlogPostMutationData as Data,
    BlogPostMutationVariables as Variables
  } from '../../codegen/operations';

  import { ApolloMutation, html } from '@apollo-elements/lit-apollo';

  import BlogPostMutation from './BlogPost.mutation.graphql';

  @customElement('blog-post')
  class BlogPost extends ApolloMutation<Data, Variables> {
    mutation = BlogPostMutation;

    @query('textarea') textarea: HTMLTextAreaElement;

    render() {
      return html`
        <loading-overlay ?active="${this.loading}"></loading-overlay>

        <label>New Post
          <textarea @input="${this.onInput}"></textarea>
        </label>

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

  ```ts tab fast
  import type {
    BlogPostMutationData as Data,
    BlogPostMutationVariables as Variables
  } from '../../codegen/operations';

  import { ApolloMutation, html, ref } from '@apollo-elements/fast';

  import BlogPostMutation from './BlogPost.mutation.graphql';

  const name = 'blog-post';

  const template = html<BlogPost>`
    <loading-overlay ?active="${x => x.loading}"></loading-overlay>

    <label> New Post
      <textarea ${ref('textarea')}
          @input="${(x, { event }) => x.onInput(event)}"></textarea>
    </label>

    <button ?hidden="${x => x.data}" @click="${x => x.mutate()}">
      Post!
    </button>

    <article ?hidden="${x => !x.data}">
      <strong>Post Succeeded!</strong>
      <p>${x => x.data?.summary}</p>
    </article>
  `;
  @customElement({ name, template })
  class BlogPost extends ApolloMutation<Data, Variables> {
    static readonly is = name;

    declare textarea: HTMLTextAreaElement;

    mutation = BlogPostMutation;

    onInput(event) {
      const content = event.target.value;
      this.variables = { content };
    }

    onCompleted() {
      this.textarea.value = '';
    }
  }
  ```

  ```ts tab haunted
  import type {
    BlogPostMutationData as Data,
    BlogPostMutationVariables as Variables
  } from '../../codegen/operations';

  import { useMutation, useState, component, html } from '@apollo-elements/haunted';

  import BlogPostMutation from './BlogPost.mutation.graphql';

  function BlogPost(el) {
    const [content, setContent] = useState('');

    const [addBlogPost, { data, loading }] =
      useMutation<Data, Variables>(BlogPostMutation, {
        onCompleted: () => setContent(''),
      });

    const variables = { content };

    return html`
      <loading-overlay ?active="${loading}"></loading-overlay>

      <label>New Post
        <textarea @input="${e => setContent(e.target.value)}"></textarea>
      </label>

      <button
          ?hidden="${!!data}"
          @click="${() => addBlogPost({ variables })}"
      >Post!</button>

      <article ?hidden="${!data}">
        <strong>Post Succeeded!</strong>
        <p>${data?.summary}</p>
      </article>
    `;
  }

  customElements.define('blog-post', component(BlogPost));
  ```

  ```ts tab hybrids
  import type {
    BlogPostMutationData as Data,
    BlogPostMutationVariables as Variables
  } from '../../codegen/operations';

  import { client, mutation, define, html } from '@apollo-elements/fast';

  import BlogPostMutation from './BlogPost.mutation.graphql';

  const name = 'blog-post';

  function onInput(host, event) {
    const content = event.target.value;
    host.variables = { content };
  }

  async function mutate(host) {
    try {
      host.mutate();
    } finally {
      host.textarea.value = '';
    }
  }

  define(name, {
    client: client(window.__APOLLO_CLIENT__),
    mutation: mutation(BlogPostMutation),
    render: ({ loading, data }) => html`
      <loading-overlay ?active="${loading}"></loading-overlay>

      <label>
        New Post <textarea ${ref('textarea')}
            @input="${onInput}"></textarea>
      </label>

      <button ?hidden="${data}" @click="${mutate}">
        Post!
      </button>

      <article ?hidden="${!data}">
        <strong>Post Succeeded!</strong>
        <p>${data?.summary}</p>
      </article>
    `
  });
  ```

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

  ```ts tab mixins
  /**
   * update function which reads a cached query result, merges
   * it with the mutation result, and then writes it back to the cache.
   */
  updater(
    cache: ApolloCache<NormalizedCacheObject>,
    result: FetchResult<Data>
  ) {
    // 1: Read the cache synchronously to get the current list of posts
    const query = LatestPostsQuery;
    const cached = cache.readQuery({ query: LatestPostsQuery });

    // 2: Calculate the expected result of LatestPostsQuery,
    //    considering the mutation result
    const data = { posts: [result.data.postBlogPost, ...cached.posts] }

    // 3: Perform the cache update by calling `writeQuery`
    cache.writeQuery({ query, data });
  }
  ```

  ```ts tab lit
  /**
   * update function which reads a cached query result, merges
   * it with the mutation result, and then writes it back to the cache.
   */
  updater(
    cache: ApolloCache<NormalizedCacheObject>,
    result: FetchResult<Data>
  ) {
    // 1: Read the cache synchronously to get the current list of posts
    const query = LatestPostsQuery;
    const cached = cache.readQuery({ query: LatestPostsQuery });

    // 2: Calculate the expected result of LatestPostsQuery,
    //    considering the mutation result
    const data = { posts: [result.data.postBlogPost, ...cached.posts] }

    // 3: Perform the cache update by calling `writeQuery`
    cache.writeQuery({ query, data });
  }
  ```

  ```ts tab fast
  /**
   * update function which reads a cached query result, merges
   * it with the mutation result, and then writes it back to the cache.
   */
  updater(
    cache: ApolloCache<NormalizedCacheObject>,
    result: FetchResult<Data>
  ) {
    // 1: Read the cache synchronously to get the current list of posts
    const query = LatestPostsQuery;
    const cached = cache.readQuery({ query: LatestPostsQuery });

    // 2: Calculate the expected result of LatestPostsQuery,
    //    considering the mutation result
    const data = { posts: [result.data.postBlogPost, ...cached.posts] }

    // 3: Perform the cache update by calling `writeQuery`
    cache.writeQuery({ query, data });
  }
  ```

  ```ts tab haunted
  /**
   * update function which reads a cached query result, merges
   * it with the mutation result, and then writes it back to the cache.
   */
  function update(
    cache: ApolloCache<NormalizedCacheObject>,
    result: FetchResult<Data>
  ) {
    // 1: Read the cache synchronously to get the current list of posts
    const query = LatestPostsQuery;
    const cached = cache.readQuery({ query: LatestPostsQuery });

    // 2: Calculate the expected result of LatestPostsQuery,
    //    considering the mutation result
    const data = { posts: [result.data.postBlogPost, ...cached.posts] }

    // 3: Perform the cache update by calling `writeQuery`
    cache.writeQuery({ query, data });
  }

  function BlogPost() {
    const [content, setContent] = useState('');

    const [addBlogPost, { data, loading }] =
      useMutation<Data, Variables>(BlogPostMutation, {
        onCompleted: () => setContent(''),
        update,
      });

    return html`...`;
  }
  ```

  ```ts tab hybrids
  /**
   * update function which reads a cached query result, merges
   * it with the mutation result, and then writes it back to the cache.
   */
  function update(
    cache: ApolloCache<NormalizedCacheObject>,
    result: FetchResult<Data>
  ) {
    // 1: Read the cache synchronously to get the current list of posts
    const query = LatestPostsQuery;
    const cached = cache.readQuery({ query: LatestPostsQuery });

    // 2: Calculate the expected result of LatestPostsQuery,
    //    considering the mutation result
    const data = { posts: [result.data.postBlogPost, ...cached.posts] }

    // 3: Perform the cache update by calling `writeQuery`
    cache.writeQuery({ query, data });
  }

  async function mutate(host) {
    try {
      host.mutate({ update });
    } finally {
      host.textarea.value = '';
    }
  }

  ```

</code-tabs>

## Optimistic UI

The `summary`, `datePosted`, and `url` fields that `BlogPostMutation` returns in this example are calculated by the server. If we know what they will be (or can offer a pretty good guess) at the moment we send the mutation, we can "optimistically" update the UI by setting the `optimisticResponse` property on our element:

<code-tabs collection="libraries" default-tab="lit">

  ```ts tab mixins
  onInput(event: KeyboardEvent & { target: HTMLTextareaElement }) {
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

  ```ts tab lit
  onInput(event: KeyboardEvent & { target: HTMLTextareaElement }) {
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

  ```ts tab fast
  onInput(event: KeyboardEvent & { target: HTMLTextareaElement }) {
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

  ```ts tab haunted
  function BlogPost(el) {
    const [datePosted, setDatePosted] = useState(new Date().toISOString());
    const [content, setContent] = useState('');

    const optimistic = {
      postBlogPost: {
        __typename: 'BlogPost',
        url: '#',
        // implementation left as an exercise to the reader
        summary: summarize(content),
        datePosted,
        content,
      },
    };

    const [addBlogPost, { data, loading }] =
      useMutation<Data, Variables>(BlogPostMutation, {
        onCompleted: () => setContent(''),
        update,
        optimisticResponse,
      });

    const variables = { content };

    return html`
      <loading-overlay ?active="${loading}"></loading-overlay>

      <label>New Post <textarea @input="${e => setContent(e.target.value)}"></textarea></label>

      <button
          ?hidden="${!!data}"
          @click="${() => {
            setDatePosted(new Date().toISOString());
            addBlogPost({ variables });
          }}"
      >Post!</button>

      <article ?hidden="${!data}">
        <strong>Post Succeeded!</strong>
        <p>${data?.summary}</p>
      </article>
    `;
  }
  ```

  ```ts tab hybrids
  function onInput(
    host: HTMLElement & ApolloMutationInterface<Data, Variables>,
    event: KeyboardEvent & { target: HTMLTextareaElement },
  ) {
    const content = event.target.value;
    host.variables = { content };
    host.optimisticResponse = {
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

</code-tabs>

But what if the mutation fails? Apollo client's cache can roll back optimistic updates if the mutation fails. That way, as soon as the mutation is in flight, the cache will update once with the optimisticResponse, then if the mutation resolves, it will update again with the real data, and if the mutation rejects, it will roll the optimistic update back.
