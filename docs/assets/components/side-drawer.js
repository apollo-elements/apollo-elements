// originally (c) Wes Goulet (MIT license)

/**
 * A simple side drawer custom element
 */
class SideDrawer extends HTMLElement {
  static #template = document.createElement('template');
  static #instances = new Set();

  static {
    this.#template.innerHTML = `
      <style>
        :host {
          background-color: #ffffff;
          width: 350px;
          max-width: 75vw;

          visibility: hidden;
          transition: visibility 0.5s;
        }

        :host([open]) {
          visibility: visible;
        }

        :host([open]) #d {
          --side-drawer-translate: none;
          box-shadow: var(--side-drawer-shadow, 0px 0px 25px 0px rgba(0, 0, 0, 0.5));
        }

        :host([open]) #fs {
          opacity: var(--side-drawer-overlay-opacity, 0.7);
          visibility: visible;
        }

        ::slotted(*) {
          box-sizing: border-box;
        }

        #d {
          display: block;
          position: var(--sidebar-content-position, fixed);
          z-index: 99;
          background-color: inherit;
          -webkit-overflow-scrolling: touch;
          overflow: auto;
          overscroll-behavior: contain;
          backdrop-filter: var(--side-drawer-backdrop-filter, none);
          top: 0;
          bottom: 0;
          left: 0;
          height: 100%;
          box-sizing: border-box;
          transform: var(--side-drawer-translate, translateX(-100%));
          transition: var(--side-drawer-transition, transform 0.25s ease-out);
          width: inherit;
          max-width: inherit;
          border-top-right-radius: inherit;
          border-bottom-right-radius: inherit;
        }

        #fs {
          position: fixed;
          display: var(--side-drawer-background-display, initial);
          z-index: 98;
          background-color: #000000;
          backdrop-filter: var(--side-drawer-backdrop-filter, none);

          top: 0;
          bottom: 0;
          right: -30px; /* hide scrollbar until overscroll bug is fixed */
          height: 100vh;
          transition: var(--side-drawer-overlay-transition, opacity linear 0.25s);
          width: calc(100vw + 30px); /* put back to just 100vw once overscroll bug fixed */
          opacity: 0;
          visibility: hidden;

          overflow: auto;
          overscroll-behavior: contain;
        }

        /*
         * Workaround for bug https://bugs.chromium.org/p/chromium/issues/detail?id=813094
         * Once bug is fixed and in the wild we can remove this element and make #if overflow:hidden
         * and set "right: 0; width: 100vw" for #fs
         */
        #ifs {
          height: calc(100vh + 1px);
        }
      </style>
      <slot id="d"></slot>
      <div id="fs">
        <div id="ifs"></div>
      </div>
    `;
    document.addEventListener('keyup', e =>
      this.#instances.forEach(i =>
        i.#onKeyup(e)));
  }

  static get observedAttributes() {
    return ["open"];
  }

  get open() { return this.hasAttribute("open"); }
  set open(open) {
    this.toggleAttribute('open', open);
    if (open)
      SideDrawer.#instances.add(this);
    else
      SideDrawer.#instances.delete(this);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).append(SideDrawer.#template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot?.getElementById("fs").addEventListener("click", this.#onBackdropClick);
  }

  disconnectedCallback() {
    SideDrawer.#instances.delete(this);
  }

  toggle() {
    this.open = !this.open;
  }

  /** @param {KeyboardEvent} e */
  #onKeyup = (e) => {
    if (!e.altKey) {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          this.open = false;
          break;
      }
    }
  };

  /** @param {string} name */
  attributeChangedCallback(name) {
    if (name === 'open') {
      // When the drawer is closed, update keyboard/screen reader behavior.
      if (!this.open) {
        this.setAttribute('tabindex', '-1');
        this.setAttribute('aria-disabled', 'true');
        this.dispatchEvent(new Event('close', { bubbles: true }));
      } else {
        this.setAttribute('tabindex', '0');
        this.setAttribute('aria-disabled', 'false');
        this.focus({ preventScroll: true });
        this.dispatchEvent(new Event('open', { bubbles: true })
        );
      }
    }
  }

  #onBackdropClick = () => {
    this.open = false;
  };
}

customElements.define('side-drawer', SideDrawer);
