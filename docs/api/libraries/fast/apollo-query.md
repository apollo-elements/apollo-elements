---
layout: layout-api
package: '@apollo-elements/fast'
module: apollo-query-behavior.js
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> FAST >> ApolloQueryBehavior || 20

`ApolloQueryBehavior` extends [`ApolloQueryController`](/api/core/controllers/query/) and implements the [`Behavior`](https://www.fast.design/docs/api/fast-element.behavior) interface.

## Demo

```ts playground fast-query launches.ts
import type { Binding, ViewTemplate } from '@apollo-elements/fast';
import { FASTElement, customElement, html, repeat } from '@apollo-elements/fast';
import { ApolloQueryBehavior } from '@apollo-elements/fast';
import { styles } from './launches.css.js';
import { LaunchesQuery, Launch } from './Launches.query.graphql.js';

import '@apollo-elements/components/apollo-client';

const name = 'spacex-launches';

const getLaunches:    Binding<Launches> = x => Array.from(x.launches.data?.launchesPast ?? []);
const getMissionName: Binding<Launch>   = x => x.mission_name ?? ''
const getPatch:       Binding<Launches> = x => x.links?.mission_patch_small;
const onLimitChange:  Binding<Launches> = (x, { event }) => x.onLimitChange(event);

const template: ViewTemplate<Launches> = html`
  <fast-card>
    <h2>Launches</h2>
    <fast-number-field min=1 max=50 value=3 @change=${onLimitChange}}>
      Limit
    </fast-number-field>
    <fast-divider></fast-divider>
    <ol>${repeat(getLaunches, html`
      <li>
        <article>
          <span>${getMissionName}</span>
          <img :src="${getPatch}" alt="Badge" role="presentation"/>
        </article>
      </li>` as ViewTemplate<Launch>)}
    </ol>
  </fast-card>
`;

@customElement({ name, styles, template })
class Launches extends FASTElement {
  launches = new ApolloQueryBehavior(this, LaunchesQuery, {
    variables: { limit: 3 }
  });

  onLimitChange(event) {
    this.launches.variables = {
      limit: parseInt(event.target.value)
    };
  }
}
```


```html playground-file fast-query index.html
<script type="module" src="https://unpkg.com/@microsoft/fast-components"></script>
<fast-design-system-provider use-defaults>
{% include ../_assets/index.spacex-launches.html %}
</fast-design-system-provider>
```

```css playground-file fast-query style.css
body {
  display: grid;
  background-color: #111;
  color: white;
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  place-items: center center;
  height: 100vh;
}

apollo-client,
fast-design-system-provider {
  height: 100%;
}
```

```js playground-file fast-query launches.css.js
import { css } from '@microsoft/fast-element';
export const styles = css`
{% include ../_assets/SpacexLaunches.css %}

fast-card {
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 10px;
}

h2 {
  margin: 0;
}
`;
```

```graphql playground-file fast-query Launches.query.graphql.ts
{% include ../_assets/Launches.query.graphql.ts %};
```

Read the [query component guides](/guides/usage/queries/) for more examples and tips.
