import { useQuery, c, html, css } from '@apollo-elements/atomico';
import { LaunchesQuery } from './Launches.query.graphql.js';
import { client } from './client.js';

function Launches() {
  const { data } = useQuery(LaunchesQuery, { client, variables: { limit: 3 } });

  const launches = data?.launchesPast ?? [];

  return html`
    <host shadowDom>
      <ol>${launches.map(x => html`
        <li>
          <article>
            <span>${x.mission_name}</span>
            <img src=${x.links.mission_patch_small} alt="Badge" role="presentation"/>
          </article>
        </li>`)}
      </ol>
    </host>
  `;
}

Launches.styles = css`
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

customElements.define('spacex-launches', c(Launches));
