---
name: custom-elements
---

## Web Components

<div class="progressive">

```js
class PersonElement extends HTMLElement {






}


```

```js reveal
class PersonElement extends HTMLElement {
  constructor() {
    super();
    this
      .attachShadow({ mode: 'open' })
      .textContent = this.getAttribute('emoji');
  }
}


```

```js reveal
class PersonElement extends HTMLElement {
  constructor() {
    super();
    this
      .attachShadow({ mode: 'open' })
      .textContent = this.getAttribute('emoji');
  }
}

customElements.define('person-element', PersonElement);
```

```html reveal
<h1>Web Components, huh?</h1>

<article>
  <person-element emoji="👩‍🔬"></person-element>
</article>

<p>Every web component is an HTML Element.</p>

<p>And you get to define how it behaves.</p>


```

</div>
