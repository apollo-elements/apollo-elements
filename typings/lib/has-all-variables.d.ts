export default hasAllVariables;
export type DocumentNode = import("graphql/language").DocumentNode;
declare function hasAllVariables(params: {
    query: import("graphql/language").DocumentNode;
    variables: any;
}): boolean;
