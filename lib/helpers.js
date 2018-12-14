const scriptSelector = 'script[type="application/graphql"]';

export const isGraphQLScript = el =>
  el instanceof HTMLElement &&
  el.matches(scriptSelector);

export const getGraphQLScriptChild = el =>
  el instanceof HTMLElement &&
  el.querySelector(scriptSelector);

export const replace = (...args) => str =>
  typeof str === 'string' ? str.replace(...args) : str;
