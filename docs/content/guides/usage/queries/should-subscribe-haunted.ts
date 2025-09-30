function PageQueryElement() {
  const { data } = useQuery(PageQuery, {
    /**
     * Prevent fetching if the URL contains a `?noAutoFetch` query param
     */
    shouldSubscribe(): boolean {
      const { searchParams } = new URL(location.href);
      return !searchParams.has('noAutoFetch');
    }
  });
}
