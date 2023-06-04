---
name: HTML Queries in Angular
attrs: fade-out
---

<img slot="end-start" alt="Angular" src="/_merged_assets/brand-logos/angular.svg"/>

```html
<spacex-launches
  [limit]="limit"
  (select)="onSelect($event)"
></spacex-launches>

<spacex-launch [launchId]="selectedLaunchId"></spacex-launch>
```

-----

```ts
import { Component } from '@angular/core';
import '@apollo-elements-demos/spacex-launches';

@Component({ selector: 'app-root', templateUrl: 'App.component.html' })
export class AppComponent {
  limit = 3;
  selectedLaunchId = '';

  onSelect = event =>
    this.selectedLaunchId = event.target.selected?.id ?? '';
}
```
