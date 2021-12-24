---
name: HTML Queries in Vue
attrs: fade-in fade-out
---

<img slot="end-start" alt="Vue" src="/_merged_assets/brand-logos/vue.svg"/>

```html
<template>{%raw%}
  <spacex-launches
    :limit="{{ limit }}"
    @select="onSelect"
  ></spacex-launches>

  <spacex-launch :launch-id="selectedLaunchId"></spacex-launch>
</template>{%endraw%}

<script>
  import { defineComponent } from 'vue';
  import '@apollo-elements-demos/spacex-launches';

  export default defineComponent({
    name: 'ApolloElementsDemo',
    data: ()  => ({
      limit: 3
      selectedLaunchId: '',
    }),
    methods: {
      onSelect: event => this.selectedLaunchId = event.target.selected?.id ?? '',
    }
  });
</script>
```
