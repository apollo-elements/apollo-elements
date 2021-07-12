# @apollo-elements/components

## 2.0.0-next.5

### Patch Changes

- 87a0e907: Update manifests
- Updated dependencies [87a0e907]
  - @apollo-elements/core@0.0.1-next.3
  - @apollo-elements/mixins@4.0.0-next.3

## 2.0.0-next.4

### Patch Changes

- 91d03c60: Removed references to deprecated interfaces package
- f167041b: Fix $ and $\$ override signatures. Affects TypeScript types only.
- Updated dependencies [91d03c60]
  - @apollo-elements/core@0.0.1-next.2
  - @apollo-elements/mixins@4.0.0-next.2

## 2.0.0-next.3

### Patch Changes

- 408641da: Fix generated custom elements manifest
- Updated dependencies [408641da]
  - @apollo-elements/core@0.0.1-next.1

## 2.0.0-next.2

### Patch Changes

- 55990659: Add missing custom-elements.json to package file manifest
- Updated dependencies [55990659]
  - @apollo-elements/core@0.0.1-next.0
  - @apollo-elements/mixins@4.0.0-next.1

## 2.0.0-next.1

### Patch Changes

- b388f60b: Include all components in docs

## 2.0.0-next.0

### Major Changes

- 496415d4: Adds a `debounce` attribute and property to `<apollo-mutation>`

  To [debounce](https://www.freecodecamp.org/news/javascript-debounce-example/) a mutation call, set the `debounce` attribute to the number of milliseconds you want to delay firing by, e.g. `debounce="500"` for every half-second.

  ```html
  <apollo-mutation debounce="500">
    <label>Name <input trigger="keyup" data-variable="name"/></label>
  </apollo-mutation>
  ```

  You can also set the `passive` attribute on triggers to make their listeners passive. Use this in combination with the `trigger` attribute to add passive mutating listeners to a stream of events. For example, passively listen for `slide` events on this imaginary slider element, and mutate each time.

  ```html
  <apollo-mutation>
    <silly-slider trigger="slide" passive data-variable="pitch"></silly-slider>
  </apollo-mutation>
  ```

- 496415d4: Removes `variables` and `trigger` named slots from `<apollo-mutation>`

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
      <input slot="variable" data-variable="name" />
    </label>
  </apollo-mutation>
  ```

  #### After:

  ```html
  <apollo-mutation input-key="input">
    <button trigger>Mutate!</button>

    <label>
      <span>A:</span>
      <input data-variable="name" />
    </label>
  </apollo-mutation>
  ```

### Minor Changes

- 496415d4: Adds `<apollo-query>` and `<apollo-subscription>` to the `@apollo-elements/components` package. These elements use [stampino](https://github.com/justinfagnani/stampino) to render a declarative, dynamic HTML template to their shadow roots (or, optionally, to a light DOM child div).
- 496415d4: Adds [stampino](https://github.com/justinfagnani/stampino) templates to `<apollo-mutation>`.

  Like `<apollo-query>`, this lets you render the mutation result as a dynamic HTML template to either the shadow or light DOM.

- 496415d4: Adds an optional value to the `trigger` attribute on `<apollo-mutation>` to specify the event to trigger the mutation.

  Previously, the triggering element would fire the mutation on click. Now, `click` is the default event, but you can specify which event to mutate on. This lets you use an input as both a variable and a mutation trigger, by setting the value of the `trigger` attribute to `change`.

  ```html
  <apollo-query>
    <script type="application/graphql">
      query MyProfile {
        me {
          id name
        }
      }
    </script>

    <template>
      <apollo-mutation
        input-key="input"
        refetch-queries="MyProfile"
        await-refetch-queries
        data-user-id="{{ data.me.id }}"
      >
        <mwc-textfield
          label="Name"
          data-variable="name"
          value="{{ data.me.name }}"
          trigger="change"
        ></mwc-textfield>

        <script type="application/graphql">
          mutation UpdateUserName($userId: ID!, $name: String!) {
            updateUserName(userId: $userId, name: $name) {
              id name
            }
          }
        </script>
      </apollo-mutation>
    </template>
  </apollo-query>
  ```

  Removes the protected `trigger` and `button` accessors, and replaces them with `triggers` and `buttons`, which return `NodeList`s.

### Patch Changes

- bc48777f: Updates to `lit` npm package.

  To migrate,

  ```bash
  npm r -S lit-element lit-html
  npm i -S @apollo-elements/lit-apollo@next
  ```

  ```bash
  yarn remove lit-element lit-html
  yarn add @apollo-elements/lit-apollo@next
  ```

- Updated dependencies [0ccd5682]
- Updated dependencies [b5f2502f]
  - @apollo-elements/mixins@4.0.0-next.0
