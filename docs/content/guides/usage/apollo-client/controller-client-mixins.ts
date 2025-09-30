import { ApolloQueryController } from '@apollo-elements/core';
import { ControllerHostMixin } from '@apollo-elements/mixins';
import { MyQuery } from './My.query.graphql';
import { client } from './specific-apollo-client';

export class ConnectedQuery extends ControllerHostMixin(HTMLElement) {
  query = new ApolloQueryController(this, MyQuery, { client });
}

customElements.define('connected-query', ConnectedQuery);
