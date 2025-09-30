import { customElement } from '@microsoft/fast-element';
import { ApolloQuery } from '@apollo-elements/fast/bases/apollo-query';
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
import { UserTypePolicies } from './typePolicies';

import { UserQuery } from './User.query.graphql';

@customElement({ name: 'admin-profile-page' })
export class AdminProfilePage extends TypePoliciesMixin(ApolloQuery)<typeof UserQuery> {
  query = UserQuery;

  typePolicies = { ...UserTypePolicies, ...AdminTypePolicies };
}
