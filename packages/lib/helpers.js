import compose from 'crocks/helpers/compose';
import filter from 'crocks/pointfree/filter';
const scriptSelector = 'script[type="application/graphql"]';

export const isGraphQLScript = el =>
  el instanceof HTMLElement &&
  el.matches(scriptSelector);

export const getGraphQLScriptChild = el =>
  el instanceof HTMLElement &&
  el.querySelector(scriptSelector);

export const replace = (...args) => str =>
  typeof str === 'string' ? str.replace(...args) : str;

const valueIsUndefined = ([, v]) => v !== undefined;
export const stripUndefinedValues = compose(
  Object.fromEntries,
  filter(valueIsUndefined),
  Object.entries,
);
