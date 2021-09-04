---
name: Example Query
attrs: float-header
---

## Queries

<section progressive>

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
      "__typename": "Person",
      "name": "Boris Johnson",
      "picture": "https://www.pri.org/file/london-mayor-boris-johnson-zip-line-2012-01-08jpg",
      "friends": [
        { "__typename": "Person", "name": "Dominic Raab" },
        { "__typename": "Person", "name": "Sajid Javid" },
        { "__typename": "Person", "name": "Priti Patel" }
      ]
    }
  }
}
```

</section>
