```html
<apollo-query data="{{data}}" variables="[[variables]]">
  <script type="application/graphql">
    query User($id: ID!)
      user(id: $id) {
        name
        picture
      }
    }
  </script>
</apollo-query>
```
