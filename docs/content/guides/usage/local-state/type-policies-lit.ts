import { typePolicies } from './typePolicies';

@customElement('theme-toggle')
class ThemeToggle extends LitElement {
  query = new ApolloQueryController(this, ThemeToggleQuery);

  connectedCallback() {
    super.connectedCallback();
    this.query.client.cache.policies.addTypePolicies(typePolicies);
  }
}
