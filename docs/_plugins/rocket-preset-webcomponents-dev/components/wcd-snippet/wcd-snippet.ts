const template = document.createElement('template');
template.innerHTML = `ESBUILD_BUNDLED_WCD_HTML`;

export class WcdSnippet extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['live', 'data-id', 'file'];
  }

  declare iframe: HTMLIFrameElement;
  declare button: HTMLButtonElement;

  constructor() {
    super();
    this.show = this.show.bind(this);
    this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
    this.iframe = this.shadowRoot.querySelector('iframe') as HTMLIFrameElement;
    this.button = this.shadowRoot.querySelector('button') as HTMLButtonElement;
    this.button.addEventListener('click', this.show);
  }

  get url(): URL {
    const { id } = this.dataset;
    const file = this.getAttribute('file');
    const url = new URL(`https://webcomponents.dev/edit/${id}`);
    url.searchParams.set('embed', '1');
    url.searchParams.set('sv', '1');
    url.searchParams.set('pm', '1');
    if (file)
      url.searchParams.set('file', file);
    return url;
  }

  attributeChangedCallback(): void {
    if (this.hasAttribute('live'))
      return this.load();
  }

  show(): void {
    this.setAttribute('live', '');
  }

  load(): void {
    const { title = 'Snippet' } = this.dataset;
    this.iframe.title = title;
    this.iframe.src = this.url.toString();
  }
}

customElements.define('wcd-snippet', WcdSnippet);
