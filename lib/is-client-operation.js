import All from 'crocks/All';
import chain from 'crocks/pointfree/chain';
import compose from 'crocks/helpers/compose';
import isSame from 'crocks/predicates/isSame';
import mreduceMap from 'crocks/helpers/mreduceMap';
import or from 'crocks/logic/or';
import propOr from 'crocks/helpers/propOr';
import propPathOr from 'crocks/helpers/propPathOr';

/** getDefinitions :: Operation o, Definition d => o -> ds */
const getDefinitions =
  propPathOr([], ['query', 'definitions']);

/** getDirectives :: Definition d, Directive c => d -> cs */
const getDirectives =
  propOr([], 'directives');

/** getDirectiveName :: Directive c, String n => c -> n */
const getDirectiveName =
  propPathOr(null, ['name', 'value']);

/** getSelections :: Definition d, Selection s => d -> ss */
const getSelections =
  propPathOr([], ['selectionSet', 'selections']);

/** getFlatDirectives :: Selection s, Directive c => ss -> cs */
const getFlatDirectives =
  chain(getDirectives);

/** getFlatSelections :: Definition d, Selection s => ds -> ss */
const getFlatSelections =
  chain(getSelections);

/** isClient :: n -> Bool */
const isClient =
  isSame('client');

/** isClientDirective :: Directive c => c -> Bool */
const isClientDirective =
  compose(isClient, getDirectiveName);

/** isAllClientDirectives :: Definition d => ds -> Bool */
const isAllClientDirectives =
  mreduceMap(All, isClientDirective);

/** isAllClientDefinition :: Definition d => ds -> Bool */
const isAllClientDefinition =
  compose(isAllClientDirectives, getFlatDirectives);

/** isAllClientSelections :: Definition d => ds -> Bool */
const isAllClientSelections =
  compose(isAllClientDefinition, getFlatSelections);

/** isClientOnly :: Definition d => ds -> Bool */
const isClientOnly =
  or(isAllClientDefinition, isAllClientSelections);

/** isClientOperation :: Operation o => o -> Bool */
const isClientOperation =
  compose(isClientOnly, getDefinitions);

export default isClientOperation;
