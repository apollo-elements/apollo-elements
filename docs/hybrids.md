```js
import { ApolloQuery, define, html } from '@apollo-elements/hybrids';

const render = ({ data }) =>
  html`<div>${data.hello}</div>`;

define('connected-element', { ...ApolloQuery, render });
```
