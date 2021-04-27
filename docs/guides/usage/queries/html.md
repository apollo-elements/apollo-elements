# Usage >> Queries >> apollo-query Element || 20

Use the `<apollo-query>` element from `@apollo-elements/components` to write declarative query elements in HTML. You can mix-and-match these elements in your app, e.g. writing some query components using JavaScript and various web components libraries, and other components using `<apollo-query>` and HTML templates.

<inline-notification type="tip">

This page is a HOW-TO guide. For detailed docs on the `<apollo-query>` element's API, see the [API docs](/api/components/apollo-query/)

</inline-notification>

Templates use [stampino](https://npm.im/stampino) and [jexpr](https://npm.im/jexpr) for efficiently updating data expressions. See their respective READMEs for more information.

What that means is you can define the element's dynamic template using good-old HTML:

```html copy
<apollo-query>
  <script type="application/json">
    query Notifications {
      me { id name }
      notifications { href title }
    }
  </script>

  <template>
    <style>
      :host([loading]) {
        opacity: 0;
      }
    </style>

    <link rel="stylesheet" href="/components/notifications.css">

    <h2>Welcome, {%raw%}{{ data.me.name }}{%endraw%}!</h2>
    <p>You have {%raw%}{{ data.notifications.length }}{%endraw%} notifications.</p>
    <ol class="notifications-list">
      <template type="repeat" repeat="{%raw%}{{ data.notifications }}{%endraw%}">
        <li>
          <a href="{%raw%}{{ item.href }}{%endraw%}">{%raw%}{{ item.title }}{%endraw%}</a>
        </li>
      </template>
    <ol>
  </template>
</apollo-query>
```

## Template Expressions

`jexpr` expressions are like handlebars, nunjucks, polymer, etc. expressions. You can do most things you can do in JavaScript using `jexpr`. Read more at the [jexpr README](https://github.com/justinfagnani/jexpr) or try it out for yourself on the [Stampino REPL](https://github.com/justinfagnani/stampino/issues/14)

## Template Bindings
Template bindings follow similar conventions to [lit-html](https://lit.dev/guide/template-reference#binding-types). You can bind to nodes or element children, attributes, DOM properties, or even event listeners.

### Content Binding
Bind to element content by adding an expression as a child of the element.

```html
<apollo-query>
  <template>
    <samp>{%raw%}{{ data.content }}{%endraw%}<samp>
  </template>
</apollo-query>
```

### Attribute Binding
You can bind to attributes by adding an expression in an attribute position. For boolean attributes (where their presence indicates `true` and their absence `false`), prefix a `?` to the attribute name.

```html
<apollo-query>
  <template>
    <label>
      Message
      <input value="{%raw%}{{ data.message.content }}{%endraw%}"/>
    </label>
    <button ?hidden="{%raw%}{{ data.isEditing }}{%endraw%}">Edit</button>
  </template>
</apollo-query>
```

### Property Binding
Bind to DOM properties by prefixing `.` to the property name.
```html
<apollo-query>
  <template>
    <figure>
      <img .src="{%raw%}{{ data.user.avatar }}{%endraw%}" alt="avatar"/>
    </figure>
  </template>
</apollo-query>
```

### Event Binding
If you pass a method to your model (e.g. by passing extra model content in the element's `extras` DOM property), you can add event listeners to elements by prefixing `@` to the event name in an attribute position.

```html
<apollo-query>
  <template>
    <button @click="{%raw%}{{ onClick }}{%endraw%}">Ping</button>
  </template>
</apollo-query>

<script>
  {
    const queryEl = document.currentScript.getRootNode()
      .querySelector('apollo-query')
    queryEl.extras = {
      onClick(event) {
        fetch(`/ping?user=${queryEl.data.userId}`)
      }
    };
  }
</script>
```

## Custom Template Handlers
You can set the `templateHanders` property on an `<apollo-query>` element to customize rendering behaviour by adding your own custom template types.

<inline-notification type="warning">
  <p>The Stampino API is still undergoing revision. For advanced usages, we recommend writing a custom element class for now.</p>
</inline-notification>

```html
<apollo-query no-auto-subscribe>
  <template>
    <template type="flashy">
      <samp>{%raw%}{{ data.content }}{%endraw%}<samp>
    </template>
  </template>
</apollo-query>

<script>
(async function() {
  import('lit').then(({ html }) => {
    document.currentScript.getRootNode()
      .querySelector('apollo-query')
      .templateHandlers = {
        flashy(template, model, handlers, renderers) => {
          return html`
            <blink>
              ${evaluateTemplate(template, model, handlers, renderers)}
            </blink>
          `;
        },
      };

    document.currentScript.getRootNode()
      .querySelector('apollo-query')
      .subscribe();
  });
})();

</script>
```


## Next Steps
- Read the [`<apollo-query>` API docs](/api/components/apollo-query/)
- Learn how to write [mutation components](/guides/usage/mutations/)
