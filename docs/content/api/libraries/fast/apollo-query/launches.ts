import type { Binding, ViewTemplate } from '@microsoft/fast-element';
import { FASTElement, customElement, html, repeat } from '@microsoft/fast-element';
import { ApolloQueryBehavior } from '@apollo-elements/fast';
import { styles } from './launches.css.js';
import { LaunchesQuery, Launch } from './Launches.query.graphql.js';

import '@apollo-elements/components/apollo-client';

@customElement({
  name: 'spacex-launches',
  styles,
  template: html`
    <fast-card>
      <h2>Launches</h2>
      <fast-number-field min=1 max=50 value=3 @change=${(x, { event }) => x.onLimitChange(event)}}>
        Limit
      </fast-number-field>
      <fast-divider></fast-divider>
      <ol>${repeat(x => Array.from(x.launches.data?.launchesPast ?? []), html`
        <li>
          <article>
            <span>${x => x.mission_name ?? ''}</span>
            <img :src="${x.links?.mission_patch_small}" alt="Badge" role="presentation"/>
          </article>
        </li>` as ViewTemplate<Launch>)}
      </ol>
    </fast-card>
  `,
})
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
