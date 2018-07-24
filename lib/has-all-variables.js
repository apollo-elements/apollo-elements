import All from 'crocks/All';
import filter from 'crocks/pointfree/filter';
import flip from 'crocks/combinators/flip';
import hasProp from 'crocks/predicates/hasProp';
import head from 'crocks/pointfree/head';
import identity from 'crocks/combinators/identity';
import ifElse from 'crocks/logic/ifElse';
import map from 'crocks/pointfree/map';
import mconcat from 'crocks/helpers/mconcat';
import prop from 'crocks/Maybe/prop';
import propPathEq from 'crocks/predicates/propPathEq';
import propOr from 'crocks/helpers/propOr';
import propPathOr from 'crocks/helpers/propPathOr';
import unit from 'crocks/helpers/unit';
import valueOf from 'crocks/pointfree/valueOf';

/** isInObj :: Object -> String -> Boolean */
const isInObj =
  flip(hasProp);

/** isNonNullType :: a -> Boolean */
const isNonNullType =
  propPathEq(['type', 'kind'], 'NonNullType');

/** varName :: Object -> String */
const varName =
  propPathOr(undefined, ['variable', 'name', 'value']);

/** hasAllVariables :: (Query, Object) -> Bool */
const hasAllVariables = params =>
  prop('definitions', propOr(null, 'query', params))
    .map(map(prop('variableDefinitions'))) // Maybe [ Maybe {} ]
    .chain(head) // Maybe Maybe [ {} ]
    .chain(identity) // Maybe [ {} ]
    .map(map(ifElse(isNonNullType, varName, unit))) // Maybe [ Maybe String ]
    .map(filter(identity))
    .map(map(isInObj(propOr(null, 'variables', params)))) // Maybe [ Bool ]
    .map(mconcat(All)) // Maybe All
    .map(valueOf) // Maybe Bool
    .option(false); // Bool

export default hasAllVariables;
