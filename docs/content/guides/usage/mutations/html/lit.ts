class PostsDashboard extends LitElement {
  @property({ type: String }) postId;

  @property({ type: Boolean }) editing = false;

  onWillMutate(event) {
    // Post exists, don't mutate.
    // Toggle the host component's edit state instead.
    if (this.postId) {
      event.preventDefault();
      this.editing = !this.editing;
    }
  }

  render() {
    return html`
      <apollo-mutation
          .mutation="${CreatePostMutation}"
          @will-mutate="${this.onWillMutate}">
        <button>${this.postId ? 'Edit' : 'Publish'}</button>
      </apollo-mutation>
    `;
  }
}
