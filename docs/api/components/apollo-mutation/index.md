---
layout: api
package: '@apollo-elements/components'
module: './apollo-mutation.js'
---
# Components >> apollo-mutation || 20

Inherits from [`ApolloMutationInterface`](/api/interfaces/mutation/)

## Live Demo

```html wcd oxFdNcAerrfuuiOMM22M www/index.html
<apollo-client uri="https://api.spacex.land/graphql">
  <p-card>
    <h2 slot="heading">Add a User</h2>
    <output></output>
    <apollo-mutation slot="actions">
      <mwc-textfield slot="variable"
          data-variable="name"
          label="User name"
          outlined></mwc-textfield>
      <mwc-button slot="trigger" label="Add user"></mwc-button>
      <script type="application/graphql">
        mutation InsertUser($name: String!) {
          insert_users(objects: {name: $name}) {
            returning {
              name
              id
              timestamp
            }
          }
        }
      </script>
    </apollo-mutation>
  </p-card>
</apollo-client>
```
