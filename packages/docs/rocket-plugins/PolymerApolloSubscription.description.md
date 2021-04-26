`<apollo-subscription>` fires Polymer-style prop-changed events when its `data`, `error`, or `loading` properties change.

See [ApolloSubscriptionInterface](/api/interfaces/subscription/) for more information.

### Example

```html
<apollo-subscription
    data="{{data}}"
    variables="[[variables]]"
    subscription="[[UserJoinedSubscription]]"
    on-data-changed="toast"
></apollo-subscription>

<paper-toast duration="5000" text="A wild [[data.userJoined.name]] approaches!">
  <iron-image>[[data.userJoined.picture]]</iron-image>
</paper-toast>
```
