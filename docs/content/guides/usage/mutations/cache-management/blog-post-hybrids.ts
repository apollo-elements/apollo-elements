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
