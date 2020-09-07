You can provide a GraphQL query string in your markup by appending a
GraphQL script element to your connected element.

Say you had a `<greet-me>` element which extends `ApolloQuery`.

```ts
import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';

@customElement('greet-me')
class GreetMe extends ApolloQuery<{ name: string, greeting: string }, null> {
  render() {
    return html`
      <p>${this.data?.greeting ?? 'Hello'}, ${this.data?.name ?? 'friend'}</p>
    `;
  }
}
```

You can add it to your page like so, and it will start querying.

```html
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
