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
  const limit = 3;

  return (
    <spacex-launches
      limit={limit}
      onselect={event => setSelected(event.target.selected)}
    ></spacex-launches>

    <spacex-launch launchId={selectedLaunchId ?? ''}></spacex-launch>
  );
};
```
