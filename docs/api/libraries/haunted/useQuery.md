---
layout: layout-api
package: '@apollo-elements/haunted'
module: useQuery.js
---
# Web Component Libraries >> Haunted >> useQuery || 10

Apollo `useQuery` hook for web components. Elements that call `useQuery` inherit the [`ApolloQueryInterface`](/api/interfaces/query/).

Read the [query component guides](../../../../guides/usage/queries/) for examples and tips.

<style data-helmet>
#use-query {
  --playground-ide-height: 350px;
  margin-bottom: 16px;
}
</style>

```graphql playground-file use-query Launches.query.graphql
query LaunchesQuery($limit: Int) {
  launchesPast(limit: $limit) {
    mission_name
    links { mission_patch_small }
  }
}

```

```html playground-file use-query index.html
<script type="module" src="launches.js"></script>
<apollo-client uri="https://api.spacex.land/graphql">
  <spacex-launches>
    <script type="application/json">{ "limit": 3 }</script>
    <script type="application/graphql" src="Launches.query.graphql"></script>
  </spacex-launches>
</apollo-client>
```

```js playground use-query launches.js
import { useEffect, useQuery, component, html } from '@apollo-elements/haunted';
import { GraphQLScriptChildMixin } from '@apollo-elements/mixins';
import '@apollo-elements/components';

function Launches({ document = null, variables = null }) {
  const query = useQuery(null, { hostElement: this });

  useEffect(() => { query.variables = variables }, [variables]);
  useEffect(() => { query.query = document }, [document]);

  const launches = query.data?.launchesPast ?? [];

  return html`
    <ol>
      ${launches.map(x => html`
        <li>
          ${x.mission_name}
          <img .src=${x.links.mission_patch_small}/>
        </li>
      `)}
    </ol>
  `;
}

customElements.define('spacex-launches', GraphQLScriptChildMixin(component(Launches)));
```
