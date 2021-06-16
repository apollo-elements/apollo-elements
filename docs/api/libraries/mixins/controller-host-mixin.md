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

```js playground mouse-controller mouse-host.js
import { ControllerHostMixin } from '@apollo-elements/mixins/controller-host-mixin';
import { MouseController } from './mouse-controller.js';
const template = document.createElement('template');
      template.innerHTML = `
        <link rel="stylesheet" href="mouse-host.css">
        <h3>The mouse is at:</h3>
        <dl>
          <dt>x</dt> <dd><output id="x"></output></dd>
          <dt>y</dt> <dd><output id="y"></output></dd>
        </dl>
      `;

customElements.define('mouse-host', class MouseHost extends ControllerHostMixin(HTMLElement) {
  mouse = new MouseController(this);

  $ = x => this.shadowRoot.querySelector(x);

  constructor() {
    super()
    this
      .attachShadow({ mode: 'open' })
      .append(template.content.cloneNode(true));
  }

  update() {
    const { x, y } = this.mouse.pos;
    const { clientWidth, clientHeight } = document.documentElement;
    this.$('#x').textContent = x;
    this.$('#y').textContent = y;
    this.style.setProperty('--hue', (x / clientWidth) * 250);
    this.style.setProperty('--saturation', `${(y / clientHeight) * 100}%`);
    super.update();
  }
});
```

```js playground-file mouse-controller mouse-controller.js
import { ReactiveControllerHost } from 'lit';

export class MouseController {
  pos = { x: 0, y: 0 };

  onMouseMove = e => {
    this.pos = { x: e.clientX, y: e.clientY };
    this.host.requestUpdate();
  };

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    window.addEventListener('mousemove', this.onMouseMove);
  }

  hostDisconnected() {
    window.removeEventListener('mousemove', this.onMouseMove);
  }
}
```

```html playground-file mouse-controller index.html
<script type="module" src="mouse-host.js"></script>
<mouse-host></mouse-host>
```

```js playground-file style.css
html {
  font-family: sans-serif;
}
```

```css playground-file mouse-controller mouse-host.css
:host {
  height: 100%;
  width: 100%;
  display: grid;
  place-content: center;
  background: hsl(var(--hue) var(--saturation) 50%);
}

dt, dd { margin: 0; }
dl {
  display: grid;
  grid-template: auto 1fr / auto 1fr;
  gap: 4px;
}
```

```css playground-hidden-file mouse-controller style.css
html, body {
  font-family: sans-serif;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}
```

```json playground-import-map mouse-controller
{
  "imports": {
    "@apollo-elements/mixins/controller-host-mixin": "../../../mixins.js"
  }
}
```
