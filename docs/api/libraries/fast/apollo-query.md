---
layout: layout-api
package: '@apollo-elements/fast'
module: apollo-query.js
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> FAST >> ApolloQuery || 20

`ApolloQuery` inherits from `ApolloElement` and implements the [`ApolloQueryInterface`](/api/core/interfaces/query/).

## Demo

```ts playground fast-query launches.ts
import { ApolloQuery, customElement, html, repeat } from '@apollo-elements/fast';
import { styles } from './launches.css.js';
import { LaunchesQuery } from './Launches.query.graphql.js';
import { compose, map, propOr, unary } from './fp-helpers.js';

import '@apollo-elements/components/apollo-client';

const getLaunches = compose(
  unary(Array.from),
  propOr('launchesPast', []),
  propOr('data', null)
);

const getPatch = compose(propOr('mission_patch_small'), propOr('links'));

@customElement({
  name: 'spacex-launches',
  styles,
  template: html<Launches>`
    <ol>${repeat(compose(getLaunches), html`
      <li>
        <article>
          <span>${propOr('mission_name', '')}</span>
          <img :src="${getPatch}" alt="Badge" role="presentation"/>
        </article>
      </li>`)}
    </ol>
  `,
})
class Launches extends ApolloQuery<typeof LaunchesQuery> {
  query = LaunchesQuery;

  variables = { limit: 3 };
}
```

```js playground-file fast-query fp-helpers.js
/** right-to-left function composition */
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

/** safe property access */
export const propOr = (name, or) => o => o?.[name] ?? or;

/** safe point-free array map */
export const map = f => xs => xs?.map?.(f) ?? [];

/** nary function to unary function */
export const unary = f => x => f(x);
```

```html playground-file fast-query index.html
{% include ../_assets/index.spacex-launches.html %}
```

```js playground-file fast-query launches.css.js
import { css } from '@microsoft/fast-element';
export const styles = css`{% include ../_assets/SpacexLaunches.css %}`;
```

```graphql playground-file fast-query Launches.query.graphql.ts
{% include ../_assets/Launches.query.graphql.ts %};
```

Read the [query component guides](/guides/usage/queries/) for more examples and tips.
