---
layout: layout-api
package: mixins
module: controller-host-mixin.js
sidebar: api
---

<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> Class Mixins >> ControllerHostMixin

Mixin which adds the `ReactiveController` interface to your element. You can use this to render updates from your controllers by implementing an `update` method that calls `super.update()`.

{{<docs-playground "mouse-controller" "js">}}
{{<include color-picker.js>}}
{{</docs-playground>}}

{{<playground-file "mouse-controller" "color-picker.css">}}
{{<include color-picker.css>}}
{{</playground-file>}}

{{<playground-file "mouse-controller" "mouse-controller.js">}}
{{<include mouse-controller.js>}}
{{</playground-file>}}

{{<playground-file "mouse-controller" "index.html">}}
{{<include index.html>}}
{{</playground-file>}}

{{<playground-file "mouse-controller" "style.css">}}
{{<include style.css>}}
{{</playground-file>}}
