import type { ApolloLink } from "@apollo/client";
import type {
  DefinitionNode,
  DirectiveNode,
  DocumentNode,
  OperationDefinitionNode,
  FieldNode,
  SelectionNode,
} from 'graphql';

const FAIL_DIRECTIVE = Symbol('NO_DIRECTIVE') as unknown as DirectiveNode;

/**
 * Simple check if document has any directives with the given names
 * Replaces deprecated hasDirectives from @apollo/client/utilities/internal
 */
function hasDirectives(directiveNames: string[], doc?: DocumentNode): boolean {
  if (!doc?.definitions) return false;

  function checkSelections(selections?: readonly SelectionNode[]): boolean {
    if (!selections) return false;
    return selections.some(selection => {
      if (selection.directives?.some(d => directiveNames.includes(d.name.value))) {
        return true;
      }
      if ('selectionSet' in selection && selection.selectionSet) {
        return checkSelections(selection.selectionSet.selections);
      }
      return false;
    });
  }

  return doc.definitions.some(def => {
    if (def.kind === 'OperationDefinition') {
      // Check operation-level directives
      if (def.directives?.some(d => directiveNames.includes(d.name.value))) {
        return true;
      }
      // Check field-level directives
      return checkSelections(def.selectionSet?.selections);
    }
    return false;
  });
}

const hasSelections =
  (x: FieldNode | SelectionNode):
    x is FieldNode & { selectionSet: { selections: readonly SelectionNode[] } } =>
    !!((x as FieldNode).selectionSet?.selections ?? []).length;

const isClientDirective =
  (x: DirectiveNode) =>
    x?.name?.value === 'client';

const isOperationDefinition =
  (x: DefinitionNode): x is OperationDefinitionNode =>
    x.kind !== 'DirectiveDefinition';

const getDirectives =
  (acc: readonly DirectiveNode[], x: SelectionNode): readonly DirectiveNode[] => {
    const directives = !x.directives?.length ? [FAIL_DIRECTIVE] : x.directives;
    if (!hasSelections(x))
      return [...acc, ...directives];
    else
      return [...acc, ...(x.selectionSet?.selections.reduce(getDirectives, []) ?? [])];
  };

/**
 * Helper to determine whether an operation is client-side-only
 *
 * ```haskell
 * isClientOperation :: Operation -> Bool
 * ```
 *
 * @param  operation Operation to check
 * @return           Whether the operation is client-side-only, i.e. true when the Operation will make no network calls.
 */
export function isClientOperation(operation: ApolloLink.Operation): boolean {
  const query = operation?.query;
  const definitions = query?.definitions;

  if (!hasDirectives(['client'], query))  // covered
    return false;

  return definitions.reduce((acc: boolean, definition) => {
    if (!isOperationDefinition(definition))  // this is a typeguard, basically
      return acc && true;

    else if (definition.directives?.length && definition.directives.every(isClientDirective))
      return acc && true;

    else {
      const selections =
        definition
          ?.selectionSet
          ?.selections;

      return (
        acc && Array.isArray(selections) && selections
          .reduce(getDirectives, [] as readonly DirectiveNode[])
          .every(isClientDirective)
      );
    }
  }, true);
}
