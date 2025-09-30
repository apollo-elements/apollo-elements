---
title: "Decorators"
weight: 50
description: "Property Decorators for Apollo Elements"
layout: "layout-api"
package: "'@apollo-elements/core'"
module: "decorators.js"
sidebar: api
---

<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->


Decorators for Apollo Elements. Used internally to reflect properties from controllers to their elements. Normally you shouldn't need to import these directly.

```ts
import { controlled } from '@apollo-elements/core/decorators';

class ControlledData<D, V = VariablesOf<D>> extends LitElement {
  controller = new ApolloQueryController<D, V>(this);

  @controlled()
  @state()
  data: Data<D> | null = null;
}
```
