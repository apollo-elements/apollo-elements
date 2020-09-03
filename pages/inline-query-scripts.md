You can provide a GraphQL query string in your markup by appending a
GraphQL script element to your connected element.

Say you had a `<greet-me>` element which extends `ApolloQuery`.

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
