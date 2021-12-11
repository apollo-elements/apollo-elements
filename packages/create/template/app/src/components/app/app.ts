import { LitElement, html, TemplateResult } from 'lit';
import { ApolloQueryController } from '@apollo-elements/core';
import { customElement } from 'lit/decorators.js';

import { AppQuery } from './App.query.graphql';

import style from './app.css';
import shared from '../shared.css';

@customElement('apollo-app')
export class ApolloApp extends LitElement {
  static readonly is = 'apollo-app';

  static readonly styles = [shared, style];

  query = new ApolloQueryController(this, AppQuery);

  render(): TemplateResult {
    return html`
      <dl>
        <dt>Pathname</dt>
        <dd>${this.query.data?.location?.pathname ?? '/'}</dd>
      </dl>
    `;
  }
}
