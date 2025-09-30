import { ApolloQuery, html } from '@apollo-elements/gluon';
import { gql } from '@apollo/client/core';

import '@apollo-elements/components/apollo-client';

class SpacexLaunches extends ApolloQuery {
  constructor() {
    super();
    this.variables = { limit: 3 };
    this.query = gql`
      {{ query | trim | indent(6) }}
    `;
  }

  get template() {
    const launches = this.data?.launchesPast ?? [];
    return html`
      <style>
        {{ style | trim | indent(8) }}
      </style>
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

customElements.define(SpacexLaunches.is, SpacexLaunches);
