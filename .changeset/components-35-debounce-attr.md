---
"@apollo-elements/components": major
---

Adds a `debounce` attribute and property to `<apollo-mutation>`

To [debounce](https://www.freecodecamp.org/news/javascript-debounce-example/) a mutation call, set the `debounce` attribute to the number of milliseconds you want to delay firing by, e.g. `debounce="500"` for every half-second.

```html
<apollo-mutation debounce="500">
  <label
    >Name
    <input trigger="keyup" data-variable="name" />
  </label>
</apollo-mutation>
```

You can also set the `passive` attribute on triggers to make their listeners passive. Use this in combination with the `trigger` attribute to add passive mutating listeners to a stream of events. For example, passively listen for `slide` events on this imaginary slider element, and mutate each time.

```html
<apollo-mutation>
  <silly-slider trigger="slide" passive data-variable="pitch"></silly-slider>
</apollo-mutation>
```
