import type { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client/core';
import type { ApolloElementElement } from './apollo-element';

export type ComponentDocument<D> =
  D extends TypedDocumentNode ? D : DocumentNode

export type Data<D> =
  D extends TypedDocumentNode<infer TData> ? TData : D;

export type Variables<D, V> =
  D extends TypedDocumentNode<infer _, infer T> ? T : V extends OperationVariables ? V : never;

export type DataOf<E> =
  E extends ApolloElementElement<infer D> ? D : never;

export type VariablesOf<E> =
  E extends ApolloElementElement<infer D, infer V> ? Variables<D, V> : never;

// BUG: https://github.com/modernweb-dev/web/issues/993#issuecomment-731726688
null;
