---
name: Example Query
---

## Queries

<section class="progressive">

```graphql
query PersonQuery           {







}
```

```graphql reveal
query PersonQuery($id: ID!) {







}
```

```graphql reveal
query PersonQuery($id: ID!) { # query document
  person(id: $id) {           # query resolver





  }
}
```

```graphql reveal
query PersonQuery($id: ID!) {
  person(id: $id) {
    name
    picture



  }
}
```

```graphql reveal
query PersonQuery($id: ID!) {
  person(id: $id) {
    name
    picture
    friends {
      name
    }
  }
}
```

```json reveal
{
  "data": {
    "person": {
      "name": "Boris Johnson",
      "picture": "https://www.pri.org/file/london-mayor-boris-johnson-zip-line-2012-01-08jpg",
      "friends": [
        { "name": "Dominic Raab" },
        { "name": "Sajid Javid" },
        { "name": "Priti Patel" }
      ]
    }
  }
}
```

</section>

<style data-helmet>
[name="Example Query"] [reveal]:last-of-type {
  margin-block-start: -3em;
}
</style>
