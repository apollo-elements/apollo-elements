import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

import HelloQuery from './Hello.query.graphql';

export class HelloQueryElement extends
ApolloQueryMixin(HTMLElement)<Data, Variables> {
  query = HelloQuery;

  static template = document.createElement('template');
  static {
    this.template.innerHTML = `
      <article class="skeleton">
        <p id="error" hidden></p>
        <p id="data"></p>
      </article>
    `;
    this.template.content.querySelector('#data').append(new Text('Hello'));
    this.template.content.querySelector('#data').append(new Text(', '));
    this.template.content.querySelector('#data').append(new Text('Friend'));
    this.template.content.querySelector('#data').append(new Text('!'));
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
      .append(HelloQueryElement.template.content.cloneNode(true));
    this.render();
  }

  $(selector) { return this.shadowRoot?.querySelector(selector); }

  #data: Data = null;
  get data() { return this.#data; }
  set data(value: Data) { this.#data = value; this.render(); }

  #loading = false;
  get loading() { return this.#loading; }
  set loading(value: boolean) { this.#loading = value; this.render(); }

  #error: Error | ApolloError = null;
  get error() { return this.#error; }
  set error(value: ApolloError) { this.#error = value; this.render(); }

  render() {
    if (this.loading)
      this.$('article').classList.add('skeleton');
    else
      this.$('article').classList.remove('skeleton');

    if (this.error) {
      this.$('#error').hidden = false;
      this.$('#error').textContent = this.error.message;
    } else {
      this.$('#error').hidden = true;
      const [greetingNode, , nameNode] = this.$('#data').childNodes;
      greetingNode.data = this.data?.hello?.greeting ?? 'Hello';
      nameNode.data = this.data?.hello?.name ?? 'Friend';
    }
  }
}

customElements.define('hello-query', HelloQueryElement);
