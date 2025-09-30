function HeavySlowQueryElement() {
  const { data } = useQuery(HeavySlowQuery, {
    fetchPolicy: 'cache-only',
  });
}
