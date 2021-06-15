---
layout: layout-api
package: '@apollo-elements/fast'
module: 'apollo-query.js'
---
# Web Component Libraries >> FAST >> ApolloQuery || 20

`ApolloQuery` inherits from `ApolloElement` and implements the [`ApolloQueryInterface`](/api/core/interfaces/query/).

Read the [query component guides](/guides/usage/queries/) for examples and tips.

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
    <ol>
      ${repeat(compose(getLaunches), html`
        <li>
          <article>
            <span>${propOr('mission_name', '')}</span>
            <img :src="${getPatch}" alt="Badge" role="presentation"/>
          </article>
        </li>
      `)}
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

```graphql playground-file fast-query Launches.query.graphql.js
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

```html playground-file fast-query index.html
<script type="module" src="launches.js"></script>
<apollo-client uri="https://api.spacex.land/graphql">
  <spacex-launches></spacex-launches>
</apollo-client>
```

```js playground-file fast-query launches.css.js
import { css } from '@microsoft/fast-element';
export const styles = css`
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
`;
```

```js playground-file fast-query client.js
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

window.__APOLLO_CLIENT__ = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://api.spacex.land/graphql' }),
});
```
