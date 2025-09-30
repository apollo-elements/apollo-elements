import { ApolloQueryMixin } from '@apollo-elements/mixins';
import { gql } from '@apollo/client/core';

import '@apollo-elements/components/apollo-client';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    {{ style | trim | indent(6) }}
  </style>
  <ol></ol>
`;

const itemTemplate = document.createElement('template');
itemTemplate.innerHTML = `
  <li>
    <article>
      <span></span>
      <img alt="Badge" role="presentation"/>
    </article>
  </li>
`;

class SpacexLaunches extends ApolloQueryMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
    this.variables = { limit: 3 };
    this.query = gql`
      {{ query | trim | indent(6) }}
    `;
  }

  update() {
    for (const launch of this.data?.launchesPast ?? [])
      this.renderLaunch(launch)
    super.update();
  }

  renderLaunch(launch) {
    if (this.shadowRoot.getElementById(launch.id))
      return;
    const node = itemTemplate.content.cloneNode(true);
    node.querySelector('span').textContent = launch.mission_name;
    node.querySelector('li').id = launch.id;
    if (launch.links?.mission_patch_small)
      node.querySelector('img').src = launch.links.mission_patch_small
    this.shadowRoot.querySelector('ol').append(node);
  }
}

customElements.define('spacex-launches', SpacexLaunches);
