import { ValidateVariablesMixin } from '@apollo-elements/mixins';
import { customElement } from '@microsoft/fast-element';
import { ApolloQuery } from '@apollo-elements/fast/bases/apollo-query';

import { NonNullableQuery } from './NonNullable.query.graphql';

@customElement({ name: 'non-nullable' })
export class NonNullable extends ValidateVariablesMixin(ApolloQuery)<typeof NonNullableQuery> {
  query = NonNullableQuery;
}
