import { isValidGql, getGraphQLScriptChildDocument } from '@apollo-elements/lib';

export const documentFactory = ({ errorMessage, onSet = () => null }) => doc => {
  const set = (host, next) => {
    if (!next) return doc || null;
    if (!isValidGql(next)) throw new Error(errorMessage);
    onSet(host);
    return next;
  };

  const get = (host, previous) =>
    doc || getGraphQLScriptChildDocument(host) || previous || null;

  const connect = (host, key) => {
    if (!host[key]) host[key] = getGraphQLScriptChildDocument(host);
    if (host[key]) host.subscribe();

    const scriptChildMutation = new MutationObserver(() => {
      const doc = getGraphQLScriptChildDocument(host);
      if (doc) host[key] = doc;
    });

    scriptChildMutation.observe(host, { characterData: true, childList: true, subtree: true });
    return () => scriptChildMutation.disconnect();
  };

  return { connect, get, set };
};
