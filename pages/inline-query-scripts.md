<meta name="description" content="How to use Apollo Elements to write declarative GraphQL-aware components in HTML"/>

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

## No Base Class

You can use Apollo Elements without subclassing. Import [`@apollo-elements/polymer/apollo-query`](https://apolloelements.dev/modules/_apollo_elements_polymer.html) and add an `<apollo-query>` element to your page with a `<script type="application/graphql">` as its first child. The element will query as soon as it upgrades, and will fire `data-changed` or `error-changed` events. If your query has arguments, assign them to the `<apollo-query>` element's `variables` property.

Despite the name, these components don't import from the Polymer library, rather they extend HTMLElement, so they won't unduly affect your bundle sizes.

```html
<apollo-query id="hello">
  <script type="application/graphql">
  query HelloQuery {
    helloWorld {
      name
      greeting
    }
  }
  </script>
</apollo-query>

<output id="output"></output>

<script type="module">
  import "@apollo-elements/polymer/apollo-query";
  hello.addEventListener('data-changed', ({ detail: { value } }) => {
    if (!value || !value.helloWorld) return;
    const greeting = value.helloWorld.greeting || 'Hello';
    const name = value.helloWorld.name || 'Friend';
    output.textContent = `${greeting}, ${name}!`;
  });
</script>
```