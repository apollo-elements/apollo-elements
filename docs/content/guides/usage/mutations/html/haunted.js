function PostsDashboard {
  const [postId, setPostId] = useState(undefined);
  const [editing, setEditing] = useState(false);

  function onWillMutate(event) {
    // Post exists, don't mutate.
    // Toggle the host component's edit state instead.
    if (postId) {
      event.preventDefault();
      setEditing(!editing);
    }
  }

  return html`
    <apollo-mutation
        .mutation="${CreatePostMutation}"
        @will-mutate="${onWillMutate}">
      <button>${postId ? 'Edit' : 'Publish'}</button>
    </apollo-mutation>
  `;
}
