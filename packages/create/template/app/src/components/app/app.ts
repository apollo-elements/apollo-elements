import { ApolloQuery, customElement, html, TemplateResult } from '@apollo-elements/lit-apollo';

import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';

import type {
  AppQueryData as Data,
  AppQueryVariables as Variables,
} from '../../schema';

import AppQuery from './App.query.graphql';
import style from './app.css';
import shared from '../shared.css';

import { locationVar } from '../../router';

@customElement('apollo-app')
export class ApolloApp extends TypePoliciesMixin(ApolloQuery)<Data, Variables> {
  static readonly is = 'apollo-app';

  static readonly style = [shared, style];

  query = AppQuery;

  typePolicies = {
    Query: {
      fields: {
        location(): Location {
          return locationVar();
        },
      },
    },
  }

  render(): TemplateResult {
    return html`
      <h1>Apollo Elements App</h1>
      <p>Latest launch was ${this.data?.launchLatest?.missionName ?? '...'}</p>
    `;
  }
}
