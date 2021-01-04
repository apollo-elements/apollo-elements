declare module '*.graphql' {
  import { DocumentNode } from '@apollo/client/core';
  const defaultDocument: DocumentNode;
  export default defaultDocument;
}

declare module '*.css' {
  import { CSSResult } from 'lit-element';
  const css: CSSResult;
  export default css;
}
