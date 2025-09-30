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
