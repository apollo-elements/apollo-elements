import { ApolloQueryMixin, TypePoliciesMixin } from '@apollo-elements/mixins';
import { UserTypePolicies, AdminTypePolicies } from './typePolicies';

import { UserQuery } from './User.query.graphql';

export class AdminProfilePage
extends TypePoliciesMixin(ApolloQueryMixin(HTMLElement))<typeof UserQuery> {
  query = UserQuery;

  typePolicies = { ...UserTypePolicies, ...AdminTypePolicies };
}

customElements.define('admin-profile-page', AdminProfilePage);
