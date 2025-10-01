---
title: "Local State"
sidebar: guides
weight: 50
---

<meta name="description" data-helmett
      content="Introductory recipes for managing local state with Apollo Elements" />

Apollo Client 3 provides a number of ways to manage local state in your app.

## Reading Local State

Like in Apollo Client 2.x, you can get your stored local state in the apollo cache by using the `@client` directive in queries:

```graphql copy
query AppQuery {
  theme @client
  user @client { name picture }
}
```

## Writing Local State
Apollo Client 3 removes the `writeData` method from `ApolloClient`, as well it deprecates the concept of "local resolvers". Rather than defining resolver functions for your local state, you should now instead define type policies for local fields. Type Policies are not limited to local state. For example, if the server returns ISO 8601 Date Format string, you can define a type policy which converts it to a Date object, or formats the string according to the user's locale. We'll focus from now on on managing local state with apollo-elements.

How you update a piece of your local state depends on how you define that field's type policy. Generally speaking, you have three options:

1. Store the state in the apollo cache. This is most similar to the pattern from Apollo Client 2.x
2. Store the state in new Apollo Client 3 "Reactive Variables"
3. Bring your own storage (i.e. LocalStorage or IndexedDB)

Each approach has pros and cons, and we'll try to address them all here

### Storing State in the Apollo Cache

To update your state in the apollo cache, use `writeFragment` or `writeQuery`.

Say we wanted to toggle the page's colour scheme by changing the `theme` field on the root query:

```graphql copy
query ThemeToggle {
  theme @client
}
```

Let's define a custom element that displays a button to toggle the theme.

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}
{{<include "theme-toggle-html.html">}}
{{</code-tab>}}
  {{<code-tab package="mixins">}}
{{<include "theme-toggle-mixins.ts">}}
{{</code-tab>}}
  {{<code-tab package="lit">}}
{{<include "theme-toggle-lit.ts">}}
{{</code-tab>}}
  {{<code-tab package="fast">}}
{{<include "theme-toggle-fast.ts">}}
{{</code-tab>}}
  {{<code-tab package="haunted">}}
{{<include "theme-toggle-haunted.ts">}}
{{</code-tab>}}
  {{<code-tab package="atomico">}}
{{<include "theme-toggle-atomico.tsx">}}
{{</code-tab>}}
  {{<code-tab package="hybrids">}}
{{<include "theme-toggle-hybrids.ts">}}
{{</code-tab>}}
</code-tabs>

In order for our query to load the user's theme preference from their browser or OS settings, we'll define a type policy for the `theme` field.

```ts copy
import type { TypePolicy } from '@apollo/client/core';

/** Get the user's Browser-or-OS preferred theme */
function getUAPreferredTheme(): Theme {
  const { matches } = window.matchMedia('prefers-color-scheme: dark');
  return matches ? 'dark' : 'light';
}

export const typePolicies: TypePolicy = {
  Query: {
    fields: {
      theme(existing: Theme): Theme {
        return existing ?? getUAPreferredTheme();
      }
    }
  }
}
```

We can register that type policy eagerly when we create our `ApolloClient` instance:

```ts copy
const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache({ typePolicies }),
})
```

or we can use [`TypePoliciesMixin`](/guides/cool-tricks/code-splitting/#typepoliciesmixin) to lazy-load the type policies when the component connects:

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}
{{<include "type-policies-html.html">}}
{{</code-tab>}}
  {{<code-tab package="mixins">}}
{{<include "type-policies-mixins.ts">}}
{{</code-tab>}}
  {{<code-tab package="lit">}}
{{<include "type-policies-lit.ts">}}
{{</code-tab>}}
  {{<code-tab package="fast">}}
{{<include "type-policies-fast.ts">}}
{{</code-tab>}}
  {{<code-tab package="haunted">}}
{{<include "type-policies-haunted.ts">}}
{{</code-tab>}}
  {{<code-tab package="atomico">}}
{{<include "type-policies-atomico.tsx">}}
{{</code-tab>}}
  {{<code-tab package="hybrids">}}
{{<include "type-policies-hybrids.ts">}}
{{</code-tab>}}
</code-tabs>

