```js
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixins';

class VanillaQuery extends ApolloQueryMixin(HTMLElement) {
  get data() {
    return this.__data;
  }

  set data(data) {
    this.__data = data;
    this.shadowRoot.innerText =
      `${data.helloWorld.greeting}, ${data.helloWorld.name}`;
  }  
}
```
