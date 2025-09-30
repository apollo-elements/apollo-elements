import { useQuery, useEffect, component, html } from '@apollo-elements/haunted';
import { typePolicies } from './typePolicies';

function ThemeToggle() {
  const { client, data } = useQuery(ThemeToggleQuery);

  /**
   * There's no TypePoliciesMixin for haunted,
   * but you can use the `useEffect` hook to do the same
   */
  useEffect(({ host: { client } }) => {
    client.cache.policies.addTypePolicies(typePolicies);
  }, [client]);

  const nextTheme = data?.theme === 'dark' ? 'light' : 'dark';

  function toggleTheme() {
    // TBD
  }

  return html`
    <button @click="${toggleTheme}">
      Change to ${nextTheme} theme
    </button>
  `,
}
