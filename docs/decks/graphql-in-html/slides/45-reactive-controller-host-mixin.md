---
name: ControllerHostMixin
attrs: alt progressive
---

```js



class MyElement extends LitElement {







}
```

```js reveal
import { ClockController } from './clock-controller.js';


class MyElement extends LitElement {
  clock = new ClockController(this);






}
```

```js reveal
import { ClockController } from './clock-controller.js';


class MyElement extends LitElement {
  clock = new ClockController(this);

  render() {
    return html`
      <p>time: <time>${this.clock.value}</time></p>
    `;
  }
}
```

```js reveal
import { ClockController } from './clock-controller.js';
import { ControllerHostMixin } from '@apollo-elements/mixins/controller-host-mixin.js';

class MyElement extends ControllerHostMixin(HTMLElement) {
  clock = new ClockController(this);






}
```

```js reveal
import { ClockController } from './clock-controller.js';
import { ControllerHostMixin } from '@apollo-elements/mixins/controller-host-mixin.js';

class MyElement extends ControllerHostMixin(HTMLElement) {
  clock = new ClockController(this);

  update(changed) {
    super.update(changed);
    this.shadowRoot.querySelector('time').textContent =
      this.clock.value;
  }
}
```
