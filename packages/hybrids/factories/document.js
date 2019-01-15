import { isValidGql, getGraphQLScriptChildDocument } from '@apollo-elements/lib';

export const documentFactory = ({ errorMessage }) => doc => {
  const set = (host, next) => {
    if (!next) return doc || null;
    if (!isValidGql(next)) throw new Error(errorMessage);
    return next;
  };

  const get = (host, previous) =>
    previous || getGraphQLScriptChildDocument(host) || doc || null;

  const connect = (host, key) => {
    const onInvalidate = ({ target }) => {
      if (key === 'mutation') return;
      if (host === target && host[key]) {
        key === 'query' && host.observableQuery
          ? host.observableQuery.setVariables(host[key])
          : host.subscribe();
      }
    };
    host.addEventListener('@invalidate', onInvalidate);

    if (!host[key]) host[key] = getGraphQLScriptChildDocument(host);
    if (key !== 'mutation' && host[key]) host.subscribe();

    const scriptChildMutation = new MutationObserver(() => {
      const doc = getGraphQLScriptChildDocument(host);
      if (doc) host[key] = doc;
    });

    scriptChildMutation.observe(host, { characterData: true, childList: true, subtree: true });

    return () => {
      host.removeEventListener('@invalidate', onInvalidate);
      scriptChildMutation.disconnect();
    };
  };

  return { connect, get, set };
};
