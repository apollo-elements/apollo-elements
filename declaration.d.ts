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

declare module '@gluon/gluon' {
  export class GluonElement extends HTMLElement {
    static readonly is: string;

    createRenderRoot(): ReturnType<HTMLElement['attachShadow']>|Node;

    render(options?: { sync: boolean }): Promise<void>
  }

  export { html, render } from 'lit-html';
}
