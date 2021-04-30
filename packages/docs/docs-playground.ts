import type { PlaygroundIde } from 'playground-elements/playground-ide'

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
    return ['show'];
  }

  static makePreview(content) {
    return `<!-- playground-hide -->
<!doctype html>
<head>
  <link rel="stylesheet" href="style.css"/>
  <script type="module" src="apollo-elements.js"></script>
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

  constructor() {
    super();
    this.show = this.show.bind(this);
    this.attachShadow({ mode: "open" }).append(template.content.cloneNode(true));
    const url = this.getAttribute('sandbox-base-url');
    if (url)
      this.playgroundIde.setAttribute('sandbox-base-url', new URL(url, location.origin).toString());
    this.button.addEventListener('click', this.show);

  }

  static tryParse(selector) {
    const script = document.querySelector(selector);
    try {
      return JSON.parse(script.textContent.replace(/ORIGIN/g, window.location.origin));
    } catch (error) {
      console.error('Could Not Configure Playground:', error);
      return undefined;
    }
  }

  async connectedCallback() {
    const content = this.textContent.trim();
    const config = DocsPlayground.tryParse(`[type="playground-config"][for="${this.id}"]`);
    const pathname = new URL('/_assets/_static/apollo-elements.js', location.origin).toString();
    console.log(pathname);
    this.playgroundIde.config = {
      ...config,
      files: {
        'index.html': {
          contentType: 'text/html',
          content: DocsPlayground.makePreview(content),
        },
        'apollo-elements.js': {
          content: await fetch(pathname).then(x => x.text()),
          hidden: true,
        },
        ...config.files,
      }
    }
  }

  async show() {
    this.setAttribute('loading', '');
    this.button.disabled = true;
    const IMPORT_URL = 'https://cdn.skypack.dev/playground-elements@0.9.2';
    await import(IMPORT_URL);
    this.setAttribute("show", '');
    this.button.disabled = false;

  }

  load() {
    const { title = "Snippet" } = this.dataset;
    this.playgroundIde.title = title;
  }
}

customElements.define(DocsPlayground.is, DocsPlayground);
