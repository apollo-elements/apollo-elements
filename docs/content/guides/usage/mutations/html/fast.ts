const template: ViewTemplate<PostsDashboard> = html`
  <apollo-mutation
      .mutation="${x => CreatePostMutation}"
      @will-mutate="${(x, e) => x.onWillMutate(e)}">
    <fast-button>${x => x.postId ? 'Edit' : 'Publish'}</fast-button>
  </apollo-mutation>
`;
@customElement({ name: 'posts-dashboard', template })
class PostsDashboard extends FASTElement {
  onWillMutate(event) {
    // Post exists, don't mutate.
    // Toggle the host component's edit state instead.
    if (this.postId) {
      event.preventDefault();
      this.editing = !this.editing;
    }
  }
}
