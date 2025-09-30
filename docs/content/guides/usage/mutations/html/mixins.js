const template = document.createElement('template');
template.innerHTML = `
  <apollo-mutation>
    <button>Publish</button>
  </apollo-mutation>
`;

class PostsDashboard extends HTMLElement {
  $(selector) { return this.shadowRoot.querySelector(selector); }

  editing = false;

  #postId;
  get postId() { return this.#postId; }
  set postId(v) {
    this.#postId = v;
    this.$('button').textContent = !!v ? 'Edit' : 'Publish';
  }

  constructor() {
    super();
    this
      .attachShadow({ mode: 'open' })
      .append(template.content.cloneNode(true));

    this.$('apollo-mutation').mutation = CreatePostMutation;
    this.$('apollo-mutation').addEventListener('will-mutate', this.onWillMutate.bind(this));
  }

  onWillMutate(event) {
    // Post exists, don't mutate.
    // Toggle the host component's edit state instead.
    if (this.postId) {
      event.preventDefault();
      this.editing = !this.editing;
    }
  }
}
