import { query, define, html } from '@apollo-elements/hybrids';

type Theme = 'dark'|'light';
type Data = { theme: Theme };

function toggleTheme(host) {
  // TBD
}

define('theme-toggle', {
  query: query(ThemeToggleQuery),
  nextTheme: {
    get(host) {
      host.query.data?.theme === 'dark' ? 'light' : 'dark';
    }
  },
  render: ({ query: { data }, nextTheme }) => html`
    <button onclick="${toggleTheme}">
      Change to ${nextTheme} theme
    </button>
  `,
});
