---
"@apollo-elements/polymer": major
---

Rename Polymer Elements to `<polymer-apollo-*>`

In order to avoid conflict with `@apollo-elements/components`, the Polymer elements all now have a `polymer-` prefix, and their files are renamed to reflect that.

### Migrating
Add the `polymer-` prefix to your templates and imports.

##### Before:

```js
import '@apollo-elements/polymer/apollo-query';
```
```html
<apollo-query query="[[ MyQuery ]]" data="{{ queryData }}"></apollo-query>
```

##### After:

```js
import '@apollo-elements/polymer/polymer-apollo-query';
```
```html
<polymer-apollo-query query="[[ MyQuery ]]" data="{{ queryData }}"></polymer-apollo-query>
```
