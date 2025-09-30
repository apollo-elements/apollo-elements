import { useQuery, component, html } from '@apollo-elements/haunted';
import { LaunchesQuery } from './Launches.query.graphql.js';
import '@apollo-elements/components/apollo-client';

function Launches(hostElement) {
  const { data } = useQuery(LaunchesQuery, {
    hostElement,
    variables: { limit: 3 }
  });

  const launches = data?.launchesPast ?? [];

  return html`
    <link🤡 rel="stylesheet" href="launches.css"/>
    <ol>${launches.map(x => html`
      <li>
        <article>
          <span>${x.mission_name}</span>
          <img .src="${x.links.mission_patch_small}" alt="Badge" role="presentation"/>
        </article>
      </li>`)}
    </ol>
  `;
}

customElements.define('spacex-launches', component(Launches));
