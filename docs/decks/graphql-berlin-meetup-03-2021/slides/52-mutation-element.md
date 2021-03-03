---
name: mutation-element
attrs: progressive
---

```html
<apollo-mutation>












</apollo-mutation>
```

```html
<apollo-mutation>

  <script type="application/graphql">
    mutation AddQuote($input: QuoteInput!) {
      addQuote(input: $input) {
        id
        name
        comment
      }
    }
  </script>


</apollo-mutation>
```

```html reveal
<apollo-mutation>

  <script type="application/graphql">...</script>

  <mwc-textfield id="name" label="Name"
      slot="variable" data-variable="name"
      value="Neil"></mwc-textfield>






</apollo-mutation>
```

```html reveal
<apollo-mutation>

  <script type="application/graphql">...</script>

  <mwc-textfield id="name" label="Name"
      slot="variable" data-variable="name"
      value="Neil"></mwc-textfield>
  <mwc-textarea id="comment" label="Comment"
      slot="variable" data-variable="comment"
      value="That's one small step..."></mwc-textarea>



</apollo-mutation>
```

```html reveal
<apollo-mutation>

  <script type="application/graphql">...</script>

  <mwc-textfield id="name" label="Name"
      slot="variable" data-variable="name"
      value="Neil"></mwc-textfield>
  <mwc-textarea id="comment" label="Comment"
      slot="variable" data-variable="comment"
      value="That's one small step..."></mwc-textarea>

  <mwc-button slot="trigger">OK</mwc-button>

</apollo-mutation>
```

```html reveal
<apollo-mutation input-key="input">

  <script type="application/graphql">...</script>

  <mwc-textfield id="name" label="Name"
      slot="variable" data-variable="name"
      value="Neil"></mwc-textfield>
  <mwc-textarea id="comment" label="Comment"
      slot="variable" data-variable="comment"
      value="That's one small step..."></mwc-textarea>

  <mwc-button slot="trigger">OK</mwc-button>

</apollo-mutation>
```

<json-viewer id="input-key-json" reveal>
  <script type="application/json">
    {
      "input": {
        "name": "Neil",
        "comment": "That's one small step..."
      }
    }
  </script>
</json-viewer>

<style>
#input-key-json {
  background-color: #000b;
  transform: translateX(3vw) translateY(8vh);
  font-size: 1em;
  opacity: 1;
  height: 15em;
  display: flex;
  align-items: center;
}
</style>
