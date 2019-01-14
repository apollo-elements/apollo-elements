import compose from 'crocks/helpers/compose';

import { getGraphQLScriptChild } from './helpers.js';
import gqlFromInnerText from './gql-from-inner-text';

const getGraphQLScriptChildDocument = compose(gqlFromInnerText, getGraphQLScriptChild);
export default getGraphQLScriptChildDocument;
