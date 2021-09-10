import { ControllerHostMixin } from '@apollo-elements/mixins/controller-host-mixin';
import { MouseController } from './mouse-controller.js';
const template = document.createElement('template');
      template.innerHTML = `
        <link rel="stylesheet" href="color-picker.css">
        <div id="loupe"><div id="cursor">⊹</div></div>
      `;

class ColorPicker extends ControllerHostMixin(HTMLElement) {
  mouse = new MouseController(this);

  constructor() {
    super()
    this
      .attachShadow({ mode: 'open' })
      .append(template.content.cloneNode(true));
    this.loupe = this.shadowRoot.getElementById('loupe');
    this.cursor = this.shadowRoot.getElementById('cursor');
    this.addEventListener('click', () => {
      this.pick();
      this.cursor.animate({ scale: ['100%', '120%', '100%'], easing: 'ease-in-out' }, 300);
    });
  }

  update() {
    const { x, y } = this.mouse.pos;
    const { clientWidth, clientHeight } = document.documentElement;
    const hue = Math.floor((x / clientWidth) * 360);
    const saturation = 100 - Math.floor((y / clientHeight) * 100);
    this.style.setProperty('--x', `${x}px`);
    this.style.setProperty('--y', `${y}px`);
    this.style.setProperty('--hue', hue);
    this.style.setProperty('--saturation', `${saturation}%`);
    if (this.mouse.down)
      this.pick();
    super.update();
  }

  async pick() {
    await this.updateComplete;
    this.dispatchEvent(new CustomEvent('pick', {
      bubbles: true,
      detail: getComputedStyle(this.loupe).getPropertyValue('background-color')
    }));
  }
};

customElements.define('color-picker', ColorPicker);
