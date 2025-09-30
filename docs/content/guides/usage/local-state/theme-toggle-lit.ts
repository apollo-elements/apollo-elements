import { ApolloQueryController } from '@apollo-elements/core';
import { LittElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

type Theme = 'dark'|'light';
type Data = { theme: Theme };

@customElement('theme-toggle')
class ThemeToggle extends LitElement {
  query = new ApolloQueryController(this, ThemeToggleQuery);

  get nextTheme(): Theme {
    return this.query.data?.theme === 'dark' ? 'light' : 'dark';
  }

  render() {
    return html`
      <button @click="${this.toggleTheme}">
        Change to ${this.nextTheme} theme
      </button>
    `;
  }

  toggleTheme() {
    // TBD
  }
}
