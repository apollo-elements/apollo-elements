import type { DocumentNode } from 'graphql';

/**
 * isValidGql :: DocumentNode a => a -> Bool
 * Validates a graphql document node.
 */
const isValidGql = (doc: DocumentNode): boolean =>
  !!(
    doc &&
    typeof doc === 'object' &&
    'kind' in doc &&
    'definitions' in doc
  );

export default isValidGql;
