---
name: HTML Mutations
attrs: float-header
---

## HTML Mutations

<section progressive>

```html
<apollo-client uri="https://api.spacex.land/graphql">















</apollo-client>
```

```html reveal

  <apollo-query>
    <script type="application/graphql" src="LatestUsers.query.graphql"></script>
    <template>{%raw%}
      <ol>
        <template type="repeat" repeat="{{ data.users ?? [] }}">
          <li>{{ item.name }}</li>
        </template>
      </ol>
    </template>{%endraw%}
  </apollo-query>






```

```html reveal











  <apollo-mutation refetch-queries="LatestUsers" await-refetch-queries>
    <script type="application/graphql" src="InsertUser.mutation.graphql"></script>


  </apollo-mutation>

```

```html reveal













    <sl-input data-variable="name" label="User name"></sl-input>
    <sl-button trigger label="Add user"></sl-button>


```

```html reveal













    <sl-input data-variable="name" label="User name"></sl-input>
    <sl-button trigger label="Add user"></sl-button>


```

```html reveal
<apollo-mutation><!-- ... --></apollo-mutation>
<script type="module">
  const muttnEl = document.querySelector('apollo-mutation');
  const queryEl = document.querySelector('apollo-query');
  await muttnEl.updateComplete;
  muttnEl.options.update = function mutatationUpdateFn(cache, result) {
      // ...








    }
</script>
```

</section>
