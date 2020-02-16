declare module '@gluon/gluon' {
  export class GluonElement extends HTMLElement {
    static readonly is: string;

    createRenderRoot(): ReturnType<HTMLElement['attachShadow']>|Node;

    render(options?: { sync: boolean }): Promise<void>
  }

  export { html, render } from 'lit-html';
}
