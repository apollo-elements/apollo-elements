import type { Operation } from '@apollo/client/core';
import type {
  DefinitionNode,
  DirectiveNode,
  OperationDefinitionNode,
  FieldNode,
  SelectionNode,
} from 'graphql';

import { hasDirectives } from '@apollo/client/utilities';

const FAIL_DIRECTIVE = Symbol('NO_DIRECTIVE') as unknown as DirectiveNode;

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
      return [...acc, ...x.selectionSet?.selections.reduce(getDirectives, [])];
  };

export function isClientOperation(operation: Operation): boolean {
  const query = operation?.query;
  const definitions = query?.definitions;

  if (!hasDirectives(['client'], query)) /* c8 ignore next */ // this is covered
    return false; /* c8 ignore next */

  return definitions.reduce((acc: boolean, definition) => {
    if (!isOperationDefinition(definition)) /* c8 ignore next */ // this is a typeguard, basically
      return acc && true; /* c8 ignore next */

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
