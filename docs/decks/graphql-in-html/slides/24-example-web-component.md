---
name: Example Web Component
background: --blue-grey-900
attrs: progressive
---

## 'Vanilla' Web Component 🍦

```js
class PersonElement extends HTMLElement {







}


```

```js reveal
class PersonElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <span id="emoji">${this.getAttribute('emoji')} says:</span>
      <slot></slot>
    `;
  }
}


```

```js reveal
class PersonElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <span id="emoji">${this.getAttribute('emoji')} says:</span>
      <slot></slot>
    `;
  }
}

// TODO: use <template> for performance
```

```js reveal
class PersonElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <span id="emoji">${this.getAttribute('emoji')} says:</span>
      <slot></slot>
    `;
  }
}

customElements.define('person-element', PersonElement);
```

```html reveal
<header>
  <h1>Web Components, huh?</h1>
</header>

<person-element emoji="👩‍🔬">
  <blockquote>
    <p>Every web component is an HTML Element.</p>

    <p>And you get to define how it behaves.</p>
  </blockquote>
</person-element>

```