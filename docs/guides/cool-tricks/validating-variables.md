---
title: Validating Variables
eleventyNavigation:
  order: 40
---

Queries that have non-nullable variables (i.e. required variables) will still 
attempt to subscribe even if their required variables are not set.

For example, this query reads the "route param" `/:pageId` and exports it as the 
`$pageId` variable:

<code-copy>

  ```graphql
  query Post($postId: ID!) {
    route @client {
      params {
        postId @export(as: "postId")
      }
    }

    post(postId: $postId) {
      id
      title
      image
      content
    }
  }
  ```

</code-copy>

Let's imagine a client-side router which calculates the `/:pageId` route param 
from the current page URL, and updates the `routeVar` [reactive 
variable](https://www.apollographql.com/docs/react/local-state/reactive-variables/) 
on every page navigation.

<code-copy>

```ts
import { ApolloClient, HttpLink, InMemoryCache, makeVar } from '@apollo/client/core';

// router implementation left to reader's imagination
import { router, makeRoute } from 'foo-uter';

export const routeVar = makeVar(makeRoute(window.location))

router.addEventListener('navigate', location =>
  routeVar(makeRoute(location)));

const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          route() {
            return routeVar();
          }
        }
      }
    }
  })
});
```

</code-copy>

If a component subscribes to this query automatically, as is the default 
behaviour, the graphql server may respond with an error:

> Variable ”$postId“ of required type ”ID!“ was not provided.

For queries like this one, where the variables are dynamic, (e.g. they're based 
on the current page URL), you have three good options to prevent these kinds of 
errors:

1. Create a variable-validating link
2. Override the `shouldSubscribe` method on your components to determine whether 
they should subscribe
3. Opt in to the old behaviour with `ValidateVariablesMixin`

## Option 1: Create a Variable-Validating Link

To prevent *any* operation from fetching without required variables, use 
`hasAllVariables` from `@apollo-elements/core/lib` to create an 
[`ApolloLink`](https://www.apollographql.com/docs/react/api/link/introduction/) 
which checks every outgoing operation for required variables.

<code-copy>

```ts
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';

import { hasAllVariables } from '@apollo-elements/core/lib/has-all-variables';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    new ApolloLink((operation, forward) =>
      hasAllVariables(operation) && forward(operation)),
    new HttpLink({ uri: '/graphql' }),
  ])
});
```

</code-copy>

The `<apollo-client>` component from 
[`@apollo-elements/components/apollo-client`](../../api/components/apollo-client.md) 
and the `createApolloClient({ validateVariables: true })` helper from 
[`@apollo-elements/core/lib/create-apollo-client`](/api/core/helpers/lib/#lib/create-apollo-client.js) 
both incorporate this link.

This option is great when you want to 'set it and forget it', and it works for 
any operation, not solely for queries, but it's heavy-handed. For more 
fine-grained control you can program each individual query component to defer 
querying.

## Option 2: Override the `shouldSubscribe` Method

With this approach, you can control on a per-component basis when to subscribe.

<code-tabs collection="libraries" default-tab="lit">
  <code-tab tab-id="html" src="snippets/shouldSubscribe/html.html"></code-tab>
  <code-tab tab-id="mixins" src="snippets/shouldSubscribe/mixins.ts"></code-tab>
  <code-tab tab-id="lit" src="snippets/shouldSubscribe/lit.ts"></code-tab>
  <code-tab tab-id="fast" src="snippets/shouldSubscribe/fast.ts"></code-tab>
  <code-tab tab-id="haunted" src="snippets/shouldSubscribe/haunted.js"></code-tab>
  <code-tab tab-id="atomico" src="snippets/shouldSubscribe/atomico.jsx"></code-tab>
  <code-tab tab-id="hybrids" src="snippets/shouldSubscribe/hybrids.js"></code-tab>
</code-tabs>

## Option 3: Restore the Old Behaviour with `ValidateVariablesMixin`

The old variable-validating behaviour is still available, but you have to opt-in 
to get it. Import the `ValidateVariablesMixin` from 
[`@apollo-elements/mixins/validate-variables-mixin`](../../api/libraries/mixins/validate-variables-mixin.md) 
and apply it to your base class

<code-tabs collection="libraries" default-tab="lit">
  <code-tab tab-id="html" src="snippets/ValidateVariablesMixin/html.html"></code-tab>
  <code-tab tab-id="mixins" src="snippets/ValidateVariablesMixin/mixins.ts"></code-tab>
  <code-tab tab-id="lit" src="snippets/ValidateVariablesMixin/lit.ts"></code-tab>
  <code-tab tab-id="fast" src="snippets/ValidateVariablesMixin/fast.ts"></code-tab>
  <code-tab tab-id="haunted" src="snippets/ValidateVariablesMixin/haunted.js"></code-tab>
  <code-tab tab-id="atomico" src="snippets/ValidateVariablesMixin/atomico.jsx"></code-tab>
  <code-tab tab-id="hybrids" src="snippets/ValidateVariablesMixin/hybrids.js"></code-tab>
</code-tabs>
