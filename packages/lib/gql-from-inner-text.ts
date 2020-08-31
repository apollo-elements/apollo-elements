import type { DocumentNode } from 'graphql';

import { isGraphQLScript } from './helpers';

import gql from 'graphql-tag';

function getInnerTextAsDocumentNode(x: HTMLElement): DocumentNode | null {
  const text = x?.innerText?.replace?.(/<!---->/g, '');
  return text && gql(text);
}

/**
 * gqlFromInnerText :: (HTMLScriptElement a, DocumentNode b) => a -> b
 * Parses the text content of a graphql script element.
 */
export function gqlFromInnerText(element: HTMLScriptElement): DocumentNode | null {
  if (isGraphQLScript(element))
    return getInnerTextAsDocumentNode(element);
  else
    throw new TypeError('script must be of type "application/graphql"');
}
