Query components read data from the GraphQL and expose them on the component's `data` property. Each query component takes a `query` property which is a GraphQL `DocumentNode`. You can create that object using the `gql` template literal tag, or via `rollup-plugin-graphql`, etc.

Apollo client ensures that the component always has the latest data by _subscribing_ to the query.

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

Query components will automatically subscribe to their queries whenever the `query` property is set. You can opt out of that behaviour by setting the `noAutoSubscribe` property.

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

Alternatively, you can set the add a `no-auto-subscribe` attribute to the element instance.

```html
<!-- This one eagerly subscribes -->
<hello-query></hello-query>
<!-- This one will not subscribe until called -->
<hello-query no-auto-subscribe></hello-query>
```

In addition to `data`, elements can also access `loading`, `error` and `errors` properties.
```ts
render() {
  return html`
    <p>
      ${(
          this.error ? error.message
        : this.loading ? '...'
        : `${this.data?.greeting ?? 'Hello'}, ${this.data?.name ?? 'Friend'}`
      )}
    </p>
  `;
}
```

Queries that have non-nullable variables (i.e. required variables)