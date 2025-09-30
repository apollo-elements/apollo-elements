import { ValidateVariablesMixin, ApolloQueryMixin } from '@apollo-elements/mixins';

import { NonNullableQuery } from './NonNullable.query.graphql';

class NonNullable extends
ValidateVariablesMixin(ApolloQueryMixin(HTMLElement))<typeof NonNullableQuery> {
  query = NonNullableQuery;
}

customElements.define('non-nullable');