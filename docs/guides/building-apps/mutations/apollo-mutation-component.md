---
subtitle: "Using <apollo-mutation> element"
---

# Building Apps >> Mutations >> Using &lt;apollo-mutation&gt; Component || 20

This generic mutation component inherits [`ApolloMutation`](/api/interfaces/mutation/), so you can use it by assigning a mutation and some variables and calling it's `mutate()` method:

```js copy
const mutationElement = document.querySelector('apollo-mutation');
      mutationElement.mutation = gql`...`;
      mutationElement.variables = { /*...*/ };
      mutationElement.mutate();
```

But it comes with some extras that let you define your operation declaratively right in the template. You can define the mutation variables in several ways:

- By assigning to the `variables` DOM property
- By adding a `<script type="application/json">` child element
- By defining data attributes (e.g. `data-foo="bar"` for variables `{ foo: 'bar' }`)
- By slotting in input-like elements to the `variables` slots
- By listening for the `will-mutate` event and setting the `variables` property in the handler.

And when you slot in a button-like element to the `trigger` slot, the element will mutate on click.

## Example: Mutate on click

Here we use `ApolloMutation`'s HTML API to define the mutation and variables. You can also use the JavaScript API.

```html copy
<apollo-mutation data-id="post-42" input-key="input">
  <label slot="variable">New Title <input data-variable="title"/></label>
  <button slot="trigger">Save</button>
  <script type="application/graphql">
    mutation UpdateTitle($input: UpdateTitleInput) {
      updateTitle(input: $input) {
        id title
      }
    }
  </script>
</apollo-mutation>
```

## Example: Conditionally Mutating

In some cases you might want to prevent a mutation, for example, if clicking the button is meant to create a new entity, but subsequently toggle it's edit state. For cases like those, listen for the `will-mutate` event and prevent it's default action to stop the mutation.

<code-tabs collection="libraries" default-tab="lit">

  ```js tab mixins
  const template = document.createElement('template');
  template.innerHTML = `
    <apollo-mutation>
      <button>Publish</button>
    </apollo-mutation>
  `;

  class PostsDashboard extends HTMLElement {
    @property({ type: String }) postId;

    @property({ type: Boolean }) editing = false;

    $(selector) { return this.shadowRoot.querySelector(selector); }

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
  ```

  ```ts tab lit
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
  ```

  ```ts tab fast
  @customElement({
    name: 'posts-dashboard',
    template: html<PostsDashboard>`
      <apollo-mutation
          .mutation="${x => CreatePostMutation}"
          @will-mutate="${(x, e) => x.onWillMutate(e)}">
        <button>${x => x.postId ? 'Edit' : 'Publish'}</button>
      </apollo-mutation>
    `,
  })
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
  ```

  ```js tab haunted
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
  ```

  ```js tab hybrids
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
  ```

</code-tabs>

## Example: Navigating on Mutation

Consider the "create post" case from above. If you want to navigate to the new post's page after creating it, slot an anchor into the element's `trigger` and use the `href` attribute:

```html copy
<apollo-mutation href="/posts/latest/" input-key="input">
  <label slot="variable">Title <input data-variable="title"/></label>
  <label slot="variable">Body <textarea data-variable="body"></textarea></label>

  <a slot="trigger" href="/posts/latest/" tabindex="-1">
    <button>Create Post</button>
  </a>

  <script type="application/graphql">
    mutation CreatePost($input: CreatePostInput) {
      createPost(input: $input) { id title body }
    }
  </script>
</apollo-mutation>
```

If the URL you want to navigate to depends on the new entity (e.g. a url slug for the post), set the `resolveURL` function property.

```js copy
const element = document.getElementById('create-post');
element.resolveURL = data => `/posts/${data.createPost.slug}`;
```

Alternatively, listen for the `will-navigate` event.

```js copy
element.href = '/posts/';
element.addEventListener('will-navigate', event => {
  // Use your own client-side router.
  router.go(`/posts/${data.createPost.slug}`);
});
```
