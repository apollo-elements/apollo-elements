---
name: HTML Queries in Vue
attrs: fade-in fade-out
---

<img slot="end-start" alt="Vue" src="/_merged_assets/brand-logos/vue.svg"/>

```html
<template>{%raw%}
  <spacex-launches
    @change="onChange"
    @select="onSelect"
  ></spacex-launches>

  <p>There are {{launches.length}} launches available.</p>

  <spacex-launch :launch-id="selectedLaunchId"></spacex-launch>
</template>{%endraw%}

<script>
  import { defineComponent } from 'vue';
  import '@apollo-elements-demos/spacex-launches';

  export default defineComponent({
    name: 'ApolloElementsDemo',
    data: ()  => ({ selectedLaunchId: '', launches: [] }),
    methods: {
      onChange: event => this.launches = event.target.launches ?? [],
      onSelect: event => this.selectedLaunchId = event.target.selected?.id ?? '',
    }
  });
</script>
```
