import ApolloClient, { ApolloError } from 'apollo-client';
import { DocumentNode } from 'graphql';

export declare class ApolloElement<TCacheShape, TData> extends HTMLElement {
  client: ApolloClient<TCacheShape>;
  data: TData;
  document: DocumentNode;
  error: ApolloError;
  loading: boolean;
}

type Constructor<T = HTMLElement> = new (...args: any[]) => T;
export function ApolloElementMixin<TBase extends Constructor, TCacheShape, TData>
(superclass: TBase): TBase & ApolloElement<TCacheShape, TData>;
