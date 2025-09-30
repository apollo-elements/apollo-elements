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
