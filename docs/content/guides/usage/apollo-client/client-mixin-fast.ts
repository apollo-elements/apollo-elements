import { ApolloClientMixin } from '@apollo-elements/mixins/apollo-client-mixin';
import { ApolloQuery } from '@apollo-elements/fast/bases/apollo-query';
import { customElement, ViewTemplate } from '@apollo-elements/fast';
import { client } from './specific-apollo-client';

const Base =
  ApolloClientMixin(client, ApolloQuery);

const name = 'connected-query';
const template: ViewTemplate<ConnectedQuery> = html`...`;

@customElement({ name, template })
export class ConnectedQuery extends Base<any> { /* ... */ }
