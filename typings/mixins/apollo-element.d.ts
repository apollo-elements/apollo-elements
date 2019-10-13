import CustomElement from "./custom-element";
import ApolloClient, { ApolloError } from "apollo-client";
import { DocumentNode } from "graphql";
export default interface ApolloElement<TCacheShape, TData> extends CustomElement {
    /**
     * Apollo Client Instance
     * Defaults to `window.__APOLLO_CLIENT__`
     */
    client: ApolloClient<TCacheShape>;
    /**
     * Latest data
     */
    data: TData;
    /**
     * GraphQL Document e.g. query or mutation
     */
    document: DocumentNode;
    /**
     * Latest error
     */
    error: ApolloError;
    /**
     * Whether a request is in flight
     */
    loading: boolean;
}
