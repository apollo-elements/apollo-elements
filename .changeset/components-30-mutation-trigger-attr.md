---
"@apollo-elements/components": minor
---

Adds an optional value to the `trigger` attribute on `<apollo-mutation>` to specify the event to trigger the mutation.

Previously, the triggering element would fire the mutation on click. Now, `click` is the default event, but you can specify which event to mutate on. This lets you use an input as both a variable and a mutation trigger, by setting the value of the `trigger` attribute to `change`.

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
    <apollo-mutation input-key="input" refetch-queries="MyProfile" await-refetch-queries data-user-id="{{ data.me.id }}">
      <mwc-textfield
          label="Name"
          data-variable="name"
          value="{{ data.me.name }}"
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
