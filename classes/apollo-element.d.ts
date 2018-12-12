import ApolloClient, { ApolloError } from 'apollo-client';
import { LitElement } from '@polymer/lit-element';

declare class ApolloElement<TBase, TData> extends LitElement {
  client: ApolloClient<any>;
  data: TData;
  error: ApolloError;
  loading: boolean;
}
