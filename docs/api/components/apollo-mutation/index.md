---
layout: api
package: '@apollo-elements/components'
module: './apollo-mutation.js'
---

# Components >> apollo-mutation || 20

Provides a way to declare mutations and their variables, including input components.

Inherits from [`ApolloMutationInterface`](/api/interfaces/mutation/)

## Live Demo

```html wcd oxFdNcAerrfuuiOMM22M www/index.html
<apollo-client uri="https://api.spacex.land/graphql">
  <p-card>
    <h2 slot="heading">Add a User</h2>
    <p>Complete the form to add a user.</p>

    <h3>Latest 5 Users</h3>
    <latest-users limit="5"></latest-users>

    <apollo-mutation slot="actions" refetch-queries="LatestUsers">
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
