import type { ProjectManifest } from 'playground-elements/shared/worker-api.js';
import type { PlaygroundIde } from 'playground-elements/playground-ide'

const BASE_IMPORT_MAP = {
  '@apollo-elements/components': '../../../apollo-elements.js',

  '@apollo-elements/core': '../../../apollo-elements.js',
  '@apollo-elements/core/apollo-mutation-controller': '../../../apollo-elements.js',
  '@apollo-elements/core/apollo-query-controller': '../../../apollo-elements.js',
  '@apollo-elements/core/apollo-subscription-controller': '../../../apollo-elements.js',
  '@apollo-elements/core/decorators': '../../../apollo-elements.js',
  '@apollo-elements/core/events': '../../../apollo-elements.js',
  '@apollo-elements/core/lib/has-all-variables': '../../../apollo-elements.js',

  "@apollo-elements/haunted": "../../../apollo-elements-haunted.js",
  "@apollo-elements/haunted/useQuery.js": "../../../apollo-elements-haunted.js",
  "@apollo-elements/haunted/useMutation.js": "../../../apollo-elements-haunted.js",
  "@apollo-elements/haunted/useSubscription.js": "../../../apollo-elements-haunted.js",
  "@apollo-elements/haunted/useQuery": "../../../apollo-elements-haunted.js",
  "@apollo-elements/haunted/useMutation": "../../../apollo-elements-haunted.js",
  "@apollo-elements/haunted/useSubscription": "../../../apollo-elements-haunted.js",

  "@apollo-elements/hybrids": "../../../apollo-elements-hybrids.js",
  "@apollo-elements/hybrids/factories/query.js": "../../../apollo-elements-hybrids.js",
  "@apollo-elements/hybrids/factories/mutation.js": "../../../apollo-elements-hybrids.js",
  "@apollo-elements/hybrids/factories/subscription.js": "../../../apollo-elements-hybrids.js",
  "@apollo-elements/hybrids/factories/query": "../../../apollo-elements-hybrids.js",
  "@apollo-elements/hybrids/factories/mutation": "../../../apollo-elements-hybrids.js",
  "@apollo-elements/hybrids/factories/subscription": "../../../apollo-elements-hybrids.js",

  '@apollo-elements/mixins': '../../../mixins.js',
  '@apollo-elements/mixins/apollo-client-mixin': '../../../mixins.js',
  '@apollo-elements/mixins/apollo-mutation-mixin': '../../../mixins.js',
  '@apollo-elements/mixins/apollo-query-mixin': '../../../mixins.js',
  '@apollo-elements/mixins/apollo-subscription-mixin': '../../../mixins.js',
  '@apollo-elements/mixins/controller-host-mixin': '../../../mixins.js',
  '@apollo-elements/mixins/graphql-script-child-mixin': '../../../mixins.js',
  '@apollo-elements/mixins/type-policies-mixin': '../../../mixins.js',
  '@apollo-elements/mixins/validate-variables-mixin': '../../../mixins.js',

  '@apollo-elements/polymer': '../../../polymer.js',
  '@apollo-elements/polymer/polymer-apollo-mutation': '../../../polymer.js',
  '@apollo-elements/polymer/polymer-apollo-query': '../../../polymer.js',
  '@apollo-elements/polymer/polymer-apollo-subscription': '../../../polymer.js',

  '@apollo/client/core': '../../../apollo-client.js',
  '@apollo/client/utilities': '../../../apollo-client.js',
  '@apollo/client/link/schema': '../../../schema-link.js',
  '@apollo/client/link/schema/index.esm.js': '../../../schema-link.js',
  '@apollo/client/utilities/graphql/storeUtils.js': '../../../apollo-client.js',
  'event-iterator': '../../../schema-link.js',
  '@graphql-tools/schema': '../../../schema-link.js',
  '@graphql-tools/mock': '../../../schema-link.js',
  '@graphql-tools/tools': '../../../schema-link.js',

  'lit': '../../../lit.js',
  'lit/decorators': '../../../lit.js',
  'lit/directives/class-map': '../../../lit.js',
  'lit/directives/if-defined': '../../../lit.js',
}

