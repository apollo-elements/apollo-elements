import type { ProjectManifest } from 'playground-elements/shared/worker-api.js';
import type { PlaygroundIde } from 'playground-elements/playground-ide'

const BASE = `${location.origin}/_assets/_static`;

const BASE_IMPORT_MAP = {
  // '@apollo/client/core.d.ts': `${BASE}/node_modules/@apollo/client/core/index.d.ts`,
  // '@apollo/client/errors.d.ts': `${BASE}/node_modules/@apollo/client/errors/index.d.ts`,
  // '@apollo/client/cache.d.ts': `${BASE}/node_modules/@apollo/client/cache/index.d.ts`,
  // '@apollo/client/cache/core.d.ts': `${BASE}/node_modules/@apollo/client/cache/core/index.d.ts`,
  // '@apollo/client/cache/inmemory.d.ts': `${BASE}/node_modules/@apollo/client/cache/inmemory/index.d.ts`,
  // '@apollo/client/link.d.ts': `${BASE}/node_modules/@apollo/client/link/index.d.ts`,
  // '@apollo/client/link/core.d.ts': `${BASE}/node_modules/@apollo/client/link/core/index.d.ts`,
  // '@apollo/client/link/http.d.ts': `${BASE}/node_modules/@apollo/client/link/http/index.d.ts`,
  // '@apollo/client/link/batch.d.ts': `${BASE}/node_modules/@apollo/client/link/batch/index.d.ts`,
  // '@apollo/client/link/batch-http.d.ts': `${BASE}/node_modules/@apollo/client/link/batch-http/index.d.ts`,
  // '@apollo/client/link/context.d.ts': `${BASE}/node_modules/@apollo/client/link/context/index.d.ts`,
  // '@apollo/client/link/retry.d.ts': `${BASE}/node_modules/@apollo/client/link/retry/index.d.ts`,
  // '@apollo/client/link/utils.d.ts': `${BASE}/node_modules/@apollo/client/link/utils/index.d.ts`,
  // '@apollo/client/link/ws.d.ts': `${BASE}/node_modules/@apollo/client/link/ws/index.d.ts`,
  // '@apollo/client/link/persisted-queries.d.ts': `${BASE}/node_modules/@apollo/client/link/persisted-queries/index.d.ts`,
  // '@apollo/client/link/schema.d.ts': `${BASE}/node_modules/@apollo/client/link/schema/index.d.ts`,
  // '@apollo/client/utilities.d.ts': `${BASE}/node_modules/@apollo/client/utilities/index.d.ts`,
  // '@apollo/client/utilities/common.d.ts': `${BASE}/node_modules/@apollo/client/utilities/common/index.d.ts`,
  // '@apollo/client/utilities/graphql.d.ts': `${BASE}/node_modules/@apollo/client/utilities/graphql/index.d.ts`,
  // '@apollo/client/utilities/observables.d.ts': `${BASE}/node_modules/@apollo/client/utilities/observables/index.d.ts`,
  // '@apollo/client/utilities/policies.d.ts': `${BASE}/node_modules/@apollo/client/utilities/policies/index.d.ts`,
  // '@apollo/client/ApolloClient.d.ts': `${BASE}/node_modules/@apollo/client/core/ApolloClient.d.ts`,
  // '@apollo/client/ObservableQuery.d.ts': `${BASE}/node_modules/@apollo/client/core/ObservableQuery.d.ts`,
  // '@apollo/client/networkStatus.d.ts': `${BASE}/node_modules/@apollo/client/core/networkStatus.d.ts`,
  // '@apollo/client/LocalState.d.ts': `${BASE}/node_modules/@apollo/client/core/LocalState.d.ts`,
  // '@apollo/client/watchQueryOptions.d.ts': `${BASE}/node_modules/@apollo/client/core/watchQueryOptions.d.ts`,
  // '@apollo/client/types.d.ts': `${BASE}/node_modules/@apollo/client/core/types.d.ts`,
  // '@graphql-typed-document-node/core.d.ts': `${BASE}/node_modules/@graphql-typed-document-node/core/index.d.ts`,

  '@apollo/client/core': `${BASE}/apollo-client.js`,
  '@apollo/client/utilities': `${BASE}/apollo-client.js`,
  '@apollo/client/utilities/graphql/storeUtils.js': `${BASE}/apollo-client.js`,

  'event-iterator': `${BASE}/schema-link.js`,
  '@apollo/client/link/schema': `${BASE}/schema-link.js`,
  '@apollo/client/link/schema/index.esm.js': `${BASE}/schema-link.js`,
  '@graphql-tools/schema': `${BASE}/schema-link.js`,
  '@graphql-tools/mock': `${BASE}/schema-link.js`,
  '@graphql-tools/tools': `${BASE}/schema-link.js`,

  '@apollo-elements/components': `${BASE}/apollo-elements.js`,
  '@apollo-elements/components/apollo-client': `${BASE}/apollo-elements.js`,
  '@apollo-elements/components/apollo-client.js': `${BASE}/apollo-elements.js`,
  '@apollo-elements/components/apollo-mutation': `${BASE}/apollo-elements.js`,
  '@apollo-elements/components/apollo-mutation.js': `${BASE}/apollo-elements.js`,
  '@apollo-elements/components/apollo-query': `${BASE}/apollo-elements.js`,
  '@apollo-elements/components/apollo-query.js': `${BASE}/apollo-elements.js`,
  '@apollo-elements/components/apollo-subscription': `${BASE}/apollo-elements.js`,
  '@apollo-elements/components/apollo-subscription.js': `${BASE}/apollo-elements.js`,

  '@apollo-elements/core': `${BASE}/apollo-elements.js`,
  '@apollo-elements/core/index.js': `${BASE}/apollo-elements.js`,
  '@apollo-elements/core/apollo-mutation-controller': `${BASE}/apollo-elements.js`,
  '@apollo-elements/core/apollo-query-controller': `${BASE}/apollo-elements.js`,
  '@apollo-elements/core/apollo-subscription-controller': `${BASE}/apollo-elements.js`,
  '@apollo-elements/core/decorators': `${BASE}/apollo-elements.js`,
  '@apollo-elements/core/events': `${BASE}/apollo-elements.js`,
  '@apollo-elements/core/lib/has-all-variables': `${BASE}/apollo-elements.js`,

  "@microsoft/fast-element": `${BASE}/apollo-elements-fast.js`,
  "@apollo-elements/fast": `${BASE}/apollo-elements-fast.js`,
  "@apollo-elements/fast/apollo-query.js": `${BASE}/apollo-elements-fast.js`,
  "@apollo-elements/fast/apollo-mutation.js": `${BASE}/apollo-elements-fast.js`,
  "@apollo-elements/fast/apollo-subscription.js": `${BASE}/apollo-elements-fast.js`,
  "@apollo-elements/fast/apollo-query": `${BASE}/apollo-elements-fast.js`,
  "@apollo-elements/fast/apollo-mutation": `${BASE}/apollo-elements-fast.js`,
  "@apollo-elements/fast/apollo-subscription": `${BASE}/apollo-elements-fast.js`,

  "@apollo-elements/lit-apollo": `${BASE}/apollo-elements-lit-apollo.js`,
  "@apollo-elements/lit-apollo/apollo-query.js": `${BASE}/apollo-elements-lit-apollo.js`,
  "@apollo-elements/lit-apollo/apollo-mutation.js": `${BASE}/apollo-elements-lit-apollo.js`,
  "@apollo-elements/lit-apollo/apollo-subscription.js": `${BASE}/apollo-elements-lit-apollo.js`,
  "@apollo-elements/lit-apollo/apollo-query": `${BASE}/apollo-elements-lit-apollo.js`,
  "@apollo-elements/lit-apollo/apollo-mutation": `${BASE}/apollo-elements-lit-apollo.js`,
  "@apollo-elements/lit-apollo/apollo-subscription": `${BASE}/apollo-elements-lit-apollo.js`,

  "@apollo-elements/gluon": `${BASE}/apollo-elements-gluon.js`,
  "@apollo-elements/gluon/index.js": `${BASE}/apollo-elements-gluon.js`,
  "@apollo-elements/gluon/apollo-query.js": `${BASE}/apollo-elements-gluon.js`,
  "@apollo-elements/gluon/apollo-mutation.js": `${BASE}/apollo-elements-gluon.js`,
  "@apollo-elements/gluon/apollo-subscription.js": `${BASE}/apollo-elements-gluon.js`,
  "@apollo-elements/gluon/apollo-query": `${BASE}/apollo-elements-gluon.js`,
  "@apollo-elements/gluon/apollo-mutation": `${BASE}/apollo-elements-gluon.js`,
  "@apollo-elements/gluon/apollo-subscription": `${BASE}/apollo-elements-gluon.js`,

  "@apollo-elements/haunted": `${BASE}/apollo-elements-haunted.js`,
  "@apollo-elements/haunted/useQuery.js": `${BASE}/apollo-elements-haunted.js`,
  "@apollo-elements/haunted/useMutation.js": `${BASE}/apollo-elements-haunted.js`,
  "@apollo-elements/haunted/useSubscription.js": `${BASE}/apollo-elements-haunted.js`,
  "@apollo-elements/haunted/useQuery": `${BASE}/apollo-elements-haunted.js`,
  "@apollo-elements/haunted/useMutation": `${BASE}/apollo-elements-haunted.js`,
  "@apollo-elements/haunted/useSubscription": `${BASE}/apollo-elements-haunted.js`,

  "@apollo-elements/hybrids": `${BASE}/apollo-elements-hybrids.js`,
  "@apollo-elements/hybrids/factories/query.js": `${BASE}/apollo-elements-hybrids.js`,
  "@apollo-elements/hybrids/factories/mutation.js": `${BASE}/apollo-elements-hybrids.js`,
  "@apollo-elements/hybrids/factories/subscription.js": `${BASE}/apollo-elements-hybrids.js`,
  "@apollo-elements/hybrids/factories/query": `${BASE}/apollo-elements-hybrids.js`,
  "@apollo-elements/hybrids/factories/mutation": `${BASE}/apollo-elements-hybrids.js`,
  "@apollo-elements/hybrids/factories/subscription": `${BASE}/apollo-elements-hybrids.js`,

  '@apollo-elements/mixins': `${BASE}/mixins.js`,
  '@apollo-elements/mixins/apollo-client-mixin': `${BASE}/mixins.js`,
  '@apollo-elements/mixins/apollo-mutation-mixin': `${BASE}/mixins.js`,
  '@apollo-elements/mixins/apollo-query-mixin': `${BASE}/mixins.js`,
  '@apollo-elements/mixins/apollo-subscription-mixin': `${BASE}/mixins.js`,
  '@apollo-elements/mixins/controller-host-mixin': `${BASE}/mixins.js`,
  '@apollo-elements/mixins/graphql-script-child-mixin': `${BASE}/mixins.js`,
  '@apollo-elements/mixins/type-policies-mixin': `${BASE}/mixins.js`,
  '@apollo-elements/mixins/validate-variables-mixin': `${BASE}/mixins.js`,

  '@apollo-elements/polymer': `${BASE}/polymer.js`,
  '@apollo-elements/polymer/polymer-apollo-mutation': `${BASE}/polymer.js`,
  '@apollo-elements/polymer/polymer-apollo-query': `${BASE}/polymer.js`,
  '@apollo-elements/polymer/polymer-apollo-subscription': `${BASE}/polymer.js`,
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
    --playground-border: none;
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
<!-- playground-hide-end -->`;
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
      config.importMap = JSON.parse(importMapTemplate.content.textContent);

    config.importMap = {
      imports: {
        ...BASE_IMPORT_MAP,
        ...config.importMap?.imports,
      }
    }

    this.init(config);
    if (location.hash === `#${this.id}`)
      this.show();
  }

  static async fetchScript(url: string): Promise<string> {
    return fetch(new URL(url, location.origin).toString()).then(x => x.text());
  }

  init(config: ProjectManifest) {
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
    }).map(([k, v]) => [k, k !== 'index.html' ? v : ({ ...v, content: DocsPlayground.makePreview(v.content), })]));
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
