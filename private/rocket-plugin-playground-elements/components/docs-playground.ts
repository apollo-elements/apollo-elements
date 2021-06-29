import type { ProjectManifest } from 'playground-elements/shared/worker-api.js';
import type { PlaygroundIde } from 'playground-elements/playground-ide';

const playgroundImportMap =
  JSON.parse('ESBUILD_BUNDLED_IMPORT_MAP'.replace(/{{(\s+)?ORIGIN(\s+)?}}/ig, location.origin));

const template = document.createElement('template');
template.innerHTML = `ESBUILD_BUNDLED_PLAYGROUND_HTML`;

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

  playgroundUrl = '/_merged_assets/_static/playground-elements/playground.js';

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
    const url = this.getAttribute('sandbox-base-url');
    if (url)
      this.playgroundIde.setAttribute('sandbox-base-url', new URL(url, location.origin).toString());
    else
      this.playgroundIde.setAttribute('sandbox-base-url', `${location.origin}/_merged_assets/_static/playground-elements/`);
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
