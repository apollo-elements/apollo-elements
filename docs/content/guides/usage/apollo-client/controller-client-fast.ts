import { ApolloQueryBehavior } from '@apollo-elements/fast';
import { FASTElement, customElement } from '@microsoft/fast-element';
import { MyQuery } from './My.query.graphql';
import { client } from './specific-apollo-client';

@customElement({ name: 'connected-query' })
export class ConnectedQuery extends FASTElement {
  query = new ApolloQueryBehavior(this, MyQuery, { client });
}
