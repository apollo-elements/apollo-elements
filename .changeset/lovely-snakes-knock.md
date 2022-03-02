---
"@apollo-elements/core": minor
---

Adds `ReactiveVariableController`, a wrapper around
[apollo reactive variables](https://www.apollographql.com/docs/react/local-state/reactive-variables/)
which makes them easier to work with outside of React apps.

For example, use it to create a simple SPA router with the [pwa-helpers](https://github.com/Polymer/pwa-helpers) package and `URLPattern`.

Create the reactive variable and attach it to the SPA router:
```ts
import 'urlpattern-polyfill'

import { installRouter } from 'pwa-helpers/router';

import { makeVar } from '@apollo/client/core';

const pattern = new URLPattern({ pathname: '/users/:username' });

const getLocation = (loc = window.location) => ({
  ...window.location,
  groups: pattern.exec(location.pathname)?.pathname?.groups
})

export const locationVar = makeVar(getLocation());

installRouter(loc => locationVar(getLocation(loc)));
```

Then use it in your components: 

```ts
export class PageViewer extends LitElement {
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
