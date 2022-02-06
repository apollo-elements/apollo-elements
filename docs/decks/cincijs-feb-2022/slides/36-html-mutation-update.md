---
name: Update Functions
attrs: float-header
---

## Mutation Updater Functions

<section progressive>

```html
<apollo-mutation refetch-queries="LatestUsers" await-refetch-queries>
  <script type="application/graphql" src="InsertUser.mutation.graphql"></script>
  <sl-input data-variable="name" label="User name"></sl-input>
  <sl-button trigger>Add User</sl-button>
</apollo-mutation>











```

```html reveal
<apollo-mutation refetch-queries="LatestUsers" await-refetch-queries>















```

```html reveal
<apollo-mutation><!-- ... --></apollo-mutation>
















```

```html reveal
<apollo-mutation><!-- ... --></apollo-mutation>
<script type="module">
  const muttnEl = document.querySelector('apollo-mutation');
  const queryEl = document.querySelector('apollo-query');
  await muttnEl.updateComplete;
  muttnEl.options.update = function(cache, result) {
      const { query } = queryEl;
      const cached = cache.readQuery({ query });
      cache.writeQuery({
        query,
        data: {
          ...cached,
          users: [result.insert_users.returning[0], ...cached.users],
        },
      });
    }
</script>
```
</section>
