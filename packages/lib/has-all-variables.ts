import type { DocumentNode, OperationDefinitionNode } from 'graphql';

interface HasAllVariablesParams<TVariables = Record<string, unknown>> {
  query: DocumentNode;
  variables?: TVariables;
}

/** isInObj :: Object -> String -> Boolean */
const isInObj =
  <T = Record<string, unknown>>(x: T) =>
    (prop: string): boolean =>
      x?.[prop] !== undefined;

/** isNonNullType :: a -> Boolean */
const isNonNullType =
  <T extends { type: { kind: string } }>(x: T) =>
    x?.type?.kind === 'NonNullType';

/**
 * hasAllVariables :: ({query, variables}) -> Bool
 */
export function hasAllVariables<TVariables = Record<string, unknown>>(
  params: HasAllVariablesParams<TVariables>
): boolean {
  const definitions = params?.query?.definitions as OperationDefinitionNode[];

  if (!Array.isArray(definitions))
    return false;

  return definitions
    .flatMap(x => x.variableDefinitions)
    .map(x => isNonNullType(x) ? x.variable.name.value : undefined)
    .filter(Boolean)
    .map(isInObj(params?.variables))
    .every(Boolean);
}