const template = document.createElement("template");
template.innerHTML = `
  <style>
  :host {
    display: block;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: auto;

    --_-button-focus-background: hsla(0 100% 0% / 0.75);
  }

  playground-ide {
    display: none;
    border: 0;
    overflow: hidden;
    --playground-code-font-family: monospace;
    --playground-code-font-size: 14px;
    --playground-code-background: var(--markdown-syntax-background-color);
    --playground-tab-bar-background: var(--page-background);
    --playground-tab-bar-foreground-color: var(--primary-text-color);
    --playground-preview-toolbar-background: var(--page-background);
    --playground-preview-toolbar-foreground-color: var(--primary-text-color);
    --playground-border: none;
    --playground-highlight-color: var(--primary-color);
    --playground-preview-width: 30%;
    --playground-bar-height: 35px;
  }

  #snippet,
  playground-ide {
    width: 100%;
    height: 100%;
    border-radius: var(--wcd-snippet-border-radius, 6px);
  }

  #snippet {
    display: block;
  }

  #snippet,
  button {
    border: 1px solid var(--wcd-snippet-border-color, transparent);
    transition: border-color 0.2s ease-in-out;
    will-change: border-color;
  }

  :host([show]) playground-ide {
    display: flex;
    width: var(--playground-ide-width, 100%);
    height: var(--playground-ide-height, 600px);
  }

  :host([show]) #snippet,
  :host([show]) button {
    display: none;
  }

  :host(:not([show]):focus-within) #snippet,
  :host(:not([show]):hover) #snippet {
    border-color: var(--wcd-snippet-focus-border-color, black);
  }

  button {
    background: var(--wcd-snippet-button-background, hsla(0 100% 100% / 0.9));
    border-bottom-right-radius: 6px;
    border-top-left-radius: 6px;
    color: inherit;
    cursor: pointer;
    display: block;
    font-size: 16px;
    outline: none;
    padding: 9px 16px;
    position: absolute;
    bottom: 0;
    right: -2px;
    transition:
      border-color 0.2s ease-in-out,
      background 0.1s ease,
      color 0.1s ease;
  }

  :host(:not([show]):focus-within) button,
  :host(:not([show]):hover) button {
    border-top-color: var(--wcd-snippet-focus-border-color, black);
    border-left-color: var(--wcd-snippet-focus-border-color, black);
    border-bottom-color: var(--wcd-snippet-outer-background-color, white);
    border-right-color: var(--wcd-snippet-outer-background-color, white);
  }

  button:focus,
  button:hover {
    color: var(--wcd-snippet-button-focus-color, hsla(0 100% 100% / 0.75));
    background: var(--wcd-snippet-button-focus-background, var(--_-button-focus-background));
    border-bottom-color: var(--wcd-snippet-button-focus-background, var(--_-button-focus-background)) !important;
    border-right-color: var(--wcd-snippet-button-focus-background, var(--_-button-focus-background)) !important;
  }

  #snippet ::slotted(pre) {
    margin-bottom: 0 !important;
  }

  :host([loading]) #edit,
  #loading {
    display: none;
  }

  :host([loading]) #loading {
    display: inline-block;
  }
  </style>

  <div id="snippet"><slot></slot></div>

  <playground-ide part="playground-ide"></playground-ide>

  <button part="button">
    <span id="edit">▶️ Edit Live</span>

    <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
    <svg id="loading" width="90" height="20" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="var(--primary-text-color)">
        <circle cx="15" cy="15" r="15">
            <animate attributeName="r" from="15" to="15"
                     begin="0s" dur="0.8s"
                     values="15;9;15" calcMode="linear"
                     repeatCount="indefinite" />
            <animate attributeName="fill-opacity" from="1" to="1"
                     begin="0s" dur="0.8s"
                     values="1;.5;1" calcMode="linear"
                     repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="15" r="9" fill-opacity="0.3">
            <animate attributeName="r" from="9" to="9"
                     begin="0s" dur="0.8s"
                     values="9;15;9" calcMode="linear"
                     repeatCount="indefinite" />
            <animate attributeName="fill-opacity" from="0.5" to="0.5"
                     begin="0s" dur="0.8s"
                     values=".5;1;.5" calcMode="linear"
                     repeatCount="indefinite" />
        </circle>
        <circle cx="105" cy="15" r="15">
            <animate attributeName="r" from="15" to="15"
                     begin="0s" dur="0.8s"
                     values="15;9;15" calcMode="linear"
                     repeatCount="indefinite" />
            <animate attributeName="fill-opacity" from="1" to="1"
                     begin="0s" dur="0.8s"
                     values="1;.5;1" calcMode="linear"
                     repeatCount="indefinite" />
        </circle>
    </svg>
  </button>
`;

