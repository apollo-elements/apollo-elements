define('heavy-slow-query', {
  query: query(HeavySlowQuery, {
    fetchPolicy: 'cache-only',
  }),
});
