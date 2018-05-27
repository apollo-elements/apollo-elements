# lit-apollo
🚀 A set of custom element base classes that connect to your Apollo cache.

## Usage

```html
<script type="module">
  import gql from 'graphql-tag';
  import ApolloQuery from '@lit-apollo/lit-apollo/apollo-query';

  class MyConnectedElement extends ApolloQuery {
    _render({ data: { helloWorld }, loading, error, networkStatus }) {
      return (
          loading ? html`
            <what-spin></what-spin>`
        : error ? html`
            <h1>😢 Such sad, very error!</h1>
            <div>${error.message}</div>`
        : html`
            <div>${helloWorld.greeting}, ${helloWorld.name}</div>`
      );
     }

     constructor() {
       super();
       this.query = gql`query { helloWorld { name, greeting } }`;
     }
  };
  customElements.define('connected-element', MyConnectedElement)
</script>
```

### Inline Query Scripts
You can also provide a graphql query string in your markup by appending a
graphql script to your element like so:

```html
<connected-element>
  <script type="application/graphql">
    query {
      helloWorld {
        name
        greeting
      }
    }
  </script>
</connected-element>
```
