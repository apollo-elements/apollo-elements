class PageQueryElement extends FASTElement {
  query = new ApolloQueryController(this, HelloQuery, {
    variables: {
      greeting: "How's it going",
      name: 'Dude'
    },

    /**
     * Prevent fetching if the URL contains a `?noAutoFetch` query param
     */
    shouldSubscribe(): boolean {
      const { searchParams } = new URL(location.href);
      return !searchParams.has('noAutoFetch');
    },
  });
}
