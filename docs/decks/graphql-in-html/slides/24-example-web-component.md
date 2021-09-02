---
name: Example Web Component
---

<div class="progressive">

```js
class PersonElement extends HTMLElement {







}


```

```js reveal
class PersonElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHtml = `
      <span id="emoji">${this.getAttribute('emoji')}</span>
      <p id="friends"></p>
    `;
  }
}


```

```js reveal
class PersonElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHtml = `
      <span id="emoji">${this.getAttribute('emoji')}</span>
      <p id="friends"></p>
    `;
  }
}

// TODO: use <template> for performance
```

```js reveal
class PersonElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHtml = `
      <span id="emoji">${this.getAttribute('emoji')}</span>
      <p id="friends"></p>
    `;
  }
}

customElements.define('person-element', PersonElement);
```

```html reveal
<header>
  <h1>Web Components, huh?</h1>
</header>

<person-element emoji="👩‍🔬"></person-element>

<p>Every web component is an HTML Element.</p>

<p>And you get to define how it behaves.</p>



```

</div>
