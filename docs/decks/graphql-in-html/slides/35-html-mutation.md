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

<div reveal fullheight>

```html playground apollo-mutation-example index.html
<apollo-client uri="https://api.spacex.land/graphql">
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
  <apollo-mutation refetch-queries="LatestUsers" await-refetch-queries>
    <script type="application/graphql" src="InsertUser.mutation.graphql"></script>
    <sl-input data-variable="name" label="User name"></sl-input>
    <sl-button trigger>Add User</sl-button>
  </apollo-mutation>
</apollo-client>

<script type="module" src="main.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.50/dist/shoelace.js"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.50/dist/themes/dark.css">
```

<div>

```graphql playground-file apollo-mutation-example InsertUser.mutation.graphql
mutation InsertUser($name: String!) {
  insert_users(objects: {name: $name}) {
    returning {
      name
      id
      timestamp
    }
  }
}
```

```graphql playground-file apollo-mutation-example LatestUsers.query.graphql
query LatestUsers($limit: Int = 3){
  users(limit: $limit, order_by: { timestamp: desc }) {
    name
  }
}
```

```css playground-file apollo-mutation-example style.css
@import url('https://rsms.me/inter/inter.css');
html {
  font-family: 'Inter var', sans-serif;
  background-color: black;
  color: white;
  font-size: 48px;
}
```

```js playground-file apollo-mutation-example main.js
import '@apollo-elements/components';
document.documentElement.classList.add("sl-theme-dark");
```

</div>

</div>

</section>
