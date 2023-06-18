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
  <code-tab @tab="$data.codeTabs.html">

  ```html
  <apollo-mutation>
    <template>
      <loading-overlay ?active="{%raw%}{{ loading }}{%endraw%}"></loading-overlay>

      <label>New Post <textarea data-variable="content"></textarea></label>

      <button ?hidden="{%raw%}{{ data }}{%endraw%}" trigger>Post!</button>

      <article ?hidden="{%raw%}{{ !data }}{%endraw%}">
        <strong>Post Succeeded!</strong>
        <p>{%raw%}{{ data.summary }}{%endraw%}</p>
      </article>
    </template>
  </apollo-mutation>
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
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

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  import { ApolloMutationController } from '@apollo-elements/core';
  import { LitElement, html } from 'lit';

  import { BlogPostMutation } from './BlogPost.mutation.graphql';

  @customElement('blog-post')
  class BlogPost extends LitElement {
    mutation = new ApolloMutationController(this, BlogPostMutation, {
      onCompleted: () => this.textarea.value = '';
    });

    @query('textarea') textarea: HTMLTextAreaElement;

    render() {
      return html`
        <loading-overlay ?active="${this.mutation.loading}"></loading-overlay>

        <label>New Post
          <textarea @input="${this.onInput}"></textarea>
        </label>

        <button ?hidden="${this.mutation.data}" @click="${() => this.mutation.mutate()}">
          Post!
        </button>

        <article ?hidden="${!this.mutation.data}">
          <strong>Post Succeeded!</strong>
          <p>${this.mutation.data?.summary}</p>
        </article>
      `;
    }

    onInput(event) {
      const content = event.target.value;
      this.mutation.variables = { content };
    }
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  import { FASTElement, html, ref, ViewTemplate } from '@microsoft/fast-element';
  import { ApolloMutationBehavior } from '@apollo-elements/fast';

  import { BlogPostMutation } from './BlogPost.mutation.graphql';

  const name = 'blog-post';

  const template: ViewTemplate<BlogPost> = html`
    <loading-overlay ?active="${x => x.mutation.loading}"></loading-overlay>

    <fast-text-area ${ref('textarea')} @input="${(x, { event }) => x.onInput(event)}">
      New Post
    </fast-text-area>

    <fast-button ?hidden="${x => x.mutation.data}" @click="${x => x.mutate()}">
      Post!
    </fast-button>

    <article ?hidden="${x => !x.mutation.data}">
      <strong>Post Succeeded!</strong>
      <p>${x => x.mutation.data?.summary}</p>
    </article>
  `;
  @customElement({ name, template })
  class BlogPost extends FASTElement {
    static readonly is = name;

    declare textarea: HTMLTextAreaElement;

    mutation = new ApolloMutationBehavior(this, BlogPostMutation, {
      onCompleted: () => {
        this.textarea.value = '';
      },
    });

    onInput(event) {
      const content = event.target.value;
      this.variables = { content };
    }
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  import { useMutation, useState, component, html } from '@apollo-elements/haunted';

  import { BlogPostMutation } from './BlogPost.mutation.graphql';

  function BlogPost() {
    const [content, setContent] = useState('');

    const [addBlogPost, { data, loading }] =
      useMutation(BlogPostMutation, {
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

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```tsx
  import { useMutation, useState, c } from '@apollo-elements/atomico';

  import { BlogPostMutation } from './BlogPost.mutation.graphql';

  function BlogPost() {
    const [content, setContent] = useState('');

    const [addBlogPost, { data, loading }] =
      useMutation(BlogPostMutation, {
        onCompleted: () => setContent(''),
      });

    const variables = { content };

    return (
      <host shadowDom>
        <loading-overlay active={loading}></loading-overlay>
        <label>New Post
          <textarea oninput={e => setContent(e.target.value)}></textarea>
        </label>
        <button
            hidden={!!data}
            onclick={() => addBlogPost({ variables })}
        >Post!</button>
        <article hidden={!data}>
          <strong>Post Succeeded!</strong>
          <p>{data?.summary}</p>
        </article>
      </host>
    );
  }

  customElements.define('blog-post', c(BlogPost));
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  import { mutation, define, html } from '@apollo-elements/fast';

  import { BlogPostMutation } from './BlogPost.mutation.graphql';

  const name = 'blog-post';

  function onInput(host, event) {
    const content = event.target.value;
    host.mutation.variables = { content };
  }

  async function mutate(host) {
    try {
      host.mutation.mutate();
    } finally {
      host.textarea.value = '';
    }
  }

  define(name, {
    mutation: mutation(BlogPostMutation),
    render: ({ mutation: { loading, data } }) => html`
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

  </code-tab>
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
  <code-tab @tab="$data.codeTabs.html">

  ```html
  <script>
    document.currentScript.getRootNode()
      .querySelector('apollo-mutation')
      .updater = function updater(cache, result) {
        // 1: Read the cache synchronously to get the current list of posts
        const query = LatestPostsQuery;
        const cached = cache.readQuery({ query: LatestPostsQuery });

        // 2: Calculate the expected result of LatestPostsQuery,
        //    considering the mutation result
        const data = { posts: [result.data.postBlogPost, ...cached.posts] }

        // 3: Perform the cache update by calling `writeQuery`
        cache.writeQuery({ query, data });
      };
  </script>
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
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

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  mutation = new ApolloMutationController(this, BlogPostMutation, {
    /**
     * update function which reads a cached query result, merges
     * it with the mutation result, and then writes it back to the cache.
     */
    update(
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
  })
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  mutation = new ApolloMutationBehavior(this, BlogPostMutation, {
    /**
     * update function which reads a cached query result, merges
     * it with the mutation result, and then writes it back to the cache.
     */
    update(
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
  });
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  import type { ResultOf } from '@graphql-typed-document-node/core';
  /**
   * update function which reads a cached query result, merges
   * it with the mutation result, and then writes it back to the cache.
   */
  function update(
    cache: ApolloCache<NormalizedCacheObject>,
    result: FetchResult<ResultOf<typeof BlogPostMutation>>
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
      useMutation(BlogPostMutation, {
        onCompleted: () => setContent(''),
        update,
      });

    return html`...`;
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```tsx
  import type { ResultOf } from '@graphql-typed-document-node/core';
  /**
   * update function which reads a cached query result, merges
   * it with the mutation result, and then writes it back to the cache.
   */
  function update(
    cache: ApolloCache<NormalizedCacheObject>,
    result: FetchResult<ResultOf<typeof BlogPostMutation>>
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
      useMutation(BlogPostMutation, {
        onCompleted: () => setContent(''),
        update,
      });

    return <host>...</host>;
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  define('blog-post', {
    mutation: mutation(BlogPostMutation, {
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
    }),
  })
  ```

  </code-tab>
</code-tabs>

## Optimistic UI

The `summary`, `datePosted`, and `url` fields that `BlogPostMutation` returns in 
this example are calculated by the server. If we know what they will be (or can 
offer a pretty good guess) at the moment we send the mutation, we can 
"optimistically" update the UI by setting the `optimisticResponse` property on 
our element:

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">

  ```html
  <script>
    document.currentScript.getRootNode()
      .querySelector('apollo-mutation')
      .optimisticResponse = variables => ({
        postBlogPost: {
          __typename: 'BlogPost',
          url: '#',
          // implementation left as an exercise to the reader
          summary: summarize(variables.content),
          datePosted: new Date().toISOString(),
          content,
        },
      });
  </script>
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
  optimisticResponse = variables => ({
    postBlogPost: {
      __typename: 'BlogPost',
      url: '#',
      // implementation left as an exercise to the reader
      summary: summarize(variables.content),
      datePosted: new Date().toISOString(),
      content,
    },
  });
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  mutation = new ApolloMutationController(this, BlogPostMutation, {
    optimisticResponse: variables => ({
      postBlogPost: {
        __typename: 'BlogPost',
        url: '#',
        // implementation left as an exercise to the reader
        summary: summarize(variables.content),
        datePosted: new Date().toISOString(),
        content,
      },
    }),
  });
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  mutation = new ApolloMutationBehavior(this, BlogPostMutation, {
    optimisticResponse: variables => ({
      postBlogPost: {
        __typename: 'BlogPost',
        url: '#',
        // implementation left as an exercise to the reader
        summary: summarize(variables.content),
        datePosted: new Date().toISOString(),
        content,
      },
    }),
  });
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  function BlogPost() {
    const [datePosted, setDatePosted] = useState(new Date().toISOString());
    const [content, setContent] = useState('');

    const [addBlogPost, { data, loading }] =
      useMutation<Data, Variables>(BlogPostMutation, {
        onCompleted: () => setContent(''),
        update,
        optimisticResponse: variables => ({
          postBlogPost: {
            __typename: 'BlogPost',
            url: '#',
            // implementation left as an exercise to the reader
            summary: summarize(variables.content),
            datePosted,
            content,
          },
        }),
      });

    const variables = { content };

    return html`
      <loading-overlay ?active="${loading}"></loading-overlay>

      <label>New Post textarea @input="${e => setContent(e.target.value)}"</textarea></label>

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

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```ts
  function BlogPost() {
    const [datePosted, setDatePosted] = useState(new Date().toISOString());
    const [content, setContent] = useState('');

    const [addBlogPost, { data, loading }] =
      useMutation<Data, Variables>(BlogPostMutation, {
        onCompleted: () => setContent(''),
        update,
        optimisticResponse: variables => ({
          postBlogPost: {
            __typename: 'BlogPost',
            url: '#',
            // implementation left as an exercise to the reader
            summary: summarize(variables.content),
            datePosted,
            content,
          },
        }),
      });

    const variables = { content };

    return html`
      <loading-overlay active="${loading}"></loading-overlay>

      <label>New Post textarea oninput="${e => setContent(e.target.value)}"</textarea></label>

      <button
          hidden="${!!data}"
          onclick="${() => {
            setDatePosted(new Date().toISOString());
            addBlogPost({ variables });
          }}"
      >Post!</button>

      <article hidden="${!data}">
        <strong>Post Succeeded!</strong>
        <p>${data?.summary}</p>
      </article>
    `;
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  define(name, {
    mutation: mutation(BlogPostMutation, {
      optimisticResponse: variables => ({
        postBlogPost: {
          __typename: 'BlogPost',
          url: '#',
          // implementation left as an exercise to the reader
          summary: summarize(variables.content),
        },
      }),
    }),
  });
  ```

  </code-tab>
</code-tabs>

But what if the mutation fails? Apollo client's cache can roll back optimistic 
updates if the mutation fails. That way, as soon as the mutation is in flight, 
the cache will update once with the optimisticResponse, then if the mutation 
resolves, it will update again with the real data, and if the mutation rejects, 
it will roll the optimistic update back.
