---
"@apollo-elements/components": major
---

Adds [stampino](https://github.com/justinfagnani/stampino) templates to `<apollo-mutation>`
Like `<apollo-query>`, this lets you render the mutation result as a dynamic HTML template to either the shadow or light DOM.

This release includes a **breaking change** which removes the `variables` and `trigger` slots from `<apollo-mutation>`, replacing them with a single anonymous slot. The reason for making that breaking change is to give users more control over their mutation components.

The previous named-slot-based API presupposed that the user wanted the trigger to appear after the variable-inputs in the shadow root, which might not always be what the user wants. Users would also have to make their inputs and triggers direct children of the mutation element - it would not work if they nested them in `<label>` or `<header>` elements, for example.

Now, instead of slotting variables into a `variables` slot, you should add a `data-variable` attribute to any input-like element that represents a variable, e.g. `<input data-variable="varName"\>` would represent the value of the `varName` variable.

Similarly, to assign a button-like element as the trigger, add a `trigger` attribute to it.

#### Before:

```html
<apollo-mutation input-key="input">
  <!-- Oops! appears after `a-input` in shadow DOM -->
  <button slot="trigger">Mutate!</button>

  <label>
   <span>Name:</span>
   <!-- Oops! Not slotted into `<apollo-mutation>`! -->
   <input slot="variable" data-variable="name"/>
  </label>
</apollo-mutation>
```

#### After:

```html
<apollo-mutation input-key="input">
  <button trigger>Mutate!</button>

  <label>
   <span>A:</span>
   <input data-variable="name"/>
  </label>
</apollo-mutation>
```

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
        data-user-id="{{ data.me.id }}">

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

This change also removes the protected `trigger` and `button` accessors, and replaces them with `triggers` and `buttons`, which return `NodeList`s.
