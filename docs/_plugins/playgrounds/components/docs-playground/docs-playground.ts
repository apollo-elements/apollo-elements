import type { ProjectManifest } from 'playground-elements/shared/worker-api';
import type { PlaygroundIde } from 'playground-elements/playground-ide';

const playgroundImportMap =
  JSON.parse('ESBUILD_BUNDLED_IMPORT_MAP'.replace(/{{(\s+)?ORIGIN(\s+)?}}/ig, location.origin));

const template = document.createElement('template');
template.innerHTML = `ESBUILD_BUNDLED_PLAYGROUND_HTML`;

/**
 * @csspart button
 * @csspart playground-ide
 *
 * @slot loader
 *
 * @cssprop [--playground-code-font-family=monospace]
 * @cssprop [--playground-code-font-size=14px]
 * @cssprop [--playground-border=none]
 * @cssprop [--playground-ide-width=100%]
 * @cssprop [--playground-ide-height=100%]
 *
 * @cssprop [--playground-snippet-border-radius=6px]
 * @cssprop [--playground-snippet-border-color=transparent]
 * @cssprop [--playground-snippet-button-background]
 * @cssprop [--playground-snippet-outer-background-color=white]
 * @cssprop [--playground-snippet-button-focus-color=var(--code-button-focus-color)]
 * @cssprop [--playground-snippet-button-focus-background=var(--code-button-focus-background)]
 *
 * @cssprop --code-button-active-color - button background when focused
 * @cssprop [--code-button-background=var(--markdown-table-row-odd-background-color)] - button background
 * @cssprop [--code-button-color=inherit] - button text color
 * @cssprop [--code-button-focus-background=var(--primary-lines-color)] - button background when focused
 * @cssprop [--code-button-focus-color=inherit] - button text color when focused
 * @cssprop [--code-border-radius=6px] - border radius for code-copy and code-tabs
 */
export class DocsPlayground extends HTMLElement {
  static get is(): 'docs-playground' { return 'docs-playground'; }

  static get observedAttributes(): string[] { return ['show', 'playground-url']; }

  static makePreview(content: string): string {
    return `ESBUILD_BUNDLED_PLAYGROUND_PREVIEW`.replace('{{CONTENT}}', content);
  }

  $(x: string): HTMLElement | null { return this.shadowRoot.querySelector(x); }

  get playgroundIde(): PlaygroundIde {
    return this.$('playground-ide') as PlaygroundIde;
  }

  get button(): HTMLButtonElement {
    return this.$('button') as HTMLButtonElement;
  }

  get file(): string {
    return this.getAttribute('file') ?? 'index.html';
  }

  playgroundUrl = 'PLAYGROUND_IMPORT';

  attributeChangedCallback(name: string, _: string, next: string): void {
    switch (name) {
      case 'playground-url':
        if (this.playgroundUrl !== next)
          this.playgroundUrl = next;
    }
  }

  constructor() {
    super();
    this.show = this.show.bind(this);
    this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
    const url = this.getAttribute('playground-base-url');
    const baseUrl =
        url ? new URL(url, location.origin).toString()
      : `${location.origin}/_merged_assets/_static/playground-elements/`;
    if (url)
      this.playgroundIde.setAttribute('playground-base-url', url);
    this.playgroundIde.setAttribute('sandbox-base-url', baseUrl);
    this.button.addEventListener('click', this.show);
  }

  connectedCallback(): void {
    window.requestIdleCallback?.(() => this.importPlayground());
    const files = Object.fromEntries(Array.from(document.querySelectorAll<HTMLTemplateElement>(
      `[data-playground-id="${this.id}"]`
    ), e => [e.dataset.filename, {
      content: e.content.textContent.trim(),
      hidden: 'hidden' in e.dataset,
      ...'lang' in e.dataset && {
        contentType:
            !e.dataset.lang.match(/^(j(ava)?|t(ype)?)s(cript)?$/) ? undefined
          : 'application/javascript',
      },
    }]));
    const importMapTemplate = document.querySelector<HTMLTemplateElement>(
      `[data-import-map="${this.id}"]`
    );
    const config: ProjectManifest = { files };
    if (importMapTemplate)
      config.importMap = JSON.parse(importMapTemplate.content.textContent);

    config.importMap = {
      imports: {
        ...playgroundImportMap,
        ...config.importMap?.imports,
      },
    };

    this.init(config);
    if (location.hash === `#${this.id}`)
      this.show();
  }

  static async fetchScript(url: string): Promise<string> {
    return fetch(new URL(url, location.origin).toString()).then(x => x.text());
  }

  init(config: ProjectManifest): void {
    const content = this.textContent.trim();
    const files = Object.fromEntries(Object.entries({
      [this.file]: { content: content },
      'style.css': {
        hidden: !config?.files?.['style.css'],
        content: `
          html {
            font-family: 'Open Sans', sans-serif;
          }
        `,
      },
      ...config.files,
    }).map(([k, v]) => [k, k !== 'index.html' ? v : ({
      ...v,
      content: DocsPlayground.makePreview(v.content),
    })]));
    this.playgroundIde.config = { ...config, files };
  }

  async importPlayground(): Promise<void> {
    await import(this.playgroundUrl);
  }

  async show(): Promise<void> {
    this.setAttribute('loading', '');
    this.button.disabled = true;
    await this.importPlayground();
    this.setAttribute('show', '');
    this.button.disabled = false;
  }

  load(): void {
    const { title = 'Snippet' } = this.dataset;
    this.playgroundIde.title = title;
  }
}

customElements.define(DocsPlayground.is, DocsPlayground);

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};

declare global {
  interface Window {
    requestIdleCallback: ((
      callback: ((deadline: RequestIdleCallbackDeadline) => void),
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle);
    cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
  }
}
