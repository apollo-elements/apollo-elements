import { ApolloClientMixin, ApolloQueryMixin } from '@apollo-elements/mixins';

import { client } from './specific-apollo-client';

interface Data { /* ... */ }
interface Variables { /* ... */ }

const Base =
  ApolloClientMixin(client, ApolloQueryMixin(HTMLElement));

export class ConnectedQuery extends Base<Data, Variables> { /* ... */ }

customElements.define('connected-query', ConnectedQuery);
