---
title: ApolloElement
weight: 00
layout: layout-api
package: core
module: types.js
sidebar: api
---

<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->


Common base interface for Apollo Elements. Provides reactivity for `data`, `error`, `errors`, `loading`, and `variables` fields.

## Type Parameters

Every implemention of `ApolloElement` takes either one or two type parameters. A single parameter is either a `TypedDocumentNode` or the operation's result type, in which case the variables type defaults to `OperationVariables`, which is an object of arbitrary string keys and unknown values. If you pass two parameters, the first is the operation's result type, the second is the operation's variables type.

The following examples demonstrate passing type arguments to a query component.

```ts
import type { ResultOf, VariablesOf } from '@graphql-typed-document-node/core';
import { gql, TypedDocumentNode } from '@apollo/client/core';

interface Data { int: number; }
interface Variables { int: number; }
```

### Example: Passing Two Type Arguments

```ts
const UntypedQuery = gql`query Query($int: Int) { int }`;

class UntypedElement extends ApolloQuery<Data, Variables> {
  query = UntypedQuery;

  checkClassFieldTypes() {
    // @ts-expect-error: `int` should be a number
    this.data = { int: 'a' };
    // @ts-expect-error: `int` should be a number
    this.variables = { int: 'b' };
  }
}
```

### Example: Passing a Single Type Arguments

```ts
const TypedQuery: TypedDocumentNode<Data, Variables> = UntypedQuery;

class TypedElement extends ApolloQuery<typeof TypedQuery> {
  query = TypedQuery;

  checkClassFieldTypes() {
    // @ts-expect-error: `int` should be a number
    this.data = { int: 'a' };
    // @ts-expect-error: `int` should be a number
    this.variables = { int: 'b' };
  }
}
```
