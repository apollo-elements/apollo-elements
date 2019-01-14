export const variablesFactory = variables => {
  const set = (host, next) => {
    const { query, tryFetch, fetchResults } = host;
    if (host.observableQuery) {
      host.observableQuery.setVariables(next, tryFetch, fetchResults);
    } else if (query) {
      host.observableQuery = host.watchQuery(host, { query, variables });
      host.observableQuery.subscribe({ variables, query });
    }
    return next;
  };

  const get = (_, previous) => previous || variables;

  return { get, set };
};
