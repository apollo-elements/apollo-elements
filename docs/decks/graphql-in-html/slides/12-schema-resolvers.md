---
name: Schema Resolvers
---

<section>

The GraphQL Schema tells your server the type of each object.

<section class="progressive">

```graphql
type Person {



}
```

```graphql reveal
type Person {
  name: String
  picture: String

}
```

```graphql reveal
type Person {
  name: String
  picture: String
  friends: [Person]
}
```

</section>

</section>

<section reveal>

The resolvers define the contents of each field.

<section id="resolvers" class="progressive">

```js reveal
export const PersonResolvers = {





}
```

```js reveal
export const PersonResolvers = {
  picture: ({ id }, args, context) =>
    context.dataSources.Person.getPictureById(id),



}
```

```js reveal
export const PersonResolvers = {
  picture: ({ id }, args, context) =>
    context.dataSources.Person.getPictureById(id),
  friends: ({ friends }, args, context) =>
    friends
      .map(id => context.dataSources.Person.getPersonById(id)),
}
```

</section>

</section>

<style data-helmet>
[name="Schema Resolvers"]::part(content) {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 1em;
}
#resolvers pre {
  font-size: 60%;
}
</style>
