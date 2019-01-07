import { DocumentNode } from "graphql";

export default function hasAllVariables(params: { query: DocumentNode, variables: any }): boolean
