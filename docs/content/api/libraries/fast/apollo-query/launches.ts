import type { Binding, ViewTemplate } from '@microsoft/fast-element';
import { FASTElement, customElement, html, repeat } from '@microsoft/fast-element';
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
