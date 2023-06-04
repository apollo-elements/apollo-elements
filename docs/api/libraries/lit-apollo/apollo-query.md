---
layout: layout-api
package: '@apollo-elements/lit-apollo'
module: apollo-query.js
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> lit-apollo >> ApolloQuery || 20

<inline-notification type="tip" title="Looking for Controllers?">

Looking for reactive Apollo query controllers? See [`@apollo-elements/core/apollo-query-controller`](/api/core/controllers/query/).

</inline-notification>

`ApolloQuery` inherits from `ApolloElement` and implements the [`ApolloQueryInterface`](/api/core/interfaces/query/).

## Demo

<launches-playground>

    <playground-file name="launches.ts" language="typescript">
```ts
import { ApolloQuery, html } from '@apollo-elements/lit-apollo';
import { customElement } from 'lit/decorators.js';
import { LaunchesQuery } from './Launches.query.graphql.js';
import { style } from './SpacexLaunches.css.js';
import '@apollo-elements/components/apollo-client';

@customElement('spacex-launches')
class SpacexLaunches extends ApolloQuery<typeof LaunchesQuery> {
  static readonly styles = style;

  variables = { limit: 3 };

  query = LaunchesQuery;

  render() {
    const launches = this.data?.launchesPast ?? [];
    return html`
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
```
    </playground-file>


</launches-playground>

Read the [query component guides](../../../../guides/usage/queries/) for more examples and tips.
