/**
 * validGql :: DocumentNode a => a -> Bool
 * Validates a graphql document node.
 * @param  {DocumentNode} doc
 * @return {Boolean}
 */
const validGql = doc =>
  !!(doc && typeof doc === 'object');

export default validGql;
