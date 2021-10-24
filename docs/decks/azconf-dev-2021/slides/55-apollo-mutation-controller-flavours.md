---
name: ApolloMutationController flavours
attrs: float-header
---

## `ApolloMutationController` flavours

### Lit

```ts
mutation = new ApolloMutationController(this, UpdateProfileMutation);
```

<section reveal>

### FAST
```ts
mutation = new ApolloMutationBehavior(this, UpdateProfileMutation);
```

</section>

<section reveal>

### Hooks (Haunted, Atomico)

```ts
const [updateProfile, { data, loading }] = useMutation(UpdateProfileMutation);
```

</section>

<section reveal>

### Hybrids

```ts
mutation: mutation(UpdateProfileMutation),
```

</section>
