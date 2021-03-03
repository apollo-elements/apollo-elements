---
name: apollo-elements-mixins
attrs: progressive
---

```js
import { ApolloQueryMixin } from '@apollo-elements/mixins';

class PersonElement extends ApolloQueryMixin(HTMLElement) {









}
```

```js reveal


class PersonElement extends ApolloQueryMixin(HTMLElement) {
  query = gql`
    query PersonQuery($id: ID!) {
      person(id: $id) {
        name
        picture
        friends { name }
      }
    }
  `;
}
```

```js reveal



  query = gql`
    query PersonQuery($id: ID!) { ... }
  `;

  attributeChangedCallback(attribute, oldVal, newVal) {
    if (attribute === 'person-id')
      this.variables = val ? { id: newVal }; break;
  }


```

```js reveal



  #data = null;
  get data() { return this.#data; }
  set data(data) { this.#data = data; this.render(); }







```

```js reveal
import { ApolloQueryMixin } from '@apollo-elements/mixins';

class PersonElement extends ApolloQueryMixin(HTMLElement) {
  #data = null;
  get data() { return this.#data; }
  set data(data) { this.#data = data; this.render(); }

  render() {
    this.shadowRoot.getElementById('friends').textContent =
    (this.data.person.friends ?? []).map(friend =>
      `${this.data.person.name} 💗 ${friend.name}`).join('\n');
  }
}
```
