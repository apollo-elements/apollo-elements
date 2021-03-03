---
name: apollo-elements-mixins
---

Write HTML:

```html
<script type="module" src="./person-element.js"></script>

<person-element
    person-id="cjld2cyuq0000t3rmniod1foy"></person-element>
```

<div reveal>

Use the DOM:
```js
import './person-element';

document.body
  .appendChild(document.createElement('person-element'));
  .setAttribute('person-id', 'cjld2cyuq0000t3rmniod1foy');
```

</div>
