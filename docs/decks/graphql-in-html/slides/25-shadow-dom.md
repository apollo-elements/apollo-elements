---
name: Shadow DOM
background: --blue-grey-900
---

## Shadow DOM 🦇

<section grid>

```html
<person-element emoji="🧙‍♂️">
  #shadow-root
    <link href="person-element.css"/>
    <span id="emoji">🧙‍♂️ says:</span>
    <slot></slot>
</person-element>
```

```js reveal
document.getElementById('emoji');
  // => null

document.querySelector('person-element')
  .shadowRoot.getElementById('emoji');
  // => <span id="emoji">...</span>
```

```css reveal
:host { font-family: 'Open Sans', sans-serif; }
#emoji { font-style: italic; }
::slotted(blockquote)::before {
  content: "‟";
  font-size: 400%;
}
```

<div reveal>

```html
<person-element emoji="🧙‍♂️">
  <blockquote>Hello World!</blockquote>
</person-element>
```

<person-element emoji="🧙‍♂️">
  <blockquote>Hello World!</blockquote>
</person-element>

</div>

</section>

<template id="person-element-template">
  <style>
    :host { font-family: 'Open Sans', sans-serif; }
    #emoji { font-style: italic; }
    ::slotted(blockquote)::before {
      content: "‟";
      font-size: 200%;
    }
  </style>
  <span id="emoji"></span>
  <slot></slot>
</template>

<script type="module">
customElements.define('person-element', class PersonElement extends HTMLElement {
  constructor() {
    super()
      .attachShadow({ mode: 'open' })
      .append(document.getElementById('person-element-template')
        .content.cloneNode(true));
    this.shadowRoot.getElementById('emoji').textContent =
      `${this.getAttribute('emoji')} says:`;
  }
});
</script>
