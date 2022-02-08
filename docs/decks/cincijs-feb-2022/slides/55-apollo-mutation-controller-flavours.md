---
name: ApolloMutationController flavours
---

## `ApolloMutationController` flavours

<dl class="flavours">

  <dt><img alt="Lit" src="/_merged_assets/brand-logos/lit.svg"></dt>
  <dd>
  
  ```ts
  mutation = new ApolloMutationController(this, UpdateProfileMutation);
  ```
  
  </dd>

  <dt><img alt="FAST" src="/_merged_assets/brand-logos/fast.svg"></dt>
  <dd>
  
  ```ts
  mutation = new ApolloMutationBehavior(this, UpdateProfileMutation);
  ```
  
  </dd>

  <dt><img alt="Haunted" src="/_merged_assets/brand-logos/haunted.svg"></dt>
  <dd>
  
  ```ts
  const [updateProfile, { data, loading }] = useMutation(UpdateProfileMutation);
  ```
  
  </dd>

  <dt><img alt="Hybrids" src="/_merged_assets/brand-logos/hybrids.svg"></dt>
  <dd>
  
  ```ts
  mutation: mutation(UpdateProfileMutation),
  ```
  
  </dd>

</dl>

