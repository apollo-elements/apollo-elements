/* eslint-disable camelcase */
import {
  ApolloQuery,
  TemplateResult,
  customElement,
  html,
  property,
} from '@apollo-elements/lit-apollo';

import LatestLaunchQuery from './LatestLaunch.query.graphql';

import {
  LatestLaunchQueryData as Data,
  LatestLaunchQueryVariables as Variables,
} from '../../schema';

import style from './latest-launch.css';

@customElement('spacex-latest-launch')
export class LatestLaunch extends ApolloQuery<Data, Variables> {
  static readonly styles = [style];

  query = LatestLaunchQuery;

  @property({ type: Boolean, reflect: true }) loading;

  render(): TemplateResult {
    const rocketName =
      this.data?.launchLatest.rocket.rocket_name;

    const siteName =
      this.data?.launchLatest.launch_site.site_name_long;

    const localTime =
      this.data && new Date(this.data.launchLatest.launch_date_local).toLocaleTimeString();

    const missionName =
      this.data?.launchLatest.mission_name;

    return html`
      <p>
        The last launch was the${this.loading ? '...' : html`
        <strong>${rocketName}</strong> took off from
        <strong>${siteName}</strong> on
        <strong>${localTime}</strong> local time for the
        <strong>${missionName}</strong> mission.
        `}
      </p>
    `;
  }
}
