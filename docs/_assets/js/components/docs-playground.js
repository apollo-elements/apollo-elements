// Docs Playground Component (from rocket-preset-playground-elements)
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
