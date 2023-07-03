---
layout: sidebar.webc # layout-api
package: '@apollo-elements/core'
module: events.js
moduleContents: multiple
description: Events for Apollo Elements
title: Events
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

`<apollo-client>` listens for `apollo-element-connected` and 
`apollo-element-disconnected` events to manage their client reference.

```ts
const APOLLO_ELEMENTS = new Set();

window.addEventListener('apollo-element-connected', event =>
  APOLLO_ELEMENTS.add(event.detail));

window.addEventListener('apollo-element-disconnected', event =>
  APOLLO_ELEMENTS.delete(event.detail));
```
