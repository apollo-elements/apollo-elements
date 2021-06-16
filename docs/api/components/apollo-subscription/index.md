---
layout: layout-api
package: '@apollo-elements/components'
templateEngineOverride: njk,md
module: apollo-subscription.js
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Components >> apollo-subscription || 30

`<apollo-subscription>` lets you query GraphQL without writing any JavaScript. Import the custom element then write your template, query, and variables in HTML. The element class inherits from [`ApolloSubscriptionInterface`](/api/core/interfaces/subscription/)

<inline-notification type="tip">

This page has detailed API documentation for `<apollo-subscription>`. See the [`<apollo-subscription>` HTML Element guide](/guides/usage/subscriptions/html/) for a HOW-TO guide.

</inline-notification>

## Live Demo

```html playground subscription-component index.html
<apollo-subscription>

  <script type="application/graphql">
    subscription NewMessages {
      newMessage {
        id
        message
        author {
          id
          name
          picture
        }
      }
    }
  </script>

  <template>
    <small><em>This demo is blocked by an <a target="_blank" rel="nofollow noreferer" href="https://github.com/apollographql/apollo-feature-requests/issues/299">issue in <code>SchemaLink</code></a>.</small>

    <sl-alert type="primary" duration="3000" closable open>
      <sl-icon slot="icon" name="info-circle"></sl-icon>
      <article>
        <img src="{%raw%}{{ data.newMessage.author.picture }}{%endraw%}"
             alt="{%raw%}{{ data.newMessage.author.name }}{%endraw%}"
             title="{%raw%}{{ data.newMessage.author.name }}{%endraw%}"/>
        <span>{%raw%}{{ data.newMessage.message }}{%endraw%}</span>
      </article>
    </sl-alert>
  </template>

</apollo-subscription>
```
