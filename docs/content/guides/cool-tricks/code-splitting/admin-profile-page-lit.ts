import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
import { UserTypePolicies } from './typePolicies';

import { UserQuery } from './User.query.graphql';

@customElement('admin-profile-page')
export class AdminProfilePage extends TypePoliciesMixin(ApolloQuery)<typeof UserQuery> {
  query = UserQuery;

  typePolicies = { ...UserTypePolicies, ...AdminTypePolicies };
}
