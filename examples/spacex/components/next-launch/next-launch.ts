/* eslint-disable camelcase */
import {
  ApolloQuery,
  TemplateResult,
  customElement,
  html,
  property,
} from '@apollo-elements/lit-apollo';

import '../countdown-timer';

import NextLaunchQuery from './NextLaunch.query.graphql';

import {
  NextLaunchQueryData as Data,
  NextLaunchQueryVariables as Variables,
} from '../../schema';

import style from '../latest-launch/latest-launch.css';

@customElement('spacex-next-launch')
export class NextLaunch extends ApolloQuery<Data, Variables> {
  static readonly styles = [style];

  query = NextLaunchQuery;

  @property({ type: Boolean, reflect: true }) loading;

  render(): TemplateResult {
    const rocketName =
      this.data?.launchNext.rocket.rocket_name;

    const siteName =
      this.data?.launchNext.launch_site.site_name;

    const launchTime =
      this.data?.launchNext.launch_date_utc;

    const launchDate =
      launchTime && new Date(launchTime);

    const past = launchDate && launchDate.getTime() < Date.now();

    return html`
      <p>
        The next launch
        ${past ? 'was' : 'will be'} the
        ${this.loading ? '...' : html`
        <strong>${rocketName}</strong> from
        <strong>${siteName}</strong>
        ${past ? '' : 'in'}
        <strong>
          <countdown-timer datetime="${launchTime}"></countdown-timer>
        </strong>
        `}
      </p>
    `;
  }
}
