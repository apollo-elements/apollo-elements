import type { DefinitionNode, OperationDefinitionNode, VariableDefinitionNode } from 'graphql';
import type { ApolloLink } from "@apollo/client";

/** isOperationDefinition :: DefinitionNode -> Boolean */
function isOperationDefinition(definition: DefinitionNode): definition is OperationDefinitionNode {
  return definition.kind === 'OperationDefinition';
}

/** isNonNullType :: a -> Boolean */
function isNonNullType<T extends { type: { kind: string } }>(x: T) {
  return x?.type?.kind === 'NonNullType';
}

/** hasNonNullValue :: keyof TVariables VariableName => TVariables -> VariableName -> Boolean */
function hasNonNullValue<T>(x: T) {
  return (prop: string): boolean =>
    x?.[prop as keyof T] != null; /* c8 ignore next */ // covered
}

function isTrue(x: boolean): x is true {
  return x;
}

/** getVariableDefinitions :: OperationDefinitionNode -> [VariableDefinitionNode] */
function getVariableDefinitions(
  x: OperationDefinitionNode
): readonly VariableDefinitionNode[] {
  return x.variableDefinitions ?? []; /* c8 ignore next */ // couldn't repro
}

/** getVariableValue :: VariableDefinitionNode -> a */
function getVariableValue(x: VariableDefinitionNode) {
  return x.variable.name.value;
}

/**
 * Checks whether an operation includes all its non-nullable variables.
 * Note that this can't check properties of Input types defined in schema,
 * only top-level variables.
 *
 * ```haskell
 * hasAllVariables :: Operation -> Bool
 * ```
 *
 * @param operation The GraphQL operation to validate.
 * @return Whether the operation has all it's required variables.
 */
export function hasAllVariables(operation: Partial<ApolloLink.Operation>): boolean {
  try {
    return operation.query?.definitions
      ?.filter(isOperationDefinition)
      ?.flatMap(getVariableDefinitions)
      ?.filter(isNonNullType)
      ?.map(getVariableValue)
      ?.map(hasNonNullValue(operation.variables))
      ?.every(isTrue) ?? false; /* c8 ignore next */ // covered
  } catch {
    return false;
  }
}
