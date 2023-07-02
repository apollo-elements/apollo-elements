class HeavySlowQueryElement extends FASTElement {
  query = new ApolloQueryBehavior(this, HeavySlowQuery, {
    fetchPolicy: 'cache-only',
  });
}
