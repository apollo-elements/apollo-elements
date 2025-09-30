import { ValidateVariablesMixin } from '@apollo-elements/mixins';
import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';

import { NonNullableQuery } from './NonNullable.query.graphql';

@customElement('non-nullable')
class NonNullable extends ValidateVariablesMixin(ApolloQuery)<typeof NonNullableQuery> {
  query = NonNullableQuery;
}