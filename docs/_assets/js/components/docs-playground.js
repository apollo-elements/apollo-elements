// Docs Playground Component (from rocket-preset-playground-elements)
const playgroundTemplate = document.createElement('template');
playgroundTemplate.innerHTML = `<style>
:host {
  display: block;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: auto;
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
  border-radius: var(--playground-snippet-border-radius, 6px);
}

#snippet {
  display: block;
}

#snippet,
button {
  border: 1px solid var(--playground-snippet-border-color, transparent);
  transition: border-color 0.2s ease-in-out;
  will-change: border-color;
}

:host([show]) playground-ide {
  display: flex;
  width: var(--playground-ide-width, 100%);
  height: var(--playground-ide-height, 600px);
}

button {
  background: var(--playground-snippet-button-background);
  border-end-end-radius: 6px;
  border-start-start-radius: 6px;
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

button:focus,
button:hover {
  color: var(--playground-snippet-button-focus-color, var(--code-button-focus-color));
  background: var(--playground-snippet-button-focus-background, var(--code-button-focus-background));
  border-bottom-color: var(--playground-snippet-button-focus-background, var(--code-button-focus-background)) !important;
  border-right-color: var(--playground-snippet-button-focus-background, var(--code-button-focus-background)) !important;
}

:host([show]) #snippet,
:host([show]) button {
  display: none;
}

:host(:not([show]):focus-within) #snippet,
:host(:not([show]):hover) #snippet {
  border-color: var(--playground-snippet-focus-border-color, black);
}

:host(:not([show]):focus-within) button,
:host(:not([show]):hover) button {
  border-top-color: var(--playground-snippet-focus-border-color, black);
  border-left-color: var(--playground-snippet-focus-border-color, black);
  border-bottom-color: var(--playground-snippet-outer-background-color, var(--page-background));
  border-right-color: var(--playground-snippet-outer-background-color, var(--page-background));
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

<playground-ide part="playground-ide" exportparts="lhs,rhs"></playground-ide>

<button part="button">
  <span id="edit">▶️ Edit Live</span>

  <slot name="loader">
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
  </slot>
</button>
`;

class DocsPlayground extends HTMLElement {
  static get is() { return 'docs-playground'; }

  static get observedAttributes() { return ['show', 'playground-url']; }

  static makePreview(content) {
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
<!-- playground-hide-end -->
`;
  }

  $(x) { return this.shadowRoot.querySelector(x); }

  get playgroundIde() {
    return this.$('playground-ide');
  }

  get button() {
    return this.$('button');
  }

  get file() {
    return this.getAttribute('file') ?? 'index.html';
  }

  attributeChangedCallback(name, _, next) {
    switch (name) {
      case 'playground-url':
        if (this.playgroundUrl !== next)
          this.playgroundUrl = next;
    }
  }

  constructor() {
    super();
    this.playgroundUrl = 'https://unpkg.com/playground-elements@0.15.0-pre.1/playground-ide.js?module';
    this.show = this.show.bind(this);
    this.attachShadow({ mode: 'open' }).append(playgroundTemplate.content.cloneNode(true));
    const url = this.getAttribute('playground-base-url');
    const baseUrl = url
      ? new URL(url, location.origin).toString()
      : 'https://unpkg.com/playground-elements@0.15.0-pre.1/';
    if (url)
      this.playgroundIde.setAttribute('playground-base-url', url);
    this.playgroundIde.setAttribute('sandbox-base-url', baseUrl);
    this.button.addEventListener('click', this.show);
  }

  connectedCallback() {
    window.requestIdleCallback?.(() => this.importPlayground());
    const files = Object.fromEntries(Array.from(document.querySelectorAll(
      `[data-playground-id="${this.id}"]`
    ), e => [e.dataset.filename, {
      content: e.content.textContent.trim(),
      hidden: 'hidden' in e.dataset,
      ...('lang' in e.dataset && {
        contentType:
            !e.dataset.lang.match(/^(j(ava)?|t(ype)?)s(cript)?$/) ? undefined
          : 'application/javascript',
      }),
    }]));
    const importMapTemplate = document.querySelector(
      `[data-import-map="${this.id}"]`
    );
    const config = { files };
    if (importMapTemplate)
      config.importMap = JSON.parse(importMapTemplate.content.textContent);

    config.importMap = {
      imports: {
        ...config.importMap?.imports,
      },
    };

    this.init(config);
    if (location.hash === `#${this.id}`)
      this.show();
  }

  static async fetchScript(url) {
    return fetch(new URL(url, location.origin).toString()).then(x => x.text());
  }

  init(config) {
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

  async importPlayground() {
    await import(this.playgroundUrl);
  }

  async show() {
    this.setAttribute('loading', '');
    this.button.disabled = true;
    await this.importPlayground();
    this.setAttribute('show', '');
    this.button.disabled = false;
  }

  load() {
    const { title = 'Snippet' } = this.dataset;
    this.playgroundIde.title = title;
  }
}

customElements.define('docs-playground', DocsPlayground);
