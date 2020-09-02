## 🏦 Managing the Cache
When defining components that issue graphql mutations, you may want to take control over how and when Apollo updates it's local cache. You can do this with the `updater` property on elements that extend from `ApolloMutation`

```js
import gql from 'graphql-tag';
import { render, html } from 'lit-html';
import { client } from './client';
import { ApolloMutation } from '@apollo-elements/lit-apollo';

class MutatingElement extends ApolloMutation {
  render() {
    return html`
      <loading-overlay ?active="${this.loading}"></loading-overlay>
      <button ?hidden="${this.data}" @click="${this.mutate}"></button>
      <div ?hidden="${!this.data}">${this.data.myResponse}</div>
      `;
  }
}

customElements.define('mutating-element', MutatingElement);

const mutation = gql`
  mutation($id: ID!) {
    MyMutation(id: $id) {
      mutationResult
    }
  }
`;

/**
 * Example update function which reads a cached query result, merges
 * it with the mutation result, and then writes it back to the cache.
 */
const updateFunc = (cache, response) => {
  // ostensibly looks up the cached object for mutationResult
  const query = MyQuery;
  const variables = { id: 1 };
  const cached = cache.readQuery({ query, variables });
  const changed = computeChanges(cached);
  // mergeMutationResult is a made-up function.
  const mutationResult = mergeMutationResult(cached, changed);
  return cache.writeData({ query, data: { mutationResult } });
};

const template = html`
  <mutating-element
    .mutation="${mutation}"
    .variables="${{id: 1}}"
    .updater="${updateFunc}"
  ></mutating-element>
`;

render(template, container);
```
