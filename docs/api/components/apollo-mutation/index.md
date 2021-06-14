---
layout: layout-api
package: '@apollo-elements/components'
module: apollo-mutation.js
templateEngineOverride: njk,md
description: Write declarative GraphQL mutations with &lt;apollo-mutation&gt; custom element. Write your GraphQL and variables in HTML, even use inputs to define variables. Do more with less code with Apollo Elements and web components.
---

# Components >> apollo-mutation || 30

Provides a way to declare mutations and their variables, including input components.

Inherits from [`ApolloMutationInterface`](/api/interfaces/mutation/)

{% block demo %}
## Live Demo

```html playground mutation-component index.html
<script type="module" src="components.js"></script>
<apollo-client uri="https://api.spacex.land/graphql">
  <apollo-mutation refetch-queries="LatestUsers">
    <script type="application/graphql" src="InsertUser.mutation.graphql"></script>
    <template>
      <link rel="stylesheet" href="InsertUser.css"/>
      <p-card>
        <h2 slot="heading">Add a User</h2>
        <p>Complete the form to add a user.</p>

        <p ?hidden="{%raw%}{{ !data }}{%endraw%}">{%raw%}{{ data.insert_users.returning[0].name }}{%endraw%} added!</p>

        <slot slot="actions"></slot>
      </p-card>
    </template>

    <mwc-textfield data-variable="name" label="User name" outlined></mwc-textfield>
    <mwc-button trigger label="Add user"></mwc-button>
  </apollo-mutation>
</apollo-client>
```

```graphql playground-file mutation-component InsertUser.mutation.graphql
mutation InsertUser($name: String!) {
  insert_users(objects: {name: $name}) {
    returning {
      name
      id
      timestamp
    }
  }
}
```

```css playground-file mutation-component InsertUser.css
[hidden] { display: none {%raw%}!important{%endraw%}; }
```

```js playground-file mutation-component components.js
import '@apollo-elements/components';
import '@power-elements/card';
import '@material/mwc-button';
import '@material/mwc-textfield';
```
{% endblock %}
