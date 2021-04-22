import type { DocumentNode } from '@apollo/client/core';

/**
 * Validates a graphql document node.
 *
 * ```haskell
 * isValidGql :: DocumentNode a => a -> Bool
 * ```
 * @param doc Maybe a DocumentNode
 * @return Whether the argument is a DocumentNode
 */
export function isValidGql(doc: unknown): doc is DocumentNode {
  return !!(
    doc &&
    typeof doc === 'object' &&
    'kind' in doc &&
    'definitions' in doc
  );
}
