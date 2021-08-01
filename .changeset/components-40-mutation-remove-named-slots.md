---
"@apollo-elements/components": major
---

Removes `variables` and `trigger` named slots from `<apollo-mutation>`

This release replaces the `variables` and `trigger` slots on `<apollo-mutation>` with a single anonymous slot. This gives users more control over their mutation components.

The previous named-slot-based API assumed that the user wanted the trigger to appear in the DOM after the variable-inputs, but this isn't always what the user wants. Users also had to make their inputs and triggers direct children of the mutation element - it would not work if they nested them in `<label>` or `<header>` elements, for example.

### Migrating

> **TL;DR:** `s/slot="trigger"/trigger`, `s/slot="variable"//`

Instead of using `slot="variable"` add a `data-variable` attribute to any input-like element that represents a variable, e.g. `<input data-variable="varName"\>` would represent the value of the `varName` variable.

Similarly, to assign a button-like element as the trigger, add a `trigger` attribute to it.

#### Before:

```html
<apollo-mutation input-key="input">
  <!-- Oops! appears after `a-input` in shadow DOM -->
  <button slot="trigger">Mutate!</button>

  <label>
   <span>Name:</span>
   <!-- Oops! Not slotted into `<apollo-mutation>`! -->
   <input slot="variable" data-variable="name"/>
  </label>
</apollo-mutation>
```

#### After:

```html
<apollo-mutation input-key="input">
  <button trigger>Mutate!</button>

  <label>
   <span>A:</span>
   <input data-variable="name"/>
  </label>
</apollo-mutation>
```

The default template contains a single anonymous slot element. If you do provide a result template, make sure to add at least one slot for the mutation content, if you want your mutation controls to appear after the mutation completes or errors.
