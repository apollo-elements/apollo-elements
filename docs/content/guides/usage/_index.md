---
title: Usage
weight: 25
description: Learn the ins-and-outs of the Apollo client to help you write expressive web apps with Apollo Elements
sidebar: guides
---

Once you've [gotten set up](/guides/getting-started/), it's time to start building your app's components. What does building an app with GraphQL look like? What kinds of components does it have? This introductory guide will help you understand what it's like to build with Apollo Elements.

## The Concept

In a GraphQL app, you'll use [queries and mutations](https://graphql.org/learn/queries/) to interact with your application's [data graph](https://graphql.org/learn/thinking-in-graphs/). GraphQL helps you model your frontend's data in terms of queries.

<figure>
<figcaption>GraphQL: Query to Data</figcaption>
<dl class="to" id="query-to-data">
  <dt>

  ```graphql
  query Users {
    users {
      id
      name
      picture
    }
  }
  ```

  </dt>

  <dd>

  ```json
  {
    "data": {
      "users": [
        { "id": 1, "name": "Neil", "picture": "/avatars/neil.png" },
        { "id": 2, "name": "Buzz", "picture": "/avatars/buzz.png" }
      ]
    }
  }
  ```

  </dd>
</dl>
</figure>

<!-- TODO: Icon "space-capsule" - needs Hugo shortcode -->

A query is a self-contained slice of the _state of your app's data graph_, and a mutation is a self-contained _action to affect a slice of your graph_. They fit naturally into the data-driven web components development model, since a web component is a self-contained unit of HTML UI with programmer-defined behaviours.

Using Apollo Elements, you'll build [query components](./queries/) to fetch and display data from the graph and [mutation components](./mutations/) to make changes to the graph. You can also publish self-contained GraphQL components for others to use in their apps, for example if multiple teams work on the same large dashboard app.

<figure>
<figcaption>Apollo Elements: Query to UI</figcaption>
<dl class="to" id="query-to-ui">
  <dt>

  ```graphql
  query Users {
    users {
      id
      name
      picture
    }
  }
  ```

  </dt>

  <dd>

  ```html
    <astro-naut id="1" name="Neil">
      <img src="/avatars/neil.png"
           alt="Portrait of Neil">
    </astro-naut>
    <astro-naut id="2" name="Buzz">
      <img src="/avatars/buzz.png"
           alt="Portrait of Buzz">
    </astro-naut>
  ```

  </dd>
</dl>
</figure>

## Many Paths to Success

With Apollo Elements, you can write declarative templates and styles for your component in HTML, or you can leverage your favourite web-components library to write your own custom query, mutation, or subscription component. Apollo Elements coordinates between your UI library of choice (or your declarative HTML template) and the Apollo client. Add your query, template, styles, and custom behaviours to Apollo Elements' components, base classes, or helpers functions.

The tabs below demonstrate multiple ways to write the same query component:

<code-tabs collection="libraries" default-tab="html">
  {{<code-tab package="html">}}{{<include astronauts-html.html>}}{{</code-tab>}}
  {{<code-tab package="mixins">}}{{<include astronauts-mixins.js>}}{{</code-tab>}}
  {{<code-tab package="lit">}}{{<include astronauts-lit.js>}}{{</code-tab>}}
  {{<code-tab package="fast">}}{{<include astronauts-fast.ts>}}{{</code-tab>}}
  {{<code-tab package="haunted">}}{{<include astronauts-haunted.js>}}{{</code-tab>}}
  {{<code-tab package="atomico">}}{{<include astronauts-atomico.jsx>}}{{</code-tab>}}
  {{<code-tab package="hybrids">}}{{<include astronauts-hybrids.js>}}{{</code-tab>}}
</code-tabs>

Apollo Elements doesn't lock you in to one way of working. You can build an app's components piecemeal from several different libraries using multiple different paradigms, and they can all consume each other, communicate with each other, and coexist with one another, and couldn't we use some more of that?

## Next Steps
- Learn how to use [GraphQL query components](./queries/) to fetch and display your app's data
- Learn how to use [GraphQL mutation components](./mutations/) to make changes to your data graph
- Learn how to use [GraphQL subscription components](./subscriptions/) to add real-time updates to your app
