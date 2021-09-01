---
name: UI f query
attributes: fade-in
---
<link data-helmet rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.49/dist/themes/dark.css">
<script data-helmet type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.49/dist/shoelace.js"></script>

<figure class="sl-theme-dark">
<figcaption flex column center>

ui = _f_(query)

</figcaption>

<dl id="query-to-data" reveal>
  <dt>

  ```graphql
  query Users {
    users {
      id
      name
      picture
      bio
    }
  }
  ```

  </dt>

  <div reveal></div>

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

<style data-helmet>
[name="UI f query"] figure {
  margin: 0;
  --casl:1;
}

[name="UI f query"] figcaption {
  font-size:20vh;
}

#query-to-data {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
}

#query-to-data pre {
  margin: 0;
}

#query-to-data div {
  grid-row: -1/1;
  grid-column: 2/3;
  font-size: 4rem;
  place-self: center;
}

#query-to-data div::after {
  content: '⇒';
}

#query-to-data dd {
  display: grid;
  gap: 2rem;
}

.fake-user {
  width: 100%;
}

.fake-user .name {
  height: 2rem;
  width: calc(90% * var(--b, 1));
  align-self: center;
}

sl-skeleton:nth-last-child(-n+3) {
  grid-column: -1/1;
}

sl-skeleton:last-child {
  width: calc(80% * var(--a, 1));
}

.fake-user::part(body) {
  display: grid;
  gap: 1rem;
  grid-template:
    'a n' 3rem
    'b b' auto
    'b b' auto
    'b b' auto / 3rem auto;
}

sl-skeleton.avatar {
  width: 3rem;
  height: 3rem;
}
</style>
