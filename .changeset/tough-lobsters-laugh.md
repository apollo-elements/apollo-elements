---
"@apollo-elements/components": major
---

Allows you to set a value on the `trigger` attribute which, when set, is the event type to listen for before mutating.

You can now even use an input as both a variable and a mutation trigger, by setting the value of the `trigger` attribute to the event that should, when dispatced from the triggering element, trigger the mutation.

```html
<apollo-query>
  <script type="application/graphql">
    query MyProfile {
      me {
        id name
      }
    }
  </script>

  <template>
    <apollo-mutation
      input-key="input"
      refetch-queries="MyProfile"
      await-refetch-queries
      .extras="{{ { me: data.me } }}"
      data-user-id="{{ data.me.id }}"
    >
      <mwc-textfield
        label="Name"
        data-variable="name"
        value="{{ me.name }}"
        trigger="change"
      ></mwc-textfield>

      <script type="application/graphql">
        mutation UpdateUserName($userId: ID!, $name: String!) {
          updateUserName(userId: $userId, name: $name) {
            id name
          }
        }
      </script>
    </apollo-mutation>
  </template>
</apollo-query>
```

Removes the protected `trigger` and `button` accessors, and replaces them with `triggers` and `buttons`, which return `NodeList`s.
