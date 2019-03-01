```js
import { ApolloQuery } from '@apollo-elements/lit-apollo'
import { html, customElement } from 'lit-element'
import CONNECTED_ELEMENT from './connected-element.graphql'
import client from '../apollo-client'

@customElement('connected-element')
class ConnectedElement extends ApolloQuery {
  query = CONNECTED_ELEMENT
  client = client
  render() {
    return (
        loading ? html`<what-spin></what-spin>`
      : error ? html`<div>${this.error.message}</div>`
      : html`<p>${this.data.hello.greeting}, ${this.data.hello.name}</p>`
    );
   }
};
```
