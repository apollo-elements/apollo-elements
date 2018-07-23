import { DocumentNode } from 'graphql';
import { LitElement } from '@polymer/lit-element';

declare global {
  interface Window { __APOLLO_CLIENT__?: any; }
}

declare global {
  interface Window { __APOLLO_CLIENT__?: any; }
}

declare function hasAllVariables(params: any): (document: DocumentNode) => Boolean

declare class ApolloElement extends LitElement {
  constructor();
  client: any;
}

declare class ApolloQuery extends ApolloElement {
  constructor();
  query: DocumentNode;
}

declare class ApolloMutation extends ApolloElement {
  constructor();
  mutation: DocumentNode;
}
