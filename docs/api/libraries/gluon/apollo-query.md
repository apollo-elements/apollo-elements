---
layout: layout-api
package: '@apollo-elements/gluon'
module: apollo-query.js
templateEngineOverride: njk,md
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> Gluon >> ApolloQuery || 20

`ApolloQuery` inherits from `ApolloElement` and implements the [`ApolloQueryInterface`](/api/core/interfaces/query/).

## Demo

{% set query %}{% include '../_assets/Launches.query.graphql' %}{% endset %}
{% set style %}{% include '../_assets/SpacexLaunches.css' %}{% endset %}

```ts playground gluon-query launches.js
import { ApolloQuery, html } from '@apollo-elements/gluon';
import { gql } from '@apollo/client/core';

import '@apollo-elements/components/apollo-client';

class SpacexLaunches extends ApolloQuery {
  constructor() {
    super();
    this.variables = { limit: 3 };
    this.query = gql`
      {{ query | trim | indent(6) }}
    `;
  }

  get template() {
    const launches = this.data?.launchesPast ?? [];
    return html`
      <style>
        {{ style | trim | indent(8) }}
      </style>
      <ol>${launches.map(x => html`
        <li>
          <article>
            <span>${x.mission_name ?? ''}</span>
            <img .src="${x.links?.mission_patch_small}" alt="Badge" role="presentation"/>
          </article>
        </li>`)}
      </ol>
    `;
  }
}

customElements.define(SpacexLaunches.is, SpacexLaunches);
```

```html playground-file gluon-query index.html
{% include '../_assets/index.spacex-launches.html' %}
```

Read the [query component guides](../../../../guides/usage/queries/) for more examples and tips.
