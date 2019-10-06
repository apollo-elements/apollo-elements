import compose from 'crocks/helpers/compose';
import filter from 'crocks/pointfree/filter';
const scriptSelector = 'script[type="application/graphql"]';

/**
 * True when the input is a `<script type="application/graphql">` element
 * @param  {HTMLElement|*}  el element
 * @return {Boolean}
 */
export const isGraphQLScript = el =>
  el instanceof HTMLElement &&
  el.matches(scriptSelector);

/**
 * Get the `<script type="application/graphql">` child of an element
 * @param  {HTMLElement} el
 * @return {HTMLElement|null}
 */
export const getGraphQLScriptChild = el =>
  el.querySelector(scriptSelector);

/**
 * Point-free string replace
 * @param  {String|RegExp} regexpOrSubst
 * @param  {String|function} regexpOrSubst
 * @return {(str: string) => (boolean|string)}
 */
export const replace =
  (regexpOrSubst, newStrOrReplacer) =>
    str =>
        typeof str !== 'string' ? str
      : str.replace(regexpOrSubst, newStrOrReplacer);

const valueIsUndefined = ([, v]) => v !== undefined;

/**
 * @function
 * @template T
 * @param {T} object with possibly-undefined values
 * @return {T} stripped object
 */
export const stripUndefinedValues = compose(
  Object.fromEntries,
  filter(valueIsUndefined),
  Object.entries,
);
