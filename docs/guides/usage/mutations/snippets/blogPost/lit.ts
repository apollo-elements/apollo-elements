import { ApolloMutationController } from '@apollo-elements/core';
import { LitElement, html } from 'lit';
import { query } from 'lit/decorators/query.js';

import { BlogPostMutation } from './BlogPost.mutation.graphql.js';

@customElement('blog-post')
class BlogPost extends LitElement {
  #mutation = new ApolloMutationController(this, BlogPostMutation, {
    onCompleted: () => this.textarea.value = '';
  });

  @query('textarea') textarea: HTMLTextAreaElement;

  render() {
    return html`
      <loading-overlay ?active="${this.#mutation.loading}"></loading-overlay>

      <label>New Post
        <textarea @input="${this.#onInput}"></textarea>
      </label>

      <button ?hidden="${this.#mutation.data}" @click="${() => this.#mutation.mutate()}">
        Post!
      </button>

      <article ?hidden="${!this.#mutation.data}">
        <strong>Post Succeeded!</strong>
        <p>${this.#mutation.data?.summary}</p>
      </article>
    `;
  }

  #onInput(event) {
    const content = event.target.value;
    this.#mutation.variables = { content };
  }
}
