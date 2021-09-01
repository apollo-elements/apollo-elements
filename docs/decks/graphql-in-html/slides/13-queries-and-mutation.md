---
name: Queries and Mutations
---

## Queries and Mutations

Unlike REST APIs, GraphQL exposes a **single endpoint**.

<section reveal style="order: 3">

There are only two verbs in GraphQL: `query` reads the graph and `mutation` updates the graph.

</section>

<section reveal style="align-self: center;">

<dl class="analogy" center>
  <dt><code>GET</code></dt>
  <dd><code>query</code></dd>
  <dt><code>POST</code>,<br/><code>PUT</code>,<br/><code>DELETE</code></dt>
  <dd><code>mutation</code></dd>
</dl>

</section>

<style data-helmet>
[name="Queries and Mutations"]::part(content) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

dl.analogy {
  display: grid;
  grid-template-columns: min-content auto;
  gap: 1em;
  align-items: end;
}

dl.analogy dt,
dl.analogy dd {
  display: inline-block;
}

dl.analogy dd::before {
  content: '⇒';
  margin-inline-end: 1em
}
</style>
