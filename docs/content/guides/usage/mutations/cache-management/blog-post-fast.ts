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
