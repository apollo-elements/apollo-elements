---
name: ControllerHostMixin
attrs: alt progressive
---

```js
import { MyController } from './my-controller.js';


class MyElement extends LitElement {
  myController = new MyController(this);

  render() {
    return html`
      ${this.myController.someState}
    `;
  }
}
```

```js reveal
import { MyController } from './my-controller.js';
import { ControllerHostMixin } from '@apollo-elements/mixins/controller-host-mixin.js';

class MyElement extends ControllerHostMixin(HTMLElement) {
  myController = new MyController(this);






}
```

```js reveal
import { MyController } from './my-controller.js';
import { ControllerHostMixin } from '@apollo-elements/mixins/controller-host-mixin.js';

class MyElement extends ControllerHostMixin(HTMLElement) {
  myController = new MyController(this);

  update(changed) {
    super.update(changed);
    this.shadowRoot.textContent =
      this.myController.someState;
  }
}
```
