export class HeavySlowQueryElement extends LitElement {
  query = new ApolloQueryController(this, HeavySlowQuery, {
    fetchPolicy: 'cache-only',
  });
}
