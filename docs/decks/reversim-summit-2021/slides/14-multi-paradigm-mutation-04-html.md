---
name: HTML Mutations with HTML
attrs: fade-in
---

<img slot="end-start" alt="HTML" src="/_merged_assets/brand-logos/html5.svg"/>

```html
<apollo-mutation
    refetch-queries="LatestUsers"
    await-refetch-queries>
  <script type="application/graphql"
          src="AddUser.mutation.graphql"></script>

  <sl-input label="User name"
            data-variable="name"></sl-input>
  <sl-button label="Add user"
             trigger></sl-button>
</apollo-mutation>
```
