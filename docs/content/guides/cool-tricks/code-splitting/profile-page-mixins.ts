import { ApolloQueryMixin, TypePoliciesMixin } from '@apollo-elements/mixins';
import { UserTypePolicies } from './typePolicies';

import { UserQuery } from './User.query.graphql';

export class ProfilePage extends TypePoliciesMixin(ApolloQueryMixin(HTMLElement))<typeof UserQuery> {
  query = UserQuery;

  typePolicies = UserTypePolicies;
}

customElements.define('profile-page', ProfilePage);
