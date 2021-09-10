---
layout: layout-api
package: '@apollo-elements/mixins'
module: controller-host-mixin.js
templateEngineOverride: njk,md
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> Class Mixins >> ControllerHostMixin

Mixin which adds the `ReactiveController` interface to your element. You can use this to render updates from your controllers by implementing an `update` method that calls `super.update()`.

```js playground mouse-controller color-picker.js
{% include './_assets/color-picker.js' %}
```

```css playground-file mouse-controller color-picker.css
{% include './_assets/color-picker.css' %}
```

```js playground-file mouse-controller mouse-controller.js
{% include './_assets/mouse-controller.js' %}
```

```html playground-file mouse-controller index.html
{% include './_assets/index.html' %}
```

```css playground-file mouse-controller style.css
{% include './_assets/style.css' %}
```
