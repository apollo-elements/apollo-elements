---
name: haunted
---

## haunted: hooks API for web components

<div class="progressive">

```typescript





  return html`
      <p id="friends">
        ${friends.map(friend => `${name} 💗 ${friend.name}`)}
      </p>
  `;



```

```typescript reveal
import { useQuery, html, component } from '@apollo-elements/haunted';

function PersonElement() {
  const { data, loading, error } = useQuery(PersonQuery);
  const friends = (data?.person?.friends??[]);
  return html`
      <p id="friends">
        ${friends.map(friend => `${name} 💗 ${friend.name}`)}
      </p>
  `;
}

customElements.define('person-element', component(PersonElement));
```

</div>
