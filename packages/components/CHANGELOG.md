# @apollo-elements/components

## 2.0.1

### Patch Changes

- Updated dependencies [31b95bc]
  - @apollo-elements/core@1.0.1
  - @apollo-elements/mixins@4.0.1

## 2.0.1-next.0

### Patch Changes

- Updated dependencies [31b95bc]
  - @apollo-elements/core@1.0.1-next.0
  - @apollo-elements/mixins@4.0.1-next.0

## 2.0.0

### Major Changes

- 96576f26: Adds a `debounce` attribute and property to `<apollo-mutation>`

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

- 96576f26: Removes `variables` and `trigger` named slots from `<apollo-mutation>`

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

  The default template contains a single anonymous slot element. If you do provide a result template, make sure to add at least one slot for the mutation content, if you want your mutation controls to appear after the mutation completes or errors.

### Minor Changes

- a40197f5: Add default template to mutation component.
- 96576f26: Adds `<apollo-query>` and `<apollo-subscription>` to the `@apollo-elements/components` package. These elements use [stampino](https://github.com/justinfagnani/stampino) to render a declarative, dynamic HTML template to their shadow roots (or, optionally, to a light DOM child div).
- 96576f26: Adds [stampino](https://github.com/justinfagnani/stampino) templates to `<apollo-mutation>`.

  Like `<apollo-query>`, this lets you render the mutation result as a dynamic HTML template to either the shadow or light DOM.

- 96576f26: Adds an optional value to the `trigger` attribute on `<apollo-mutation>` to specify the event to trigger the mutation.

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

- bdfef368: `<apollo-mutation>` now picks up variables and triggers from sibling nodes with `variable-for="<id>"` or `trigger-for="<id>"` attributes.

  <figure>
  <figcaption>Example of sibling nodes to apollo-mutation</figcaption>

  ```html
  <label>Name <input variable-for="add-user" data-variable="name"/></label>
  <button trigger-for="add-user">Add</button>
  <apollo-mutation id="add-user">
    <script type="application/graphql" src="AddUser.mutation.graphql"></script>
    <template>
      <link rel="stylesheet" href="add-user.css" />
      <output class="{{ data ? 'resolved' : 'transparent' }}">
        <p>You have added {{ data.addUser.name }}</p>
      </output>
    </template>
  </apollo-mutation>
  ```

  </figure>

- ea45702b: Adds `optionsChanged` callback. This protected, optional callback allows for setting the `options` property on an ApolloQueryController to set options on the internal `ObservableQuery`. Use it by setting the options property. Setting internal properties will not initiate side effects.

  ```js
  class QueryElement extends ReactiveElement {
    query = new ApolloQueryController(this, SomeQuery);
  }

  const el = new QueryElement();
  el.query.options = { refetchWritePolicy: "merge" }; // will trigger `setOptions`
  el.query.options.refetchWritePolicy = "merge"; // will *not* trigger `setOptions`
  ```

### Patch Changes

- 620341dc: Update manifests
- 713637cd: Updates to `lit` npm package.

  To migrate,

  ```bash
  npm r -S lit-element lit-html
  npm i -S @apollo-elements/lit-apollo@next
  ```

  ```bash
  yarn remove lit-element lit-html
  yarn add @apollo-elements/lit-apollo@next
  ```

- cf46feee: Include all components in docs
- bf812f89: Fix generated custom elements manifest
- 7665aba5: Add missing custom-elements.json to package file manifest
- fa75511d: Removed references to deprecated interfaces package
- df7e254d: Fix $ and $\$ override signatures. Affects TypeScript types only.
- 0a6152e6: fix homepage link in package.json
- abb2e5ec: Allow for 3.4.0-rc clients
- 5e59f87d: Fix TS types for cross-compatibility with client 3.3 and 3.4
- Updated dependencies [620341dc]
- Updated dependencies [bf812f89]
- Updated dependencies [7665aba5]
- Updated dependencies [fa75511d]
- Updated dependencies [6321c8b2]
- Updated dependencies [0a6152e6]
- Updated dependencies [4cb497a4]
- Updated dependencies [undefined]
- Updated dependencies [ea45702b]
- Updated dependencies [abb2e5ec]
- Updated dependencies [5e59f87d]
- Updated dependencies [792008ea]
  - @apollo-elements/core@1.0.0
  - @apollo-elements/mixins@4.0.0

## 2.0.0-next.11

### Minor Changes

- 32b6c3d: `<apollo-mutation>` now picks up variables and triggers from sibling nodes with `variable-for="<id>"` or `trigger-for="<id>"` attributes.

  <figure>
  <figcaption>Example of sibling nodes to apollo-mutation</figcaption>

  ```html
  <label>Name <input variable-for="add-user" data-variable="name"/></label>
  <button trigger-for="add-user">Add</button>
  <apollo-mutation id="add-user">
    <script type="application/graphql" src="AddUser.mutation.graphql"></script>
    <template>
      <link rel="stylesheet" href="add-user.css" />
      <output class="{{ data ? 'resolved' : 'transparent' }}">
        <p>You have added {{ data.addUser.name }}</p>
      </output>
    </template>
  </apollo-mutation>
  ```

  </figure>

## 2.0.0-next.10

### Minor Changes

- 8d0b2cb: Add default template to mutation component.

## 2.0.0-next.9

### Minor Changes

- 702a304: Adds `optionsChanged` callback. This protected, optional callback allows for setting the `options` property on an ApolloQueryController to set options on the internal `ObservableQuery`. Use it by setting the options property. Setting internal properties will not initiate side effects.

  ```js
  class QueryElement extends ReactiveElement {
    query = new ApolloQueryController(this, SomeQuery);
  }

  const el = new QueryElement();
  el.query.options = { refetchWritePolicy: "merge" }; // will trigger `setOptions`
  el.query.options.refetchWritePolicy = "merge"; // will *not* trigger `setOptions`
  ```

### Patch Changes

- Updated dependencies [702a304]
  - @apollo-elements/core@0.1.0-next.7
  - @apollo-elements/mixins@4.0.0-next.7

## 2.0.0-next.8

### Patch Changes

- 30a31ea: Fix TS types for cross-compatibility with client 3.3 and 3.4
- Updated dependencies [30a31ea]
  - @apollo-elements/core@0.0.1-next.6
  - @apollo-elements/mixins@4.0.0-next.6

## 2.0.0-next.7

### Patch Changes

- cd972e5: Allow for 3.4.0-rc clients
- Updated dependencies [cd972e5]
  - @apollo-elements/core@0.0.1-next.5
  - @apollo-elements/mixins@4.0.0-next.5

## 2.0.0-next.6

### Patch Changes

- 41bc768c: fix homepage link in package.json
- Updated dependencies [41bc768c]
  - @apollo-elements/mixins@4.0.0-next.4

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
  npm i -S @apollo-elements/lit-apollo
  ```

  ```bash
  yarn remove lit-element lit-html
  yarn add @apollo-elements/lit-apollo
  ```

- Updated dependencies [0ccd5682]
- Updated dependencies [b5f2502f]
  - @apollo-elements/mixins@4.0.0-next.0
