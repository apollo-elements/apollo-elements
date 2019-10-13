export default isValidGql;
export type DocumentNode = import("graphql/language").DocumentNode;
declare function isValidGql(doc: import("graphql/language").DocumentNode): boolean;