All that's left is to define the `toggleTheme` function to actually update the cache:

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}
{{<include "toggle-cache-html.html">}}
{{</code-tab>}}
  {{<code-tab package="mixins">}}
{{<include "toggle-cache-mixins.ts">}}
{{</code-tab>}}
  {{<code-tab package="lit">}}
{{<include "toggle-cache-lit.ts">}}
{{</code-tab>}}
  {{<code-tab package="fast">}}
{{<include "toggle-cache-fast.ts">}}
{{</code-tab>}}
  {{<code-tab package="haunted">}}
{{<include "toggle-cache-haunted.ts">}}
{{</code-tab>}}
  {{<code-tab package="atomico">}}
{{<include "toggle-cache-atomico.tsx">}}
{{</code-tab>}}
  {{<code-tab package="hybrids">}}
{{<include "toggle-cache-hybrids.ts">}}
{{</code-tab>}}
</code-tabs>

## Storing State in Reactive Variables

We can acheive the same effect using the new `makeVar` function from Apollo Client. First we'll define our theme variable, initializing it with the user preference:

```ts copy
import { makeVar } from '@apollo/client/core';

export const themeVar = makeVar<Theme>(getUAPreferredTheme());
```

Then we'll modify our type policy to read the value from that variable:

```ts copy
import { themeVar } from './variables';

export const typePolicies: TypePolicy = {
  Query: {
    fields: {
      theme(): Theme {
        return themeVar();
      }
    }
  }
}
```

Last, we'll refactor the `toggleTheme` method to directly update the value of `themeVar`. We do that by calling `themeVar` with a value. Apollo Client will ensure that all queries that depend on `theme` will get the new value every time we call.

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}
{{<include "toggle-reactive-html.js">}}
{{</code-tab>}}
  {{<code-tab package="mixins">}}
{{<include "toggle-reactive-mixins.ts">}}
{{</code-tab>}}
  {{<code-tab package="lit">}}
{{<include "toggle-reactive-lit.ts">}}
{{</code-tab>}}
  {{<code-tab package="fast">}}
{{<include "toggle-reactive-fast.ts">}}
{{</code-tab>}}
  {{<code-tab package="haunted">}}
{{<include "toggle-reactive-haunted.ts">}}
{{</code-tab>}}
  {{<code-tab package="atomico">}}
{{<include "toggle-reactive-atomico.tsx">}}
{{</code-tab>}}
  {{<code-tab package="hybrids">}}
{{<include "toggle-reactive-hybrids.ts">}}
{{</code-tab>}}
</code-tabs>

## Bringing our own Storage

If for whatever reason we prefer to store a piece of state ourselves, we can redefine the type policy to read from that storage. Here's an example using localStorage:

```ts copy
export const typePolicies: TypePolicy = {
  Query: {
    fields: {
      theme(): Theme {
        return localStorage.getItem('theme') ?? getUAPreferredTheme();
      }
    }
  }
}
```

Now in order to update the theme, we need to perform two steps:
1. Change the stored value
2. Invalidate the Apollo cache's value for theme on the root query using the `evict` method on `InMemoryCache`.

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}
{{<include "toggle-storage-html.js">}}
{{</code-tab>}}
  {{<code-tab package="mixins">}}
{{<include "toggle-storage-mixins.ts">}}
{{</code-tab>}}
  {{<code-tab package="lit">}}
{{<include "toggle-storage-lit.ts">}}
{{</code-tab>}}
  {{<code-tab package="fast">}}
{{<include "toggle-storage-fast.ts">}}
{{</code-tab>}}
  {{<code-tab package="haunted">}}
{{<include "toggle-storage-haunted.ts">}}
{{</code-tab>}}
  {{<code-tab package="atomico">}}
{{<include "toggle-storage-atomico.tsx">}}
{{</code-tab>}}
  {{<code-tab package="hybrids">}}
{{<include "toggle-storage-hybrids.ts">}}
{{</code-tab>}}
</code-tabs>

Note that type policy read functions *must be synchronous*. If you need to perform async work to read a value, you'll need some helper that uses reactive variables underneath. See the [issue on apollo-client](https://github.com/apollographql/apollo-client/issues/6852) which discusses the reason why and provides a workaround.

Next Steps:
 - [Advanced Local State](./advanced-local-state.md)
