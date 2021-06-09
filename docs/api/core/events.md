---
layout: layout-api
package: '@apollo-elements/core'
module: events.js
moduleContents: multiple
description: Events for Apollo Elements
---
# Core >> Events || 60

`<apollo-client>` listens for `apollo-element-connected` and `apollo-element-disconnected` events to manage their client reference.

```ts
const APOLLO_ELEMENTS = new Set();

window.addEventListener('apollo-element-connected', event =>
  APOLLO_ELEMENTS.add(event.detail));

window.addEventListener('apollo-element-disconnected', event =>
  APOLLO_ELEMENTS.delete(event.detail));
```
