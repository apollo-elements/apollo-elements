---
name: ApolloQueryController flavours
attrs: float-header
---

## `ApolloQueryController` flavours

### Lit

```ts
query = new ApolloQueryController(this, UserProfileQuery);
```

<section reveal>

### FAST
```ts
query = new ApolloQueryBehavior(this, UserProfileQuery);
```

</section>

<section reveal>

### Hooks (Haunted, Atomico)

```ts
const { data, loading } = useQuery(UserProfileQuery);
```

</section>

<section reveal>

### Hybrids

```ts
query: query(UserProfileQuery),
```

</section>
