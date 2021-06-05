# Cool Tricks >> Validating Variables || 40

Queries that have non-nullable variables (i.e. required variables) will still attempt to subscribe even if their required variables are not set.

For example, this query reads the "route param" `/:pageId` and exports it as the `$pageId` variable:

```graphql copy
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

Let's imagine a client-side router which calculates the `/:pageId` route param from the current page URL, and updates the `routeVar` [reactive variable](https://www.apollographql.com/docs/react/local-state/reactive-variables/) on every page navigation.

```ts copy
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

If a component subscribes to this query automatically, as is the default behaviour, the graphql server may respond with an error:

> Variable ”$postId“ of required type ”ID!“ was not provided.

For queries like this one, where the variables are dynamic, (e.g. they're based on the current page URL), you have three good options to prevent these kinds of errors:

1. Create a variable-validating link
2. Override the `shouldSubscribe` method on your components to determine whether they should subscribe
3. Opt in to the old behaviour with `ValidateVariablesMixin`

## Option 1: Create a Variable-Validating Link

To prevent *any* operation from fetching without required variables, use `hasAllVariables` from `@apollo-elements/core/lib` to create an [`ApolloLink`](https://www.apollographql.com/docs/react/api/link/introduction/) which checks every outgoing operation for required variables.

```ts copy
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

The `<apollo-client>` component from [`@apollo-elements/components/apollo-client`](../../api/components/apollo-client.md) and the `createApolloClient({ validateVariables: true })` helper from [`@apollo-elements/core/lib/create-apollo-client`](../../api/lib/create-apollo-client.md) both incorporate this link.

This option is great when you want to 'set it and forget it', and it works for any operation, not solely for queries, but it's heavy-handed. For more fine-grained control you can program each individual query component to defer querying.

## Option 2: Override the `shouldSubscribe` Method

With this approach, you can control on a per-component basis when to subscribe.

<code-tabs collection="libraries" default-tab="lit">

  ```html tab html
  <p>
    You can subclass <code>ApolloQueryElement</code>
    to override methods.
  </p>

  <should-subscribe-query></should-subscribe-query>

  <script type="module">
  import { ApolloQueryElement } from '@apollo-elements/components/apollo-query';
  import { routeVar } from '../variables';

  customElements.define(
    'should-subscribe-query',
    class ShouldSubscribeQueryElement extends ApolloQueryElement {
      shouldSubscribe() {
        return !!(routeVar().params?.postId);
      }
    });
  </script>
  ```

  ```ts tab mixins
  import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
  import PostQuery from './Post.query.graphql';
  import { routeVar } from '../variables';

  class BlogPost extends ApolloQueryMixin(HTMLElement)<Data, Variables> {
    query = PostQuery;

    shouldSubscribe() {
      return !!(routeVar().params?.postId)
    }
  }

  customElements.define('blog-post', BlogPost);
  ```

  ```ts tab lit
  import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
  import PostQuery from './Post.query.graphql';
  import { routeVar } from '../variables';

  @customElement('blog-post')
  class BlogPost extends ApolloQuery<Data, Variables> {
    query = PostQuery;

    shouldSubscribe() {
      return !!(routeVar().params?.postId)
    }
  }
  ```

  ```ts tab fast
  import { ApolloQuery, customElement } from '@apollo-elements/fast';
  import PostQuery from './Post.query.graphql';
  import { routeVar } from '../variables';

  @customElement({ name: 'blog-post' })
  class BlogPost extends ApolloQuery<Data, Variables> {
    query = PostQuery;

    shouldSubscribe() {
      return !!(routeVar().params?.postId)
    }
  }
  ```

  ```ts tab haunted
  import { useQuery, component } from '@apollo-elements/haunted';
  import PostQuery from './Post.query.graphql';
  import { routeVar } from '../variables';

  function BlogPost() {
    const { data } = useQuery(PostQuery, {
      shouldSubscribe() {
        return !!(routeVar().params?.postId)
      },
    });
  }

  customElements.define('blog-post', component(BlogPost));
  ```

  ```ts tab hybrids
  import { define, query, client } from '@apollo-elements/hybrids';
  import PostQuery from './Post.query.graphql';
  import { routeVar } from '../variables';

  function shouldSubscribe() {
    return !!(routeVar().params?.postId)
  }

  define('blog-post', {
    client: client(window.__APOLLO_CLIENT__),
    query: query(PostQuery),
    shouldSubscribe: { get(host) { return shouldSubscribe(host); } }
  });
  ```

</code-tabs>

## Option 3: Restore the Old Behaviour with `ValidateVariablesMixin`

The old variable-validating behaviour is still available, but you have to opt-in to get it. Import the `ValidateVariablesMixin` from [`@apollo-elements/mixins/validate-variables-mixin`](../../api/libraries/mixins/validate-variables-mixin.md) and apply it to your base class

<code-tabs collection="libraries" default-tab="lit">

  ```html tab html
  <p>
    You can subclass <code>ApolloQueryElement</code>
    to apply mixins.
  </p>

  <validated-variables-query></validated-variables-query>

  <script type="module">
  import { ApolloQueryElement } from '@apollo-elements/components/apollo-query';
  customElements.define(
    'validated-variables-query',
    class ValidatedApolloQuery extends ValidateVariablesMixin(ApolloQueryElement) {});
  </script>
  ```

  ```ts tab mixins
  import { ValidateVariablesMixin, ApolloQueryMixin } from '@apollo-elements/mixins';

  import NonNullableQuery from './NonNullable.query.graphql';

  class NonNullable extends
  ValidateVariablesMixin(ApolloQueryMixin(HTMLElement))<Data, Variables> {
    query = NonNullableQuery;
  }

  customElements.define('non-nullable');
  ```

  ```ts tab lit
  import { ValidateVariablesMixin } from '@apollo-elements/mixins';
  import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';

  import NonNullableQuery from './NonNullable.query.graphql';

  @customElement('non-nullable')
  class NonNullable extends
  ValidateVariablesMixin(ApolloQuery)<Data, Variables> {
    query = NonNullableQuery;
  }
  ```

  ```ts tab fast
  import { ValidateVariablesMixin } from '@apollo-elements/mixins';
  import { ApolloQuery, customElement } from '@apollo-elements/fast';

  import NonNullableQuery from './NonNullable.query.graphql';

  @customElement({ name: 'non-nullable' })
  class NonNullable extends
  ValidateVariablesMixin(ApolloQuery)<Data, Variables> {
    query = NonNullableQuery;
  }
  ```

  ```md tab haunted
  > There's no `ValidateVariablesMixin` for haunted, so use one of the other techniques.
  ```


  ```md tab hybrids
  > There's no `ValidateVariablesMixin` for hybrids, so use one of the other techniques.
  ```

</code-tabs>
