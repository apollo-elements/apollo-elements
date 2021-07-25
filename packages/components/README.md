# @apollo-elements/components


[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/components.svg)](https://www.npmjs.com/package/@apollo-elements/components)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/components)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/components)](https://github.com/apollo-elements/apollo-elements/blob/main/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<center>

<strong>🚀 GraphQL in HTML 🌑</strong>

<strong>🦅 The element has upgraded 👨‍🚀</strong>

</center>

```html
<apollo-client>
  <apollo-query>
    <script type="application/graphql" src="Users.query.graphql"></script>
    <template>
      <h2>Add a New User</h2>
      <apollo-mutation refetch-queries="Users" await-refetch-queries>
        <script type="application/graphql" src="AddUser.mutation.graphql"></script>
        <mwc-textfield label="Name"
                       slot="name"
                       data-variable="name"
                       .disabled="{{ loading }}"></mwc-textfield>
        <mwc-button label="Submit"
                    trigger
                    slot="name"
                    .disabled="{{ loading }}"></mwc-button>
        <template>
          <form>
            <slot name="name"></slot>
            <mwc-linear-progress indeterminate .closed="{{ !loading }}"></mwc-linear-progress>
            <slot name="submit"></slot>
          </form>
        </template>
      </apollo-mutation>
      <h2>All Users</h2>
      <mwc-list>
        <template type="repeat" repeat="{{ data.users ?? [] }}">
          <mwc-list-item noninteractive graphic="avatar">
            <img .src="{{ item.picture }}" slot="graphic" alt=""/>
            {{ item.name }}
          </mwc-list-item>
        </template>
      </mwc-list>
    </template>
  </apollo-query>
</apollo-client>
```

✨ Read the guides and API docs on [The Apollo Elements site](https://next.apolloelements.dev)
