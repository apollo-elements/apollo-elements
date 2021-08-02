---
"@apollo-elements/components": minor
---

`<apollo-mutation>` now picks up variables and triggers from sibling nodes with `variable-for="<id>"` or `trigger-for="<id>"` attributes.

<figure>
<figcaption>Example of sibling nodes to apollo-mutation</figcaption>

```html
<label>Name <input variable-for="add-user" data-variable="name"/></label>
<button trigger-for="add-user">Add</button>
<apollo-mutation id="add-user">
  <script type="application/graphql" src="AddUser.mutation.graphql"></script>
  <template>
    <link rel="stylesheet" href="add-user.css">
    <output class="{{ data ? 'resolved' : 'transparent' }}">
      <p>You have added {{ data.addUser.name }}</p>
    </output>
  </template>
</apollo-mutation>
```

</figure>
