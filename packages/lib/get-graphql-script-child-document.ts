import type { DocumentNode } from 'graphql';

import { getGraphQLScriptChild } from './helpers';

import { gqlFromInnerText } from './gql-from-inner-text';

export function getGraphQLScriptChildDocument(element: HTMLElement): DocumentNode | null {
  const script = getGraphQLScriptChild(element);

  if (script)
    return gqlFromInnerText(getGraphQLScriptChild(element));
  else
    return null;
}
