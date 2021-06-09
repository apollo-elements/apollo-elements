---
layout: layout-api
package: '@apollo-elements/polymer'
module: 'polymer-apollo-mutation.js'
---

# Web Component Libraries >> Polymer >> polymer-apollo-mutation || 10

`<apollo-mutation>` fires Polymer-style prop-changed events when its `called`, `data`, `error`, `loading` or `networkStatus` properties change.

See [ApolloMutationInterface](/api/interfaces/mutation/) for more information.

### Examples

```html wcd LyH1DZUe3by6bla4Nt77 src/User.js
<apollo-mutation id="userMutation"
    data="{{data}}"
    mutation="[[mutation]]">
</apollo-mutation>

<p-card>
  <h2 slot="heading">Add a User</h2>
  <paper-input hidden="[[data]]" label="Name" value="{{name}}"></paper-input>
  <paper-button slot="actions" hidden="[[data]]" on-click="mutate">Submit</paper-button>
  <p hidden="[[!data]]">[[data.insertUsers.returning.0.name]] added!</p>
</p-card>
```
