---
name: UI f query
---

<figure class="sl-theme-dark">
<figcaption flex column center>

ui = _f_(query)

</figcaption>

<dl id="query-to-data" reveal>
  <dt>

  ```graphql
  query AllUsers {
    users {
      id
      name
      picture
      bio
    }
  }
  ```

  </dt>

  <dd reveal>
  <sl-card class="fake-user" style="--b: 0.6">
    <sl-skeleton class="avatar"></sl-skeleton>
    <sl-skeleton class="name"></sl-skeleton>
    <sl-skeleton></sl-skeleton>
    <sl-skeleton></sl-skeleton>
    <sl-skeleton></sl-skeleton>
  </sl-card>

  <sl-card class="fake-user" style="--a: 0.7; --b: 0.9">
    <sl-skeleton class="avatar"></sl-skeleton>
    <sl-skeleton class="name"></sl-skeleton>
    <sl-skeleton></sl-skeleton>
    <sl-skeleton></sl-skeleton>
    <sl-skeleton></sl-skeleton>
  </sl-card>

  <sl-card class="fake-user" style="--a: 0.9; --b: 0.8">
    <sl-skeleton class="avatar"></sl-skeleton>
    <sl-skeleton class="name"></sl-skeleton>
    <sl-skeleton></sl-skeleton>
    <sl-skeleton></sl-skeleton>
    <sl-skeleton></sl-skeleton>
  </sl-card>
  </dd>

</dl>
</figure>
