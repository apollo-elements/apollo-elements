import { useQuery, useEffect, c } from '@apollo-elements/atomico';
import { typePolicies } from './typePolicies';

function ThemeToggle() {
  const { client, data } = useQuery(ThemeToggleQuery);

  /**
   * There's no TypePoliciesMixin for atomico,
   * but you can use the `useEffect` hook to do the same
   */
  useEffect(({ host: { client } }) => {
    client.cache.policies.addTypePolicies(typePolicies);
  }, [client]);

  const nextTheme = data?.theme === 'dark' ? 'light' : 'dark';

  function toggleTheme() {
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
