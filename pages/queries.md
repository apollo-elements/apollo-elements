<meta name="description" content="How to use Apollo Elements to write declarative web components that query their data from you Apollo Client cache."/>

GraphQL queries are how you read data from the graph. You can think of them as roughly analogous to HTTP `GET` requests or SQL `READ` statements.

Query components read data from the GraphQL and expose them on the component's `data` property. Each query component takes a `query` property which is a GraphQL `DocumentNode`. You can create that object using the `gql` template literal tag, or via `@apollo-elements/rollup-plugin-graphql`, etc.

Apollo client ensures that the component always has the latest data by _subscribing_ to the query. Query components will automatically subscribe to their queries whenever the `query` property is set, like in this example which sets the `query` class field.

```ts
import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
import { gql } from '@apollo/client/core';

@customElement('hello-query')
export class HelloQuery extends ApolloElement<Data, Variables> {
  query = gql`
    query HelloQuery($name: String) {
      name
      greeting
    }
  `;

  render() {
    return html`
      <p>
        ${this.data?.greeting ?? 'Hello'},
        ${this.data?.name ?? 'Friend'}
      </p>
    `;
  }
}
```

You can also use the DOM to set the query property

```js
document.querySelector('hello-query').query = gql`...`;
```

## Preventing Automatic Subscription
If you want your component to not subscribe at all until you call the `subscribe()` method, you can opt out of the default behaviour by setting the `noAutoSubscribe` property.

```ts
class LazyGreeting extends HelloQuery {
  noAutoSubscribe = true;
}
```

In that case, call the element's `subscribe` method to start listening for changes:

```js
const element = document.querySelector('hello-query')
element.subscribe();
```

Alternatively, you can set the boolean `no-auto-subscribe` attribute to the element instance. Bear in mind that `no-auto-subscribe` is a boolean attribute, so it's presence indicates truthiness, and its absence indicates falsiness

```html
<!-- This one eagerly subscribes -->
<hello-query></hello-query>
<!-- This one will not subscribe until called -->
<hello-query no-auto-subscribe></hello-query>
<!-- Neither will this one -->
<hello-query no-auto-subscribe="false"></hello-query>
```

In addition to `data`, elements can also access `loading`, `error` and `errors` properties.

```ts
render() {
  return html`
    <article class="${classMap({ skeleton: this.loading })}">
      <p class="error" ?hidden="${!this.error}">${this.error?.message}</p>
      <p>
        ${this.data?.greeting ?? 'Hello'},
        ${this.data?.name ?? 'Friend'}
      </p>
    </article>
  `;
}
```

Queries that have non-nullable variables (i.e. required variables) will still attempt to subscribe even if their required variables are not set. To prevent this (and the resulting GraphQL error from the server), override the `shouldSubscribe` method of your query component, returning `true` if your variables' dependencies are defined.

```ts
shouldSubscribe() {
  return !!(new URL(window.location).searchParams.get('userId'))
}
```

Alternatively, you can implement an [`ApolloLink`](https://www.apollographql.com/docs/react/api/link/introduction/)
which prevents operations from continuing when required variables are missing:

```ts
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';
import { hasAllVariables } from '@apollo-elements/lib/has-all-variables';

const uri =
  'GRAPHQL_HOST/graphql';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new ApolloLink((operation, forward) =>
      hasAllVariables(operation) && forward(operation)),
    new HttpLink({ uri }),
  ])
});
```
