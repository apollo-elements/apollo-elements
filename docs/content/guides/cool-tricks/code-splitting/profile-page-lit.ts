import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
import { UserTypePolicies } from './typePolicies';

import { UserQuery } from './User.query.graphql';

@customElement('profile-page')
export class ProfilePage extends TypePoliciesMixin(ApolloQuery)<typeof UserQuery> {
  query = UserQuery;

  typePolicies = UserTypePolicies;
}
