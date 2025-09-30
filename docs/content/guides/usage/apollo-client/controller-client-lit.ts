import { ApolloQueryController } from '@apollo-elements/core';
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MyQuery } from './My.query.graphql';
import { client } from './specific-apollo-client';

@customElement('connected-query')
export class ConnectedQuery extends LitElement {
  query = new ApolloQueryController(this, MyQuery, { client });
}
