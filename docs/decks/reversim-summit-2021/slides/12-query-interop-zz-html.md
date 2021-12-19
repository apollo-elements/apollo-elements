---
name: HTML Queries in HTML
attrs: fade-in
---

<img slot="end-start" alt="Vue" src="/html5.svg"/>

```html
<script type="module" src="https://unpkg.com/@apollo-elements/components?module"></script>
<apollo-client uri="https://spacex.land/graphql">{%raw%}
  <apollo-query id="launches">
    <script type="application/graphql" src="Launches.query.graphql"></script>
    <template>
      <mwc-list>
        <mwc-list-item noninteractive disabled ?hidden="{{ !loading }}">Loading...</mwc-list-item>
        <template type="repeat" items="{{ data.launches ?? [] }}">
          <mwc-list-item
              twoline
              graphic="icon"
              value="{{ launch.id }}"
              data-launch-id="{{ launch.id }}">
            <span>{{ launch.missionName }}</span>
            <img slot="graphic" src="{{ launch.links.missionPatch }}" role="presentation" />
            <span slot="secondary">{{ launch.launchDateUtc }}</span>
          </mwc-list-item>
        </template>
      </mwc-list>
    </template>
  </apollo-query>{%endraw%}
</apollo-client>
```
