---
name: HTML Queries in React
attrs: fade-in fade-out
---

<img slot="end-start" alt="React" src="/_merged_assets/brand-logos/react.svg"/>

```ts
import { useState } from 'react';
import React from 'react';
import '@apollo-elements-demos/spacex-launches';

export const LaunchesDemo = () => {
  const [{ id: selectedLaunchId }, setSelected] = useState({});
  const [launches, setLaunches] = useState([]);

  return (
    <spacex-launches
      onchange={event => setLaunches(event.target.launches)}
      onselect={event => setSelected(event.target.selected)}
    ></spacex-launches>

    <p>There are {launches.length} launches available.</p>

    <spacex-launch launchId={selectedLaunchId ?? ''}></spacex-launch>
  );
};
```
