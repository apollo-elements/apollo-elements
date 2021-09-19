---
"@apollo-elements/core": patch
---

`ApolloQueryController` will stop polling when it's host disconnects.

This is technically a breaking change if you relied on the previous behaviour. You can continue to poll by maintaining a reference to the controller and calling `startPolling` after disconnecting the component.

```js
element.queryController = new ApolloQueryController(element, MyQuery, {
  pollInterval: 1000
});

const controller = element.queryController;

element.remove(); // NEW: controller will now stop polling

controller.startPolling(1000);
```
