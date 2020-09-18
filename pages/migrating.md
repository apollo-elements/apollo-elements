Apollo Client 3 and Apollo Elements 3 both bring with them significant breaking changes. When upgrading your app to `@apollo-elements` 3, follow these steps to ease the transition:

## Replace imports with `@apollo/client/core`
`apollo-client`, `apollo-cache-inmemory`, `apollo-link-*` and others are now supplied by `@apollo/client/core`, so replace your import statements to match.
*NB:* you should always import from `@apollo/client/core`, not from `@apollo/client`, as the latter includes dependencies on `react` which you probably don't need or want. A single import statement from `@apollo/client` in your app can cause the TypeScript compiler to fail if `react` is not installed as a dependency. To avoid this, always import from `@apollo/client/core`.

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

## Check Non-Nullable Variables
Query and Subscription elements in `@apollo-elements` 2 tried to check if any non-nullable variables were defined before subscribing. Version 3 simplifies that check, now elements will only check that a client and a query exist before subscribing. To avoid errors, always make sure your variables are set before your query.

If your variables are dynamic, for example, they're based on the state of your client-side router, you can override `shouldSubscribe` to provide your own predicate:

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
```ts
@customElement('blog-post')
class BlogPost extends ValidateVariablesMixin(ApolloQuery)<Data, Variables> {
  query = PostQuery;

  shouldSubscribe() {
    return (
      !!this.client &&
      !!this.query &&
      !!(routeVar().params?.postId)
    );
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