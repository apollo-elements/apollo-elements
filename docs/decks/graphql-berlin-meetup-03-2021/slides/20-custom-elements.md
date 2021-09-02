---
name: custom-elements
---

## Web Components

<div progressive>

```js
class PersonElement extends HTMLElement {







}


```

```js reveal
class PersonElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
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
    this.attachShadow({ mode: 'open' }).innerHTML = `
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
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <span id="emoji">${this.getAttribute('emoji')}</span>
      <p id="friends"></p>
    `;
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
