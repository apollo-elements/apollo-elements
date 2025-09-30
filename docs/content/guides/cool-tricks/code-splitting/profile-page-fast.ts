import { ApolloQuery } from '@apollo-elements/fast/bases/apollo-query';
import { customElement } from '@microsoft/fast-element';
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
import { UserTypePolicies } from './typePolicies';

import { UserQuery } from './User.query.graphql';

@customElement({ name: 'profile-page' })
export class ProfilePage extends TypePoliciesMixin(ApolloQuery)<typeof UserQuery> {
  query = UserQuery;

  typePolicies = UserTypePolicies;
}
