---
layout: sidebar.webc
section: guides
title: Usage
permalink: /guides/usage/index.html
eleventyNavigation:
  order: 25
templateEngineOverride: webc,md
description: Learn the ins-and-outs of the Apollo client to help you write expressive web apps with Apollo Elements
---

# Usage

Once you've [gotten set up](/guides/getting-started/), it's time to start 
building your app's components. What does building an app with GraphQL look 
like? What kinds of components does it have? This introductory guide will help 
you understand what it's like to build with Apollo Elements.

## The Concept

In a GraphQL app, you'll use [queries and 
mutations](https://graphql.org/learn/queries/) to interact with your 
application's [data graph](https://graphql.org/learn/thinking-in-graphs/). 
GraphQL helps you model your frontend's data in terms of queries.

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

<sprite-icon name=space-capsule></sprite-icon>

A query is a self-contained slice of the _state of your app's data graph_, and a 
mutation is a self-contained _action to affect a slice of your graph_. They fit 
naturally into the data-driven web components development model, since a web 
component is a self-contained unit of HTML UI with programmer-defined 
behaviours.

Using Apollo Elements, you'll build [query components](./queries/) to fetch and 
display data from the graph and [mutation components](./mutations/) to make 
changes to the graph. You can also publish self-contained GraphQL components for 
others to use in their apps, for example if multiple teams work on the same 
large dashboard app.

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
         alt="Portrait of Neil"/>
  </astro-naut>
  <astro-naut id="2" name="Buzz">
    <img src="/avatars/buzz.png"
         alt="Portrait of Buzz"/>
  </astro-naut>
```

    </dd>
  </dl>
</figure>

## Many Paths to Success

With Apollo Elements, you can write declarative templates and styles for your 
component in HTML, or you can leverage your favourite web-components library to 
write your own custom query, mutation, or subscription component. Apollo 
Elements coordinates between your UI library of choice (or your declarative HTML 
template) and the Apollo client. Add your query, template, styles, and custom 
behaviours to Apollo Elements' components, base classes, or helpers functions.

The tabs below demonstrate multiple ways to write the same query component:

<code-tabs collection="libraries" default-tab="html">
  <code-tab @tab="$data.codeTabs.html">

  ```html
  <apollo-query>
    <!-- Use a script child like so,
or set the `query` DOM property on the element -->
    <script type="application/json">
    query Users {
      users {
        id
        name
        picture
      }
    }
    </script>
    <template>
      <h2>Astronauts</h2>
      <template type="repeat" repeat="{{ data.users }}">
        <astro-naut id="{{ item.id }}" name="{{ 
          item.name }}">
          <img src="{{ item.picture }}"
            alt="Portrait of {{ item.name }}"/>
        </astro-naut>
      </template>
    </template>
  </apollo-query>
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.js">

  ```js
  import { ControllerHostMixin } from '@apollo-elements/mixins/controller-host-mixin';
  import { ApolloQueryController } from '@apollo-elements/core/apollo-query-controller';

  const template = document.createElement("template");
  template.innerHTML = `
    <h2>Astronauts</h2>
    <div id="astronauts"></div>
  `;

  const itemTemplate = document.createElement("template");
  itemTemplate.innerHTML = `
    <astro-naut name="">
      <img />
    </astro-naut>
  `;

  class Astronauts extends ApolloQueryMixin(HTMLElement) {
    query = new ApolloQueryController(this, gql`
      query Users {
        users {
          id
          name
          picture
        }
      }
    `)

    constructor() {
      super();
      this
        .attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true));
    }

    update() {
      this.render();
      super.update();
    }

    update() {
      const node = this.shadowRoot.getElementById('astronauts');
      for (const child of node.children)
        child.remove();
      for (const { id, name , picture } of this.data?.users ?? []) {
        const astronode = itemTemplate.content.cloneNode(true);
        astronode.id = id;
        astronode.name = name;
        const img = astronode.querySelector('img');
        img.src = picture;
        img.alt = `Portrait of ${name}`;
        node.appendChild(astronode);
      }
    }
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```js
  import { ApolloQueryController } from '@apollo-elements/core/apollo-query-controller';

  class Astronauts extends ApolloQuery {
    query = new ApolloQueryController(this, gql`
      query Users {
        users {
          id
          name
          picture
        }
      }
    `);

    render() {
      return html`
        <h2>Astronauts</h2>
        ${(this.query.data?.users ?? []).map(({ id, name, picture }) => html`
        <astro-naut id="${ id }" name="${ name }">
          <img src="${ picture }"
               alt="Portrait of ${ name }"/>
        </astro-naut>
        `)}
      `;
    }
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  import type { TypedDocumentNode } from '@apollo/client/core';
  import type { Binding, ViewTemplate } from '@microsoft/fast-element';

  import { FASTElement, customElement, html } from '@microsoft/fast-element';
  import { ApolloQueryBehavior } from '@apollo-elements/fast';

  const astronautTemplate: ViewTemplate<Astronaut> = html`
    <astro-naut id="${getId}" name="${getName}">
      <img src="${getPicture}"
           alt="Portrait of ${getName}"/>
    </astro-naut>
  `;

  const template: ViewTemplate<Astronauts> = html`
    <h2>Astronauts</h2>
    ${repeat(getAstronauts, astronautTemplate)}
  `;

  const AstronautsQuery: TypedDocumentNode<{ users: { id: string; name: string; picture: string } }> = gql`
    query Users {
      users {
        id
        name
        picture
      }
    }
  `;

  @customElement({ name: 'astro-nauts', template })
  class Astronauts extends FASTElement {
    query = new ApolloQueryBehavior(this, AstronautsQuery);
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```js
  function Astronauts() {
    const { data } = useQuery(gql`
      query Users {
          users {
            id
            name
            picture
          }
        }
    `);

    return html`
      <h2>Astronauts</h2>
      ${(data?.users ?? []).map(({ id, name, picture }) => html`
      <astro-naut id="${ id }" name="${ name }">
        <img src="${ picture }"
             alt="Portrait of ${ name }"/>
      </astro-naut>
      `)}
    `;
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```jsx
  function Astronauts() {
    const { data } = useQuery(gql`
      query Users {
          users {
            id
            name
            picture
          }
        }
    `);

    return (
      <host shadowDom>
        <h2>Astronauts</h2>
        {(data?.users ?? []).map(({ id, name, picture }) => (
        <astro-naut id={id} name={nam }>
          <img src={picture}
               alt="Portrait of {name}"/>
        </astro-naut>
        ))}
      </host>
    );
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```js
  import { query } from '@apollo-elements/hybrids/factories/query';

  define('astro-nauts', {
    query: query(gql`
      query Users {
          users {
            id
            name
            picture
          }
        }
    `),
    render: host => html`
      <h2>Astronauts</h2>
      ${(host.query.data?.users ?? []).map(({ id, name, picture }) => html`
      <astro-naut id="${ id }" name="${ name }">
        <img src="${ picture }"
             alt="Portrait of ${ name }"/>
      </astro-naut>
      `)}
    `,
  });
  ```

  </code-tab>
</code-tabs>

Apollo Elements doesn't lock you in to one way of working. You can build an 
app's components piecemeal from several different libraries using multiple 
different paradigms, and they can all consume each other, communicate with each 
other, and coexist with one another, and couldn't we use some more of that?

## Next Steps
- Learn how to use [GraphQL query components](./queries/) to fetch and display your app's data
- Learn how to use [GraphQL mutation components](./mutations/) to make changes to your data graph
- Learn how to use [GraphQL subscription components](./subscriptions/) to add real-time updates to your app

<style>
  .icon.space-capsule {
    float: right;
    opacity: 0.75;
    width: 40%;
    margin: 0 auto;
    margin-inline-end: -8%;
    shape-outside: polygon(43.3% 1px, 57% 0px, 56.62% 10.75%, 76.17% 34.39%, 75.87% 79.91%, 63.09% 82.48%, 66% 100%, 34% 100%, 37.44% 82.09%, 24% 81%, 23% 34%, 44.18% 9.87%);
  }

  figure {
    margin: 0;
  }

  figcaption {
    font-style: italic;
  }

  .to {
    display: grid;
    gap: 12px;
    margin: 0;
    padding: 0;
    justify-items: center;
  }

  .to dt,
  .to dd {
    display: contents;
  }

  .to pre {
    background-color: transparent;
    display: inline-block;
    margin: 0;
    padding: 0;
    white-space: pre-wrap;
  }

  .to pre code {
    white-space: pre-wrap;
  }

  .to dd::before {
    content: '↓';
    font-size: 3em;
    font-weight: 100;
  }

  @media (min-width: 600px) {
    .to {
      grid-auto-flow: column;
      align-items: center;
      grid-auto-columns: max-content;
      justify-items: start;
    }
    .to dd::before {
      content: '→';
    }
  }

</style>
