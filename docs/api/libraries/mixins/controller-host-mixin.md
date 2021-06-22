---
layout: layout-api
package: '@apollo-elements/mixins'
module: controller-host-mixin.js
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> Class Mixins >> ControllerHostMixin

Mixin which adds the `ReactiveController` interface to your element. You can use this to render updates from your controllers by implementing an `update` method that calls `super.update()`.

```js playground mouse-controller color-picker.js
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
```

```css playground-file mouse-controller color-picker.css
:host {
  display: block;
  overflow: hidden;
  cursor: none;
  height: 100%;
  width: 100%;
  background:
    linear-gradient(to bottom, hsla(0 100% 50% / 0%), hsla(0 0% 50% / 100%)),
    linear-gradient(to right,
      hsl(0 100% 50%) 0%,
      hsl(0.2turn 100% 50%) 20%,
      hsl(0.3turn 100% 50%) 30%,
      hsl(0.4turn 100% 50%) 40%,
      hsl(0.5turn 100% 50%) 50%,
      hsl(0.6turn 100% 50%) 60%,
      hsl(0.7turn 100% 50%) 70%,
      hsl(0.8turn 100% 50%) 80%,
      hsl(0.9turn 100% 50%) 90%,
      hsl(1turn 100% 50%) 100%
    );
}

#loupe {
  --cursor-size: 15px;
  position: relative;
  display: block;
  position: relative;
  height: 40px;
  width: 40px;
  border: 3px solid black;
  border-radius: 100%;
  background: hsl(var(--hue) var(--saturation) 50%);
  transform: translate(var(--x), var(--y));
}

#cursor {
  user-select: none;
  font-family: monospace;
  display: block;
  font-size: var(--cursor-size);
  line-height: var(--cursor-size);
  position: absolute;
  top: calc(-0.5 * var(--cursor-size));
  left: calc(-0.5 * var(--cursor-size));
  width: var(--cursor-size);
  height: var(--cursor-size);
  transform-origin: center;
}
```

```js playground-file mouse-controller mouse-controller.js
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
```

```html playground-file mouse-controller index.html
<script type="module" src="color-picker.js"></script>
<color-picker></color-picker>
<output id="picked"></output>
<script>
  document.querySelector('color-picker')
    .addEventListener('pick', ({ detail }) => picked.style.backgroundColor = detail);
</script>
```

```css playground-file mouse-controller style.css
html, body {
  font-family: sans-serif;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}

#picked {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  display: block;
}
```
