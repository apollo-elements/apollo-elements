import { useQuery, c } from '@apollo-elements/atomico';

type Theme = 'dark'|'light';
type Data = { theme: Theme };

function ThemeToggle() {
  const { data } = useQuery(ThemeToggleQuery);

  const nextTheme = data?.theme === 'dark' ? 'light' : 'dark';

  function toggleTheme(host) {
    // TBD
  }

  return (
    <host>
      <button onclick={toggleTheme}>
        Change to {nextTheme} theme
      </button>
    </host>
  );
}

customElements.define('theme-toggle', c(ThemeToggle));
