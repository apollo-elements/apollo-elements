```js
import { ApolloQuery, html } from '@apollo-elements/gluon';
import CONNECTED_ELEMENT from './connected-element.graphql'
import client from '../apollo-client'

class ConnectedElement extends ApolloQuery {
  client = client
  query = CONNECTED_ELEMENT
  template = (
      loading ? html`<what-spin></what-spin>`
    : error ? html`<div>${this.error.message}</div>`
    : html`<p>${this.data.hello.greeting}, ${this.data.hello.name}</p>`
  )
};

customElements.define('connected-element', ConnectedElement)
```
