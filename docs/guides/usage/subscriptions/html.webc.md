---
title: "<apollo-subscription> element"
permalink: /guides/usage/subscriptions/html/index.html
eleventyNavigation:
  order: 20
templateEngineOverride: webc,md
description: Use Apollo Elements to write high-performance realtime GraphQL subscription components
---
Use the `<apollo-subscription>` element from `@apollo-elements/components` to 
write declarative subscription elements in HTML. You can mix-and-match these 
elements in your app, e.g. writing some subscription components using JavaScript 
and various web components libraries, and other components using 
`<apollo-subscription>` and HTML templates.

<inline-notification>

This page is a HOW-TO guide. For detailed docs on the `<apollo-subscription>` 
element's API, see the [API docs](/api/components/apollo-subscription/)

</inline-notification>

Templates use [stampino](https://npm.im/stampino) and 
[jexpr](https://npm.im/jexpr) for efficiently updating data expressions. See 
their respective READMEs for more information.

<inline-notification>

`jexpr` expressions are like handlebars, nunjucks, polymer, etc. expressions. 
You can do most things you can do in JavaScript using `jexpr`. Try it out for 
yourself on the [Stampino 
REPL](https://github.com/justinfagnani/stampino/issues/14)

</inline-notification>

What that means is you can define the element's dynamic template using good-old 
HTML:

<code-copy>
  <template webc:raw>

```html
<apollo-subscription>
  <script webc:keep type="application/json">
    subscription Notifications {
      newNotifications { href title }
    }
  </script>

  <template>
    <style>
      :host([loading]) {
        opacity: 0;
      }
    </script>

    <link rel="stylesheet" href="/components/notifications.css">

  </template>
</code-copy>

## Data Templates

Learn more about template expressions and bindings in the [`<apollo-query>` HTML 
element guide](/guides/usage/queries/html/#template-expressions)

## Next Steps
- Learn how to [manage client-side state using Apollo 
Elements](/guides/usage/local-state/)
