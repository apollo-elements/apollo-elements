---
title: Inline GraphQL Scripts
weight: 30
sidebar: guides
---

<meta name="description" data-helmett
      content="Use Apollo Elements to write declarative GraphQL components in HTML" />

You can provide a GraphQL document string in your markup. The declarative query, mutation, and subscription components all come with this built in.
By appending or updating a GraphQL script child, the Apollo element will read it's query document.

Add it to your custom components via the `graphql-script-child-mixin`.

## Example
Say you had a `<greet-me>` element which extends `ApolloQuery`.

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}} {{<include greet-me-html.html>}} {{</code-tab>}}
  {{<code-tab package="mixins">}} {{<include greet-me-mixins.ts>}} {{</code-tab>}}
  {{<code-tab package="lit">}} {{<include greet-me-lit.ts>}} {{</code-tab>}}
  {{<code-tab package="fast">}} {{<include greet-me-fast.ts>}} {{</code-tab>}}
  {{<code-tab package="haunted">}} {{<include greet-me-haunted.ts>}} {{</code-tab>}}
  {{<code-tab package="atomico">}} {{<include greet-me-atomico.tsx>}} {{</code-tab>}}
  {{<code-tab package="hybrids">}} {{<include greet-me-hybrids.ts>}} {{</code-tab>}}
</code-tabs>

You can add it to your page like so, and it will start querying.

```html copy
<greet-me>
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
