---
layout: layout-api
package: '@apollo-elements/atomico'
templateEngineOverride: webc,md
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

<playground id="use-query">
    <playground-file id="use-query" name="launches.js" language="js">

```js
import { useQuery, c, html, css } from '@apollo-elements/atomico';
import { LaunchesQuery } from './Launches.query.graphql.js';
import { client } from './client.js';

function Launches() {
  const { data } = useQuery(LaunchesQuery, { client, variables: { limit: 3 } });

  const launches = data?.launchesPast ?? [];

  return html`
    <host shadowDom>
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

Launches.styles = css`
{% include '../_assets/SpacexLaunches.css' %}
`;

customElements.define('spacex-launches', c(Launches));
```
    </playground-file>

    <playground-file id="use-query" name="index.html" language="html">
    {% include '../_assets/index.spacex-launches.html' %}
    </playground-file>

    <playground-file id="use-query" name="Launches.query.graphql.ts" language="ts">
    {% include '../_assets/Launches.query.graphql.ts' %}
    </playground-file>

    <playground-file id="use-query" name="client.js" language="javascript">
    {% include '../_assets/client.spacex.export.js' %}
    </playground-file>

</playground>


Read the [query component guides](/guides/usage/queries/) for more examples and tips.
