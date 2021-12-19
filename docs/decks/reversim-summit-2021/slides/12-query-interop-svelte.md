---
name: HTML Queries in Svelte
attrs: fade-in fade-out
---

<img slot="end-start" alt="Svelte" src="/_merged_assets/brand-logos/svelte.svg"/>

```html
<script>
  import '@apollo-elements-demos/spacex-launches';

  let selectedLaunchId = '';
  let launches = [];

  const onChange = event => launches = event.target.launches ?? [];
  const onSelect = event => selectedLaunchId = event.target.selected?.id ?? '';
</script>

<spacex-launches
  on:change={onChange}
  on:select={onSelect}
></spacex-launches>

<p>There are {launches.length} launches available.</p>

<spacex-launch launch-id={selectedLaunchId}></spacex-launch>
```
