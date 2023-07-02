---
title: Inline GraphQL Scripts
permalink: /guides/cool-tricks/inline-graphql-scripts/index.html
eleventyNavigation:
  order: 30
description: Use Apollo Elements to write declarative GraphQL components in HTML
---

You can provide a GraphQL document string in your markup. The declarative query, 
mutation, and subscription components all come with this built in.
By appending or updating a GraphQL script child, the Apollo element will read 
it's query document.

Add it to your custom components via the `graphql-script-child-mixin`.

## Example
Say you had a `<greet-me>` element which extends `ApolloQuery`.

<code-tabs collection="libraries" default-tab="lit">
  <code-tab tab-id="html" src="snippets/greet-me/html.html"></code-tab>
  <code-tab tab-id="mixins" src="snippets/greet-me/mixins.ts"></code-tab>
  <code-tab tab-id="lit" src="snippets/greet-me/lit.ts"></code-tab>
  <code-tab tab-id="fast" src="snippets/greet-me/fast.ts"></code-tab>
  <code-tab tab-id="haunted" src="snippets/greet-me/haunted.js"></code-tab>
  <code-tab tab-id="atomico" src="snippets/greet-me/atomico.jsx"></code-tab>
  <code-tab tab-id="hybrids" src="snippets/greet-me/hybrids.js"></code-tab>
</code-tabs>

You can add it to your page like so, and it will start querying.

<code-copy>

```html
<greet-me webc:raw>
  <script type="application/graphql">
    query Greeting {
      greeting {
        name
        greeting
      }
    }
  </script>
</greet-me>
```

</code-copy>
