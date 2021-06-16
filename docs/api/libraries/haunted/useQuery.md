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

Read the [query component guides](/guides/usage/queries/) for examples and tips.

<style data-helmet>
#use-query {
  --playground-ide-height: 350px;
}
</style>

```graphql playground-file use-query Launches.query.graphql.js
import { gql } from '@apollo/client/core';
export const LaunchesQuery = gql`
query LaunchesQuery($limit: Int) {
  launchesPast(limit: $limit) {
    mission_name
    links { mission_patch_small }
  }
}
`;
```

```html playground-file use-query index.html
<script type="module" src="client.js"></script>
<script type="module" src="launches.js"></script>
<spacex-launches></spacex-launches>
```

```js playground use-query launches.js
import { useQuery, component, html } from '@apollo-elements/haunted';
import { LaunchesQuery } from './Launches.query.graphql.js';

function Launches({ document = null, variables = null }) {
  const { data } = useQuery(LaunchesQuery, { variables: { limit: 3 } });

  const launches = data?.launchesPast ?? [];

  return html`
    <link rel="stylesheet" href="launches.css"/>
    <ol>
      ${launches.map(x => html`
        <li>
          <article>
            <span>${x.mission_name}</span>
            <img .src="${x.links.mission_patch_small}" alt="Badge" role="presentation"/>
          </article>
        </li>
      `)}
    </ol>
  `;
}

customElements.define('spacex-launches', component(Launches));
```

```css playground-file use-query launches.css
:host {
  --image-size: 40px;
}

li img {
  height: var(--image-size);
  width: auto;
}

li article {
  height: var(--image-size);
  display: flex;
  justify-content: space-between;
}
```

```js playground-file use-query client.js
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

window.__APOLLO_CLIENT__ = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://api.spacex.land/graphql' }),
});
```
