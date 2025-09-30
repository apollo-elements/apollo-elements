function onWillMutate(host, event) {
  // Post exists, don't mutate.
  // Toggle the host component's edit state instead.
  if (host.postId) {
    event.preventDefault();
    host.editing = !host.editing;
  }
}

define('posts-dashboard', {
  postId: property(),
  editing: property(false),
  render: host => html`
    <apollo-mutation
        mutation="${CreatePostMutation}"
        onwill-mutate="${onWillMutate}">
      <button>${host.postId ? 'Edit' : 'Publish'}</button>
    </apollo-mutation>
  `,
});
