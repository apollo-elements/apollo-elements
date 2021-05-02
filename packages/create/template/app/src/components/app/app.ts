import { ApolloQuery, html, TemplateResult } from '@apollo-elements/lit-apollo';

import { customElement } from 'lit/decorators.js';

import type {
  AppQueryData as Data,
  AppQueryVariables as Variables,
} from '../../schema';

import AppQuery from './App.query.graphql';
import style from './app.css';
import shared from '../shared.css';

@customElement('apollo-app')
export class ApolloApp extends ApolloQuery<Data, Variables> {
  static readonly is = 'apollo-app';

  static readonly styles = [shared, style];

  query = AppQuery;

  render(): TemplateResult {
    return html`
      <dl>
        <dt>Pathname</dt>
        <dd>${this.data?.location?.pathname ?? '/'}</dd>
      </dl>
    `;
  }
}
