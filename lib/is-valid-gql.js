/**
 * isValidGql :: DocumentNode a => a -> Bool
 * Validates a graphql document node.
 * @param  {DocumentNode} doc
 * @return {Boolean}
 */
const isValidGql = doc =>
  !!(
    doc &&
    typeof doc === 'object' &&
    'kind' in doc &&
    'definitions' in doc
  );

export default isValidGql;
