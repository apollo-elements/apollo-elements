| Option      | Type                                           | Description                                                                                                       |
| ----------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| client      | `ApolloClient<NormalizedCacheObject>`{lang=ts} | The `ApolloClient` instance for the controller.                                                                   |
| variables   | `Variables<D, V>`{lang=ts}                     | Variables for the operation.                                                                                      |
| context     | `any`{lang=ts}                                 | Context passed to the link execution chain.                                                                       |
| errorPolicy | `ErrorPolicy`{lang=ts}                         | the [error policy](https://www.apollographql.com/docs/react/api/core/ApolloClient/#ErrorPolicy) for the operation |
| hostElement | `HTMLElement`{lang=ts}                         | When provided, the controller will fall back to this element to fire events                                       |
