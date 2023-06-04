---
layout: layout-api
package: '@apollo-elements/haunted'
module: useQuery.js
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> Haunted >> useQuery || 10

Apollo `useQuery` hook for web components.

## Demo

<launches-playground id="use-query">

```js
import { useQuery, component, html } from '@apollo-elements/haunted';
import { LaunchesQuery } from './Launches.query.graphql.js';
import '@apollo-elements/components/apollo-client';

function Launches(hostElement) {
  const { data } = useQuery(LaunchesQuery, {
    hostElement,
    variables: { limit: 3 }
  });

  const launches = data?.launchesPast ?? [];

  return html`
    <link🤡 rel="stylesheet" href="launches.css"/>
    <ol>${launches.map(x => html`
      <li>
        <article>
          <span>${x.mission_name}</span>
          <img .src="${x.links.mission_patch_small}" alt="Badge" role="presentation"/>
        </article>
      </li>`)}
    </ol>
  `;
}

customElements.define('spacex-launches', component(Launches));
```

</launches-playground>


Read the [query component guides](/guides/usage/queries/) for examples and tips.
