import type { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client/core';
import type { ApolloElementElement } from './apollo-element';

export type MaybeTDN = (TypedDocumentNode|Record<string, unknown>);

export type MaybeVariables<D> =
    D extends TypedDocumentNode<infer _, infer TV> ? TV
  : OperationVariables;

export type ComponentDocument<D> =
    D extends TypedDocumentNode ? D
  : DocumentNode

export type Data<D> =
    D extends TypedDocumentNode<infer TD> ? TD
  : D;

export type Variables<D, V> =
    D extends TypedDocumentNode<infer _, infer TV> ? TV
  : V extends OperationVariables ? V
  : never;

export type DataOf<E> =
    E extends ApolloElementElement<infer D> ? D
  : never;

export type VariablesOf<E> =
    E extends ApolloElementElement<infer D, infer V> ? Variables<D, V>
  : never;

// BUG: https://github.com/modernweb-dev/web/issues/993#issuecomment-731726688
null;
