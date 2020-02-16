declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export default defaultDocument;
}
