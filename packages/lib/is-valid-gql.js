/** @typedef {import('graphql/language').DocumentNode} DocumentNode */

/**
 * isValidGql :: DocumentNode a => a -> Bool
 * Validates a graphql document node.
 *
 * @param  {DocumentNode} doc
 * @return {boolean}
 */
const isValidGql = doc =>
  !!(
    doc &&
    typeof doc === 'object' &&
    'kind' in doc &&
    'definitions' in doc
  );

export default isValidGql;
