import { LitElement, html, css } from 'lit';

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export class MouseController {
  down = false;

  pos = { x: 0, y: 0 };

  onMousemove = e => {
    this.pos = { x: e.clientX, y: e.clientY };
    this.host.requestUpdate();
  };

  onMousedown = e => {
    this.down = true;
    this.host.requestUpdate();
  };

  onMouseup = e => {
    this.down = false;
    this.host.requestUpdate();
  };

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    window.addEventListener('mousemove', this.onMousemove);
    window.addEventListener('mousedown', this.onMousedown);
    window.addEventListener('mouseup', this.onMouseup);
  }

  hostDisconnected() {
    window.removeEventListener('mousemove', this.onMousemove);
    window.removeEventListener('mousedown', this.onMousedown);
    window.removeEventListener('mouseup', this.onMouseup);
  }
}

class WibblerWobbler extends LitElement {
  static is = 'wibbler-wobbler';

  createRenderRoot() { return this; }

  offset = -40;

  mouse = new MouseController(this);

  mo = new MutationObserver(() => this.setup());

  ro = new ResizeObserver(() => this.setup());

  connectedCallback() {
    super.connectedCallback();
    this.mo.observe(this, { childList: true });
    this.ro.observe(this);
  }

  async setup() {
    await customElements.whenDefined('code-tabs')
    this.tabs = this.querySelector('code-tabs');
    if (!this.tabs) return;
    await this.tabs.updateComplete;
    await this.updateComplete;
    this.svg = this.querySelector('svg');
    const { x, y, width, height } = this.svg.getBoundingClientRect();
    this.pivot = { x: x + (width / 2), y: y + (height / 2) };
    const buttons = this.tabs.shadowRoot.querySelectorAll('button');
    this.minAngle = this.getAngleTo(buttons.item(0).getBoundingClientRect());
    const lastButtonRect = buttons.item(buttons.length - 1).getBoundingClientRect()
    this.maxAngle = this.getAngleTo({
      x: lastButtonRect.x + lastButtonRect.width,
      y: lastButtonRect.y + lastButtonRect.height,
    });
  }

  getAngleTo({ x, y }) {
    const dx = this.pivot.x - x;
    const dy = this.pivot.y - y;
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }

  update(changed) {
    this.animate()
    super.update(changed);
  }

  animate() {
    if (
      !this.tabs ||
      this.tabs.selectedItem ||
      (this.mouse.pos.y > this.pivot.y) ||
      (this.getBoundingClientRect().y - this.mouse.pos.y) > 325
    ) return;
    const { minAngle, maxAngle, offset } = this;
    const deg = clamp(Math.abs(this.getAngleTo(this.mouse.pos)), minAngle, maxAngle);;
    this.svg.style.setProperty('--deg', `${offset + deg}deg`);
    const id = this.tabs?.shadowRoot?.querySelector?.('button:hover')?.dataset?.id ?? 'nothing';
    const hovered = this.querySelector(`[data-id="${id}"]`)
    this.svg.style.setProperty('--fw-color', hovered?.dataset?.color);
  }
}

customElements.define(WibblerWobbler.is, WibblerWobbler);
