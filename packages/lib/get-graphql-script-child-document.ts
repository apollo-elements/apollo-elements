import compose from 'crocks/helpers/compose';

import { getGraphQLScriptChild } from './helpers';
import gqlFromInnerText from './gql-from-inner-text';
import type { DocumentNode } from 'graphql';

const getGraphQLScriptChildDocument: ((element: HTMLElement) => DocumentNode | null) =
  compose(gqlFromInnerText, getGraphQLScriptChild);

export default getGraphQLScriptChildDocument;
