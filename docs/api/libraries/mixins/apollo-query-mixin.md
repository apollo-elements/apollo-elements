---
layout: layout-api
package: '@apollo-elements/mixins'
module: apollo-query-mixin.js
templateEngineOverride: njk,md
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> Class Mixins >> ApolloQueryMixin || 20

`ApolloQueryMixin` applies `ApolloElementMixin` and the [`ApolloQueryInterface`](/api/core/interfaces/query/).

## Demo

{% set query %}{% include '../_assets/Launches.query.graphql' %}{% endset %}
{% set style %}{% include '../_assets/SpacexLaunches.css' %}{% endset %}

```ts playground mixins-query launches.js
import { ApolloQueryMixin } from '@apollo-elements/mixins';
import { gql } from '@apollo/client/core';

import '@apollo-elements/components/apollo-client';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    {{ style | trim | indent(6) }}
  </style>
  <ol></ol>
`;

const itemTemplate = document.createElement('template');
itemTemplate.innerHTML = `
  <li>
    <article>
      <span></span>
      <img alt="Badge" role="presentation"/>
    </article>
  </li>
`;

class SpacexLaunches extends ApolloQueryMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
    this.variables = { limit: 3 };
    this.query = gql`
      {{ query | trim | indent(6) }}
    `;
  }

  update() {
    for (const launch of this.data?.launchesPast ?? [])
      this.renderLaunch(launch)
    super.update();
  }

  renderLaunch(launch) {
    if (this.shadowRoot.getElementById(launch.id))
      return;
    const node = itemTemplate.content.cloneNode(true);
    node.querySelector('span').textContent = launch.mission_name;
    node.querySelector('li').id = launch.id;
    if (launch.links?.mission_patch_small)
      node.querySelector('img').src = launch.links.mission_patch_small
    this.shadowRoot.querySelector('ol').append(node);
  }
}

customElements.define('spacex-launches', SpacexLaunches);
```

```html playground-file mixins-query index.html
{% include '../_assets/index.spacex-launches.html' %}
```

Read the [query component guides](../../../../guides/usage/queries/) for more examples and tips.
