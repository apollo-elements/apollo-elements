---
layout: api
package: '@apollo-elements/interfaces'
module: './apollo-element.ts'
socialMediaImage: https://res.cloudinary.com/apolloelements/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_south_west,x_60,y_200,l_text:open sans_128_bold:Elements/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_south_west,x_60,y_100,l_text:open sans_78:Apollo Elements/social-template.svg
---
# Interfaces >> ApolloElement || 00

Common base interface for Apollo Elements. Provides the ability to read GraphQL operations from HTML (via `<script type="application/graphql">` and `<script type="application/json">` tags) as well as reactivity for `data`, `error`, `errors`, `loading`, and `variables` fields.

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
