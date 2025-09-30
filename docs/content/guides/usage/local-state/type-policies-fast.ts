import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
import { typePolicies } from './typePolicies';

@customElement({ name: 'theme-toggle', template })
class ThemeToggle extends FASTElement {
  query = new ApolloQueryBehavior(this, ThemeToggleQuery);

  connectedCallback() {
    super.connectedCallback();
    this.query.client.cache.policies.addTypePolicies(typePolicies);
  }
}
