import ApolloClient, { ApolloError } from 'apollo-client';
import { DocumentNode } from 'graphql';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class ApolloElement<TBase, TData> extends HTMLElement {
  client: ApolloClient<any>;
  data: TData;
  document: DocumentNode;
  error: ApolloError;
  loading: boolean;
}

export function ApolloElementMixin<TBase extends Constructor, TData>(superclass: TBase): ApolloElement<TBase, TData>;
