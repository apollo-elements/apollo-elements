import { ApolloClientMixin } from '@apollo-elements/mixins/apollo-client-mixin';
import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
import { client } from './specific-apollo-client';

interface Data { /* ... */ }
interface Variables { /* ... */ }

const Base =
  ApolloClientMixin(client, ApolloQuery);

@customElement('connected-query')
export class ConnectedQuery extends Base<Data, Variables> { /* ... */ }
