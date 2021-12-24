---
name: HTML Queries in Svelte
attrs: fade-in fade-out
---

<img slot="end-start" alt="Svelte" src="/_merged_assets/brand-logos/svelte.svg"/>

```html
<script>
  import '@apollo-elements-demos/spacex-launches';

  let selectedLaunchId = '';
  const limit = 3;

  const onSelect = event => selectedLaunchId = event.target.selected?.id ?? '';
</script>

<spacex-launches
  limit={limit}
  on:select={onSelect}
></spacex-launches>

<spacex-launch launch-id={selectedLaunchId}></spacex-launch>
```
