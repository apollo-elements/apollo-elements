const template = document.createElement("template");
template.innerHTML = `
  <style>
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: auto;
    border-radius: var(--wcd-snippet-border-radius, 6px);
    overflow: hidden;
  }

  iframe {
    display: none;
    border: 0;
    overflow: hidden;
  }

  #snippet {
    display: contents;
  }

  :host([live]) iframe {
    display: block;
    width: var(--iframe-width, 100%);
    height: var(--iframe-height, 600px);
  }

  :host([live]) #snippet,
  :host([live]) button {
    display: none;
  }

  button {
    color: inherit;
    position: absolute;
    bottom: 0;
    right: 0;
    border-top-left-radius: 6px;
    padding: 9px 16px;
    border: none;
    cursor: pointer;
    display: block;
    font-size: 16px;
    background: var(--wcd-snippet-button-background, hsla(0 100% 100% / 0.9));
    outline: none;
    transition: color, background 0.1s ease;
  }

  button:focus,
  button:hover {
    color: var(--wcd-snippet-button-focus-color, hsla(0 100% 100% / 0.75));
    background: var(--wcd-snippet-button-focus-background, hsla(0 100% 0% / 0.75));
  }

  </style>

  <div id="snippet"><slot></slot></div>

  <iframe part="iframe" sandbox="allow-scripts allow-same-origin"></iframe>

  <button part="button">Live Demo</button>
`;

class WcdSnippet extends HTMLElement {
  static get observedAttributes() {
    return ['live', 'data-id', 'file'];
  }

  constructor() {
    super();
    this.show = this.show.bind(this);
    this.attachShadow({ mode: "open" }).append(template.content.cloneNode(true));
    this.button.addEventListener('click', this.show);
  }

  $(x: string) { return this.shadowRoot.querySelector(x); }

  get iframe(): HTMLIFrameElement { return this.$("iframe") as HTMLIFrameElement; }
  get button(): HTMLButtonElement { return this.$("button") as HTMLButtonElement; }

  get url() {
    const id = this.dataset.id;
    const file = this.getAttribute('file');
    const url = new URL(`https://webcomponents.dev/edit/${id}`);
    url.searchParams.set("embed", '1');
    url.searchParams.set("sv", '1');
    url.searchParams.set("pm", '1');
    if (file)
      url.searchParams.set("file", file);
    return url;
  }

  attributeChangedCallback() {
    if (this.hasAttribute('live'))
      return this.load();
  }

  show() {
    this.setAttribute("live", '');
  }

  load() {
    const { title = "Snippet" } = this.dataset;
    this.iframe.title = title;
    this.iframe.src = this.url.toString();
  }
}

customElements.define("wcd-snippet", WcdSnippet);
