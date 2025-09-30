class PageQueryElement extends ApolloQueryMixin(HTMLElement)<typeof PageQuery> {
  query = PageQuery;

  /**
   * Prevent fetching if the URL contains a `?noAutoFetch` query param
   */
  override shouldSubscribe(): boolean {
    const { searchParams } = new URL(location.href);
    return !searchParams.has('noAutoFetch');
  }
}
