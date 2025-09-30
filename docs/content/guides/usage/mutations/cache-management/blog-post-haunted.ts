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
