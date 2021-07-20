---
layout: layout-api
package: '@apollo-elements/polymer'
module: polymer-apollo-query.js
templateEngineOverride: njk,md
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> Polymer >> polymer-apollo-query || 10

## Demo

{% set query %}{% include '../_assets/Launches.query.graphql' %}{% endset %}
{% set style %}{% include '../_assets/SpacexLaunches.css' %}{% endset %}

```ts playground gluon-query launches.js
import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/polymer/lib/elements/dom-repeat.js'
import '@apollo-elements/polymer/polymer-apollo-query';
import '@apollo-elements/components/apollo-client';

class SpacexLaunches extends PolymerElement {
  static get is() { return 'spacex-launches'; }

  static get template() {
    return html`
      <style>
        {{ style | trim | indent(8) }}
      </style>
      <polymer-apollo-query data="{%raw%}{{ data }}{%endraw%}">
        <script type="application/graphql">
          {{ query | trim | indent(10) }}
        </script>
        <script type="application/json">
          { "limit": 3 }
        </script>
      </polymer-apollo-query>
      <ol>
        <dom-repeat items="[[ data.launchesPast ]]" as="launch">
          <template>
            <li>
              <article>
                <span>[[ launch.mission_name ]]</span>
                <img src="[[ launch.links.mission_patch_small ]]" alt="Badge" role="presentation"/>
              </article>
            </li>
          </template>
        </dom-repeat>
      </ol>
    `;
  }
}

customElements.define(SpacexLaunches.is, SpacexLaunches);
```

```html playground-file gluon-query index.html
{% include '../_assets/index.spacex-launches.html' %}
```

Read the [query component guides](../../../../guides/usage/queries/) for more examples and tips.
