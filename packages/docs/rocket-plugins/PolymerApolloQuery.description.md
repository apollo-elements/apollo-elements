`<apollo-query>` fires Polymer-style prop-changed events when its `data`, `error`, `loading` or `networkStatus` properties change.

See [ApolloQueryInterface](/api/core/interfaces/query/) for more information.

### Example

```html
<apollo-query data="{{data}}" variables="[[variables]]">
  <script type="application/graphql">
    query User($id: ID!) {
      user(id: $id) {
        name
        picture
      }
    }
  </script>
</apollo-query>

<paper-icon-item>
  <iron-image slot="item-icon">[[data.user.picture]]</iron-image>
  [[data.user.name]]
</paper-icon-item>
```
