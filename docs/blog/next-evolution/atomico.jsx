import { useQuery, c } from '@apollo-elements/atomico';
import { LaunchesQuery } from './Launches.query.graphql.js';

function Launches() {
  const { data } = useQuery(LaunchesQuery, { variables: { limit: 3 } });

  const launches = data?.launchesPast ?? [];

  return (
    <host shadowDom>
      <link rel="stylesheet" href="launches.css"/>
      <ol>{launches.map(x => (
        <li>
          <article>
            <span>{x.mission_name}</span>
            <img src={x.links.mission_patch_small} alt="Badge" role="presentation"/>
          </article>
        </li>))}
      </ol>
    </host>
  );
}

customElements.define('spacex-launches', c(Launches));
