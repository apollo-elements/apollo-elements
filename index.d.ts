import ApolloClient from "apollo-client";

declare global {
  interface Window {
    __APOLLO_CLIENT__: ApolloClient<any>;
    __APOLLO_STATE__: any;
  }
}