export class DocsPlayground extends HTMLElement {
  static get is() {
    return 'docs-playground';
  }

  static get observedAttributes() {
    return ['show', 'playground-url'];
  }

  static makePreview(content: string) {
    return `<!-- playground-hide -->
<!doctype html>
<head>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
<!-- playground-hide-end -->
${content}
<!-- playground-hide -->
</body>
<!-- playground-hide-end -->`.replace(/ORIGIN/g, window.location.origin);
  }

  $(x: string) {
    return this.shadowRoot.querySelector(x);
  }

  get playgroundIde(): PlaygroundIde {
    return this.$('playground-ide') as PlaygroundIde;
  }

  get button(): HTMLButtonElement {
    return this.$('button') as HTMLButtonElement;
  }

  get file(): string {
    return this.getAttribute('file') ?? 'index.html';
  }

  playgroundUrl = '/_assets/_static/playground-elements/playground.js';

  attributeChangedCallback(name: string, _: string, next: string) {
    switch (name) {
      case 'playground-url':
        if (this.playgroundUrl !== next)
          this.playgroundUrl = next;
    }
  }

  constructor() {
    super();
    this.show = this.show.bind(this);
    this.attachShadow({ mode: "open" }).append(template.content.cloneNode(true));
    const url = this.getAttribute('sandbox-base-url');
    if (url)
      this.playgroundIde.setAttribute('sandbox-base-url', new URL(url, location.origin).toString());
    else
      this.playgroundIde.setAttribute('sandbox-base-url', location.origin + '/_assets/_static/playground-elements/');
    this.button.addEventListener('click', this.show);

  }

  connectedCallback() {
    window.requestIdleCallback?.(() => this.importPlayground())
    const files = Object.fromEntries(Array.from(document.querySelectorAll<HTMLTemplateElement>(
      `[data-playground-id="${this.id}"]`
    ), e => [e.dataset.filename, {
      content: e.content.textContent.trim(),
      hidden: 'hidden' in e.dataset,
      ...'lang' in e.dataset && {
        contentType: e.dataset.lang.match(/^(j(ava)?|t(ype)?)s(cript)?$/) ? 'application/javascript' : undefined
      },
    }]))
    const importMapTemplate = document.querySelector<HTMLTemplateElement>(
      `[data-import-map="${this.id}"]`
    )
    const config: ProjectManifest = { files };
    if (importMapTemplate)
      config.importMap = JSON.parse(importMapTemplate.content.textContent.replace(/ORIGIN/g, window.location.origin));

    config.importMap = {
      imports: {
        ...BASE_IMPORT_MAP,
        ...config.importMap?.imports,
      }
    }

    this.init(config);
  }

  static async fetchScript(url: string): Promise<string> {
    return fetch(new URL(url, location.origin).toString()).then(x => x.text());
  }

  async init(config: ProjectManifest) {
    const content = this.textContent.trim();
    const files = Object.fromEntries(Object.entries({
      [this.file]: { content: content },
      // 'apollo-client.js': {
      //   content: await DocsPlayground.fetchScript('/_assets/_static/apollo-client.js'),
      //   contentType: 'application/javascript',
      //   hidden: true,
      // },
      'apollo-elements.js': {
        content: await DocsPlayground.fetchScript('/_assets/_static/apollo-elements.js'),
        contentType: 'application/javascript',
        hidden: true,
      },
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
      contentType: k.endsWith('js') ? 'application/javascript' : v.contentType,
      content: DocsPlayground.makePreview(v.content),
    })]));
    this.playgroundIde.config = { ...config, files }
  }

  async importPlayground() {
    await import(this.playgroundUrl);
  }

  async show() {
    this.setAttribute('loading', '');
    this.button.disabled = true;
    await this.importPlayground();
    this.setAttribute("show", '');
    this.button.disabled = false;

  }

  load() {
    const { title = "Snippet" } = this.dataset;
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
