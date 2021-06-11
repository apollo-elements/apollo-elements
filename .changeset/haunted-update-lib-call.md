---
"@apollo-elements/haunted": major
---

No longer mixes GraphQL properties into the element

Previously, the `use(Query|Mutation|Subscription)` hooks would mix the `Apollo(Query|Mutation|Subscription)Element` interfaces into the haunted host element's prototype. This was a bad hack, and only worked if your element had a single operation in it.

Using `Apollo(Query|Mutation|Subscription)Controller`, the hooks now keep to themselves without modifying the host prototype.

### Migration

This is technically a breaking change, so if you were relying on having `this.data` available on the element, update your code.

You also have to pass in a reference to the host element if you want to use the hooks along with `<apollo-client>`. This is because the `ReactiveControllerHost` which the hooks use behind the scenes via [`useController`]() doesn't have access to the host element. This also means that you _must_ use the `function` keyword to define components you intend to use with `<apollo-client>`.

##### Before:
```js
customElements.define('my-query', component(() => {
  const { data } = useQuery(MyQuery);
  const myName = data && data.myName;
  return html`<output>${myName}</output>`;
}));
```
```html
<apollo-client>
  <my-query></my-query>
</apollo-client>
```

##### After:
```js
customElements.define('my-query', component(function Query() {
  const { data } = useQuery(MyQuery, { hostElement: this });
  const myName = data && data.myName;
  return html`<output>${myName}</output>`;
}));
```
```html
<apollo-client>
  <my-query></my-query>
</apollo-client>
```
