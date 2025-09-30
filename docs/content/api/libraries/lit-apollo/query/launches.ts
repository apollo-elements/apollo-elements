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
