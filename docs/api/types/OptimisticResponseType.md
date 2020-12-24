An object that represents the result of this mutation that will be optimistically stored before the server has actually returned a result.
This is most often used for optimistic UI, where we want to be able to see the result of a mutation immediately, and update the UI later if any errors appear.

```ts
element.optimisticResponse = ({ name }: HelloMutationVariables) => ({
  __typename: 'Mutation',
  hello: {
    __typename: 'Greeting',
    name,
  },
});
```
