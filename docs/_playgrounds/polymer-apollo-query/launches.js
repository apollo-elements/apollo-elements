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
      <polymer-apollo-query data="{{ data }}">
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
