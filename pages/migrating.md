Apollo Client 3 and Apollo Elements 3 both bring with them significant breaking changes. When upgrading your app to `@apollo-elements` 3, follow these steps to ease the transition:

## Replace imports with `@apollo/client/core`
`apollo-client`, `apollo-cache-inmemory`, `apollo-link-*` and others are now supplied by `@apollo/client/core`, so replace your import statements to match.
*NB:* you should always import from `@apollo/client/core`, not from `@apollo/client`, as the latter includes dependencies on `react` which you probably don't need or want. A single import statement from `@apollo/client` in your app can cause the TypeScript compiler to fail if `react` is not installed as a dependency. To avoid this, always import from `@apollo/client/core`.

## Check Non-Nullable Variables
Query and Subscription elements in `@apollo-elements` 2 tried to check if any non-nullable variables were defined before subscribing. Version 3 simplifies that check, now elements will only check that a client and a query exist before subscribing. To avoid errors, always make sure your variables are set before your query.

If your variables are dynamic, e.g. they're based on the current page URL, you can override `shouldSubscribe` to provide your own predicate:

This query reads the "route param" `/:pageId` and exports is at the `$pageId` variable:

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

Let's imagine a client-side router which calculates the `/:pageId` route param from the current page URL, and updates the `routeVar` [reactive variable](https://www.apollographql.com/docs/react/local-state/reactive-variables/) on every page navigation.

```ts
// router implementation left to reader's imagination
const routeVar = makeVar(makeRoute(window.location))
router.onNavigate = location => routeVar(makeRoute(location));

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
If a component subscribes to this query automatically when the query property is set (i.e. the default behaviour), the graphql server may respond with an error

> Variable ”$postId“ of required type ”ID!“ was not provided.

In order to prevent this error,
```ts
@customElement('blog-post')
class BlogPost extends ValidateVariablesMixin(ApolloQuery)<Data, Variables> {
  query = PostQuery;

  shouldSubscribe() {
    return !!(routeVar().params?.postId)
  }
}
```

### Opting in to Old Behaviour
The old variable-validating behaviour is still available, but you have to opt-in to get it. Import the `ValidateVariablesMixin` from `@apollo-elements/mixins/validate-variables-mixin` and apply it to your base class

```ts
@customElement('non-nullable')
class NonNullable extends ValidateVariablesMixin(ApolloQuery)<Data, Variables> {
  query = NonNullableQuery;
}
```

## Replace Resolvers with Type Policies
Apollo client 3 deprecates local resolvers in favour of type policies. Your resolvers will still work for now, but it's recommended to migrate them.

Use `TypePoliciesMixin` to declare a component's type policies.

```graphql
query DetailsOpenQuery {
  eenieOpen @client
  meenieOpen @client
}
```

```ts
@customElement('toggle-views')
class ToggleViews extends TypePoliciesMixin(ApolloQuery)<Data, Variables> {
  query = DetailsOpenQuery;

  typePolicies = {
    Query: {
      fields: {
        eenieOpen: {
          read(prev) { return prev; },
          merge(_, next) { return next; },
        },
        meenieOpen: {
          read(prev) { return prev; },
          merge(_, next) { return next; },
        }
      }
    }
  };

  render() {
    return html`
      <details id="eenie" @toggle="${this.onToggle}">
        <summary>Eenie</summary>
        ...
      </details>

      <details id="eenie" @toggle="${this.onToggle}">
        <summary>Eenie</summary>
        ...
      </details>
    `
  }

  onToggle(event) {
    this.client.cache.writeQuery({
      query: this.query,
      data: {
        ...this.data,
        [`${event.target.id}Open`]: event.target.open,
      }
    });
  }
}
```
