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
      "name": "Charlie Chaplin",
      "picture": "https://photo.charliechaplin.com/images/photos/0000/0296/CC_233_big.jpg",
      "friends": [
        { "__typename": "Person", "name": "Buster Keaton" },
        { "__typename": "Person", "name": "Hedy Lamarr" },
        { "__typename": "Person", "name": "Conrad Veidt" }
      ]
    }
  }
}
```

</section>
