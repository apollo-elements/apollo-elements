import All from 'crocks/All';
import chain from 'crocks/pointfree/chain';
import compose from 'crocks/helpers/compose';
import constant from 'crocks/combinators/constant';
import ifElse from 'crocks/logic/ifElse';
import isEmpty from 'crocks/predicates/isEmpty';
import isSame from 'crocks/predicates/isSame';
import mreduceMap from 'crocks/helpers/mreduceMap';
import or from 'crocks/logic/or';
import propOr from 'crocks/helpers/propOr';
import propPathOr from 'crocks/helpers/propPathOr';
import when from 'crocks/logic/when';


/** getQuery :: Operation -> Query */
const getQuery =
  propOr(null, 'query');

/** getDefinitions :: Operation -> [Definition] */
const getDefinitions =
  propOr([], 'definitions');

/** getDirectives :: Definition -> [Directive] */
const getDirectives = compose(
  when(isEmpty, constant(['NO_DIRECTIVES'])),
  propOr(null, 'directives')
);

/** getDirectiveName :: Directive -> String */
const getDirectiveName =
  propPathOr('NO_DIRECTIVE', ['name', 'value']);

/** getSelections :: Definition -> [Selection] */
const getSelections =
  propPathOr([], ['selectionSet', 'selections']);

/** getFlatDirectives :: [Selection] -> [Directive] */
const getFlatDirectives =
  chain(getDirectives);

/** getFlatSelections :: [Definition] -> [Selection] */
const getFlatSelections =
  chain(getSelections);

/** isClient :: n -> Bool */
const isClient =
  isSame('client');

/** isClientDirective :: Directive -> Bool */
const isClientDirective =
  compose(isClient, getDirectiveName);

/** isAllClientDirectives :: [Definition] -> Bool */
const allClientDirectives =
  mreduceMap(All, isClientDirective);

/** isAllClientDirectives :: [Definition] -> Bool */
const isAllClientDirectives =
  ifElse(isEmpty, constant(false), allClientDirectives);

/** isAllClientDefinition :: [Definition] -> Bool */
const isAllClientDefinition =
  compose(isAllClientDirectives, getFlatDirectives);

/** isAllClientSelections :: [Definition] -> Bool */
const isAllClientSelections =
  compose(isAllClientDefinition, getFlatSelections);

/** isClientDirective :: [Document] -> Bool */
const isClientDocument =
  compose(isAllClientDirectives, getDirectives);

/** isClientOnly :: [Definition] -> Bool */
const isClientOnly =
  or(isAllClientDefinition, isAllClientSelections);

/** isClientQuery :: [Query] -> Bool */
const isClientQuery =
  compose(isClientOnly, getDefinitions);

/** isClientOperation :: Operation -> Bool */
const isClientOperation =
  or(isClientDocument, compose(isClientQuery, getQuery));

export default isClientOperation;
