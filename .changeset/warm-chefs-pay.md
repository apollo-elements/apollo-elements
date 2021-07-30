---
"@apollo-elements/atomico": minor
"@apollo-elements/components": minor
"@apollo-elements/core": minor
"@apollo-elements/fast": minor
"@apollo-elements/gluon": minor
"@apollo-elements/haunted": minor
"@apollo-elements/hybrids": minor
"@apollo-elements/lit-apollo": minor
"@apollo-elements/mixins": minor
"@apollo-elements/polymer": minor
---

Adds `optionsChanged` callback. This protected, optional callback allows for setting the `options` property on an ApolloQueryController to set options on the internal `ObservableQuery`. Use it by setting the options property. Setting internal properties will not initiate side effects.

```js
class QueryElement extends ReactiveElement {
  query = new ApolloQueryController(this, SomeQuery);
}

const el = new QueryElement();
el.query.options = { refetchWritePolicy: 'merge' }; // will trigger `setOptions`
el.query.options.refetchWritePolicy = 'merge'; // will *not* trigger `setOptions`
```
