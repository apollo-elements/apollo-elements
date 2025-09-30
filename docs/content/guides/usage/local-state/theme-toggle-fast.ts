import { FASTElement, customElement, html, ViewTemplate } from '@microsoft/fast-element';
import { ApolloQueryBehavior } from '@apollo-elements/fast';

type Theme = 'dark'|'light';
type Data = { theme: Theme };

const template: ViewTemplate<ThemeToggle> = html`
  <fast-button @click="${x => x.toggleTheme()}">
    Change to ${x => x.nextTheme} theme
  </fast-button>
`;

@customElement({ name: 'theme-toggle', template})
class ThemeToggle extends FASTElement {
  query = new ApolloQueryBehavior(this, ThemeToggleQuery);

  get nextTheme(): Theme {
    return this.query.data?.theme === 'dark' ? 'light' : 'dark';
  }

  toggleTheme() {
    // TBD
  }
}
