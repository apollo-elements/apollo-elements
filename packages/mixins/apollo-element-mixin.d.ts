import ApolloClient, { ApolloError } from 'apollo-client';
import { DocumentNode } from 'graphql';

export declare class ApolloElement<TCacheShape, TData> {
  client: ApolloClient<TCacheShape>;
  data: TData;
  document: DocumentNode;
  error: ApolloError;
  loading: boolean;
}


type Constructor = new (...args: any[]) => HTMLElement;

type ReturnConstructor<TCacheShape, TData> = new (...args: any[]) =>
ApolloElement<TCacheShape, TData>;

export function ApolloElementMixin<
  TBase extends Constructor,
  TCacheShape,
  TData
>(superclass: TBase):
  TBase & HTMLElement & ReturnConstructor<TCacheShape, TData>;
