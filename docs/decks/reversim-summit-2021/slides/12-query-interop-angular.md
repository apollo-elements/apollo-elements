---
name: HTML Queries in Angular
attrs: fade-out
---

<img slot="end-start" alt="Angular" src="/_merged_assets/brand-logos/angular.svg"/>

```html
{%- raw -%}
<spacex-launches
  (change)="onChange($event)"
  (select)="onSelect($event)"
></spacex-launches>

<p>There are {{launches.length}} launches available.</p>

<spacex-launch [launchId]="selectedLaunchId"></spacex-launch>
{%- endraw -%}
```

-----

```ts
import { Component } from '@angular/core';
import '@apollo-elements-demos/spacex-launches';

@Component({ selector: 'app-root', templateUrl: 'App.component.html' })
export class AppComponent {
  selectedLaunchId = '';
  launches = [];

  onChange = event => this.launches = event.target.launches ?? [];
  onSelect = event => this.selectedLaunchId = event.target.selected?.id ?? '';
}
```
