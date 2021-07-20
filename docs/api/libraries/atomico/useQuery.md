---
layout: layout-api
package: '@apollo-elements/atomico'
module: useQuery.js
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> Atomico >> useQuery || 10

Apollo `useQuery` hook for web components.

## Demo

<style data-helmet>
#use-query {
  --playground-ide-height: 350px;
}
</style>

```js playground use-query launches.js
import { useQuery, c, html } from '@apollo-elements/atomico';
import { LaunchesQuery } from './Launches.query.graphql.js';
import { client } from './client.js';

function Launches() {
  const { data } = useQuery(LaunchesQuery, { client, variables: { limit: 3 } });

  const launches = data?.launchesPast ?? [];

  return html`
    <host shadowDom>
      <link rel="stylesheet" href="launches.css"/>
      <ol>${launches.map(x => html`
        <li>
          <article>
            <span>${x.mission_name}</span>
            <img src=${x.links.mission_patch_small} alt="Badge" role="presentation"/>
          </article>
        </li>`)}
      </ol>
    </host>
  `;
}

customElements.define('spacex-launches', c(Launches));
```

```html playground-file use-query index.html
{% include ../_assets/index.spacex-launches.html %}
```

```css playground-file use-query launches.css
{% include ../_assets/SpacexLaunches.css %}
```

```graphql playground-file use-query Launches.query.graphql.ts
{% include ../_assets/Launches.query.graphql.ts %};
```

```js playground-file use-query client.js
{% include ../_assets/client.spacex.export.js %}
```

Read the [query component guides](/guides/usage/queries/) for more examples and tips.
