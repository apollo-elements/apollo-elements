import { useQuery, component, html } from '@apollo-elements/haunted';

type Theme = 'dark'|'light';
type Data = { theme: Theme };

function ThemeToggle() {
  const { data } = useQuery(ThemeToggleQuery);

  const nextTheme = data?.theme === 'dark' ? 'light' : 'dark';

  function toggleTheme(host) {
    // TBD
  }

  return html`
    <button @click="${toggleTheme}">
      Change to ${nextTheme} theme
    </button>
  `,
}

customElements.define('theme-toggle', component(ThemeToggle));
