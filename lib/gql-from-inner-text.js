import gql from 'graphql-tag';
import constant from 'crocks/combinators/constant';
import compose from 'crocks/helpers/compose';
import propOr from 'crocks/helpers/propOr';
import isSame from 'crocks/predicates/isSame';
import isNil from 'crocks/predicates/isNil';
import map from 'crocks/pointfree/map';
import option from 'crocks/pointfree/option';
import and from 'crocks/logic/and';
import ifElse from 'crocks/logic/ifElse';
import prop from 'crocks/Maybe/prop';
import { replace } from './pointfree.js';

const getInnerTextAsGql = compose(
  option(null),
  map(gql),
  replace(/<!---->/g, ''),
  prop('innerText')
);

const isScriptElement = compose(isSame('SCRIPT'), propOr(null, 'tagName'));
const isApplicationGraphQL = el =>
  el instanceof Element &&
  el.getAttribute('type') === 'application/graphql';

/**
 * Throws a TypeError
 * @param  {string} message
 */
function throwTypeError(message) {
  throw new TypeError(message);
}

/**
 * gqlFromInnerText :: (HTMLScriptElement a, DocumentNode b) => a -> b
 * Parses the text content of a graphql script element.
 * @param {HTMLScriptElement} el
 * @return {DocumentNode}
 * @type {Function}
 */
const gqlFromInnerText = ifElse(isNil, constant(null),
  ifElse(
    and(isScriptElement, isApplicationGraphQL),
    getInnerTextAsGql,
    () => throwTypeError('Script must be of type "application/graphql"')
  )
);

export default gqlFromInnerText;
