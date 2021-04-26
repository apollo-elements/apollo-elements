`<apollo-mutation>` fires Polymer-style prop-changed events when its `called`, `data`, `error`, `loading` or `networkStatus` properties change.

See [ApolloMutationInterface](/api/interfaces/mutation/) for more information.

### Examples

```html
<apollo-mutation id="userMutation"
    data="{{data}}"
    mutation="[[UserMutation]]"
></apollo-mutation>

<paper-input label="Name" value="{{name}}"></paper-input>
<paper-input label="Picture URL" value="{{picture}}"></paper-input>
<paper-button on-click="mutate">Submit</paper-button>
```
