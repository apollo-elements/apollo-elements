import gql from 'graphql-tag';
import compose from 'crocks/helpers/compose';
import map from 'crocks/pointfree/map';
import option from 'crocks/pointfree/option';
import prop from 'crocks/Maybe/prop';

/**
 * gqlFromInnerText :: (HTMLScriptElement a, DocumentNode b) => a -> b
 * Parses the text content of a graphql script element.
 * @param {HTMLScriptElement} el
 * @return {DocumentNode}
 * @type {Function}
 */
const gqlFromInnerText = compose(
  option(null),
  map(gql),
  prop('innerText')
);

export default gqlFromInnerText;
