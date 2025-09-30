import { ApolloQueryMixin, TypePoliciesMixin } from '@apollo-elements/mixins';
import { typePolicies } from './typePolicies';

@customElement('theme-toggle')
class ThemeToggle extends
TypePoliciesMixin(ApolloQueryMixin(HTMLElement))<Data, null> {
  typePolicies = typePolicies;

  // ...
}
