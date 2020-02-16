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
import { replace } from './helpers';
import type { DocumentNode } from 'graphql';

const getInnerTextAsGql = compose(
  option(null),
  map(gql),
  replace(/<!---->/g, ''),
  prop('innerText')
);

const isScriptElement = compose(isSame('SCRIPT'), propOr(null, 'tagName'));
const isApplicationGraphQL = (el: Element): boolean =>
  el instanceof Element &&
  el.getAttribute('type') === 'application/graphql';

/**
 * Throws a TypeError
 */
function throwTypeError(message: string): never {
  throw new TypeError(message);
}

/**
 * gqlFromInnerText :: (HTMLScriptElement a, DocumentNode b) => a -> b
 * Parses the text content of a graphql script element.
 */
const gqlFromInnerText: (element: HTMLScriptElement) => DocumentNode | null =
  ifElse(isNil, constant(null),
    ifElse(
      and(isScriptElement, isApplicationGraphQL),
      getInnerTextAsGql,
      () => throwTypeError('Script must be of type "application/graphql"')
    )
  );

export default gqlFromInnerText;
