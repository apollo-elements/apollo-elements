import ApolloClient, { ApolloError } from 'apollo-client';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class ApolloElement<TBase, TData> extends HTMLElement {
  client: ApolloClient<any>;
  data: TData;
  error: ApolloError;
  loading: boolean;
}

export function ApolloElementMixin<TBase extends Constructor, TData>(superclass: TBase): ApolloElement<TBase, TData>;
