---
layout: layout-api
package: '@apollo-elements/core'
module: reactive-variable-controller.js
description: Reactive Variable Controller for Apollo Elements
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Core >> Controllers >> ReactiveVariableController || 100

`ReactiveVariableController` is a convenience wrapper around [apollo reactive variables](https://www.apollographql.com/docs/react/local-state/reactive-variables/).

<inline-notification type="tip">

Apollo Elements controllers are not limited to Lit. Use them with any object that [implements the `ReactiveControllerHost` interface](https://lit.dev/docs/composition/controllers/). See [`ControllerHostMixin`](/api/libraries/mixins/controller-host-mixin/) for an example.

</inline-notification>

```ts playground reactive-variable-controller profile-page.ts
import { customElement } from 'lit/decorators.js';
import { html, LitElement } from 'lit';

import { ReactiveVariableController } from '@apollo-elements/core';

import { locationVar } from './router.js';

import style from './profile-page.css.js';

@customElement('profile-page')
class ProfilePage extends LitElement {
  static styles = style;

  router = new ReactiveVariableController(this, locationVar);

  render() {
    const { username } = this.router.value?.groups ?? {}
    return html`
      <section ?hidden=${!username}>
        <h2>User ${username}</h2>
      </section>
    `;
  }
}
```

```js playground-file reactive-variable-controller profile-page.css.ts
import { css } from 'lit';
export default css`
  :host { display: block; }
  [hidden] { display: none !important; }
`;
```

```html playground-file reactive-variable-controller index.html
<script type="module" src="./profile-page.js"></script>
<profile-home></profile-home>
```

```js playground-file reactive-variable-controller router.ts
import 'urlpattern-polyfill';

import { installRouter } from 'pwa-helpers/router';

import { makeVar } from '@apollo/client/core';

const pattern = new URLPattern({ pathname: '/users/:username' });

const getLocation = (loc = window.location) => ({ ...loc,
  groups: pattern.exec(loc.pathname)?.pathname?.groups
})

export const locationVar = makeVar(getLocation());

installRouter(loc => locationVar(getLocation(loc)));
```
