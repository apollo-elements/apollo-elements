---
"@apollo-elements/components": major
---

Adds a `debounce` attribute and property to `<apollo-mutation>`

When set to a number, the element will debounce mutation calls

```html
<apollo-mutation debounce="500">
  <label
    >Name
    <input trigger="keyup" data-variable="name" />
  </label>
</apollo-mutation>
```

You can also set the `passive` attribute on triggers to make their listeners passive:

```html
<apollo-mutation>
  <silly-slider trigger="slide" passive data-variable="pitch"></silly-slider>
</apollo-mutation>
```
