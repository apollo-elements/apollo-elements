---
title: '`apollo-mutation` element'
permalink: /guides/usage/mutations/html/index.html
eleventyNavigation:
  order: 10
templateEngineOverride: webc,md
subtitle: "Using <apollo-mutation> element"
---

# apollo-mutation Element

<inline-notification type="tip">

This page is a HOW-TO guide. For detailed docs on the `<apollo-mutation>` 
element's API, see the [API docs](/api/components/apollo-mutation/)

</inline-notification>

This generic mutation component inherits 
[`ApolloMutation`](/api/core/interfaces/mutation/), so you can use it by 
assigning a mutation and some variables and calling it's `mutate()` method:

<code-copy>

  ```js
  const mutationElement = document.querySelector('apollo-mutation');
  mutationElement.mutation = gql`...`;
  mutationElement.variables = { /*...*/ };
  mutationElement.mutate();
  ```

</code-copy>

But it comes with some extras that let you define your operation declaratively 
right in the template. You can define the mutation variables in several ways:

- By assigning to the `variables` DOM property
- By adding a `<script type="application/json">` child element
- By defining data attributes (e.g. `data-foo="bar"` for variables `{ foo: 'bar' 
}`)
- By slotting in input-like elements with `data-variable="variableName"` 
attributes
- By listening for the `will-mutate` event and setting the `variables` property 
in the handler.

And when you slot in a button-like element with a `trigger` attribute, the 
element will mutate on click.

## Example: Mutate on click

Here we use `ApolloMutation`'s HTML API to define the mutation and variables. 
You can also use the JavaScript API.

<code-copy>

  ```html
  <apollo-mutation data-id="post-42" input-key="input">
    <label>New Title <input data-variable="title"/></label>
    <button trigger>Save</button>
    <script type="application/graphql">
    mutation UpdateTitle($input: UpdateTitleInput) {
      updateTitle(input: $input) {
        id title
      }
    }
    </ script>
  </apollo-mutation>
  ```

</code-copy>

## Example: Mutate on keyup

The `trigger` attribute can be a boolean attribute (with no value), in which 
case the element will trigger a mutation when it is clicked (or tapped, etc). If 
you set a value to the `trigger` attribute, that will be the event that triggers 
the mutation.

For example, set the `trigger` attribute to `keyup` on multiple variable inputs, 
you can mutate on keypress. If you do set the element to mutate on keyup, you 
might also want to 
[debounce](https://www.freecodecamp.org/news/javascript-debounce-example/) the 
mutation calls. Set the `debounce` attribute on the mutation element to define 
the debounce timeout in milliseconds.

The following example will update the user with id "007" once every 500 
milliseconds, starting the last time the user performed a 'keyup' (i.e. raised 
their finger) while focussed on one of the inputs.

<template webc:raw>

```html
<apollo-mutation data-user-id="007" debounce="500">
  <label>Name: <input data-variable="name" trigger="keyup"/></label>
  <label>Age:  <input data-variable="age" trigger="keyup" type="number"/></label>
  <script type="application/graphql">
    mutation UpdateUser($userId: ID!, $name: String, $age: Int) {
      updateUser(userId: $userId, name: $name, age: $age) {
        name
        age
      }
    }
  &lt;/script>
</apollo-mutation>
```

</template>

## Data Templates

Templates use [stampino](https://npm.im/stampino) and 
[jexpr](https://npm.im/jexpr) for efficiently updating data expressions. See 
their respective READMEs for more information.

<inline-notification type="tip">

`jexpr` expressions are like handlebars, nunjucks, polymer, etc. expressions. 
You can do most things you can do in JavaScript using `jexpr`. Try it out for 
yourself on the [Stampino 
REPL](https://github.com/justinfagnani/stampino/issues/14)

</inline-notification>

<docs-playground
    id="add-user"
    playground-name="add-user-html"></docs-playground>

<inline-notification type="tip">

When using shadow DOM templates, be sure you either add a `<slot>` element or 
use `variables-for` and `trigger-for` attribute on sibling nodes, so that your 
controls remain visible.

</inline-notification>

Learn more about template expressions and bindings in the [`<apollo-query>` HTML 
element guide](/guides/usage/queries/html/#template-expressions)

## Example: Conditionally Mutating

In some cases you might want to prevent a mutation, for example, if clicking the 
button is meant to create a new entity, but subsequently toggle it's edit state. 
For cases like those, listen for the `will-mutate` event and prevent it's 
default action to stop the mutation.

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">
  <template webc:raw>

  ```html
  <apollo-mutation>
    <button trigger>Publish</button>
    <script type="application/graphql">
      mutation CreatePost($input: CreatePostInput) {
        createPost(input: $input) {
          id
          body
          title
        }
      }
    </script>
  </apollo-mutation>

  <script>
    document.currentScript.getRootNode()
      .querySelector('apollo-mutation')
      .addEventListener('will-mutate', function onWillMutate(event) {
        onWillMutate(event) {
          // Post exists, don't mutate.
          // Toggle the host component's edit state instead.
          if (new URL(location.href).searchParams.has('postId')) {
            event.preventDefault();
            this.querySelector('[trigger]').textContent = 'Edit';
          }
        }
      });
  </script>
  ```

  </template>
  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```js
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
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
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

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
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
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```js
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

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```jsx
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

    return (
      <host>
        <apollo-mutation
            mutation={CreatePostMutation}
            onwill-mutate={onWillMutate}>
          <button>{postId ? 'Edit' : 'Publish'}</button>
        </apollo-mutation>
      </host>
    );
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```js
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

  </code-tab>
</code-tabs>

## Example: Navigating on Mutation

Consider the "create post" case from above. If you want to navigate to the new 
post's page after creating it, slot an anchor into the element's `trigger` and 
use the `href` attribute:


<code-copy>
  <template webc:raw>

  ```html
  <apollo-mutation href="/posts/latest/" input-key="input">
    <label>Title <input data-variable="title"/></label>
    <label>Body <textarea data-variable="body"></textarea></label>

    <a trigger href="/posts/latest/" tabindex="-1">
      <button>Create Post</button>
    </a>

    <script type="application/graphql">
    mutation CreatePost($input: CreatePostInput) {
      createPost(input: $input) { id title body }
    }
    </script>
  </apollo-mutation>
  ```

  </template>
</code-copy>


If the URL you want to navigate to depends on the new entity (e.g. a url slug 
for the post), set the `resolveURL` function property.


<code-copy>

  ```js
  const element = document.getElementById('create-post');
  element.resolveURL = data => `/posts/${data.createPost.slug}`;
  ```

</code-copy>


Alternatively, listen for the `will-navigate` event.

<code-copy>

  ```js
  element.href = '/posts/';
  element.addEventListener('will-navigate', event => {
    // Use your own client-side router.
    router.go(`/posts/${data.createPost.slug}`);
  });
  ```

</code-copy>

## Next Steps
- Read the [`<apollo-mutation>` API docs](/api/components/apollo-mutation/)
- Learn how to write [subscription components](/guides/usage/subscriptions/)
