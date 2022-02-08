---
name: ApolloQueryController flavours
---

## `ApolloQueryController` flavours

<dl class="flavours">
  <dt><img alt="Lit" src="/_merged_assets/brand-logos/lit.svg"></dt>
  <dd>

  ```ts
  query = new ApolloQueryController(this, UserProfileQuery);
  ```

  </dd>

  <dt><img alt="FAST" src="/_merged_assets/brand-logos/fast.svg"></dt>
  <dd>

  ```ts
  query = new ApolloQueryBehavior(this, UserProfileQuery);
  ```

  </dd>

  <dt><img alt="Atomico" src="/_merged_assets/brand-logos/atomico.svg"></dt>
  <dd>

  ```ts
  const { data, loading } = useQuery(UserProfileQuery);
  ```

  </dd>

  <dt><img alt="Hybrids" src="/_merged_assets/brand-logos/hybrids.svg"></dt>
  <dd>

  ```ts
  query: query(UserProfileQuery),
  ```

  </dd>

</dl>
