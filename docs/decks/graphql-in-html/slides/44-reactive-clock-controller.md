---
name: ClockController
attrs: alt
---

```js playground clock-controller clock-controller.js
export class ClockController {
  host;

  value = new Date();
  timeout;
  _timerID;

  constructor(host, timeout = 1000) {
    (this.host = host).addController(this);
    this.timeout = timeout;
  }
  hostConnected() {
    // Start a timer when the host is connected
    this._timerID = setInterval(() => {
      this.value = new Date();
      // Update the host with new value
      this.host.requestUpdate();
    }, this.timeout);
  }
  hostDisconnected() {
    // Clear the timer when the host is disconnected
    clearInterval(this._timerID);
    this._timerID = undefined;
  }
}
```

```js playground-file clock-controller my-element.js
import {LitElement, html} from 'lit';
import {ClockController} from './clock-controller.js';

class MyElement extends LitElement {
  // Create the controller and store it
  clock = new ClockController(this, 100);

  // Use the controller in render()
  render() {
    const formattedTime = timeFormat.format(this.clock.value);
    return html`Current time: ${formattedTime}`;
  }
}
customElements.define('my-element', MyElement);

const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});
```

```html playground-file clock-controller index.html
<script type="module" src="./my-element.js"></script>
<my-element></my-element>
<style>:root { font-size: 4em }</style>
```
