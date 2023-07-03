---
title: TypedDocumentNode
eleventyNavigation:
  order: 50
description: Strongly typed GraphQL operation components with less boilerplate
---

# TypedDocumentNode

[TypedDocumentNode](https://the-guild.dev/blog/typed-document-node) is a new 
technique where the `query`, `mutation`, or `subscription` object for your 
components comes with it's `data` and `variables` types built in. Before 
`TypedDocumentNode`, if you wanted to strongly type your GraphQL operations, you 
would need to define the `data` and `variables` types manually, or use 
`graphql-codegen` to create those types, which you could manually apply to 
operations.

<code-copy>

```graphql
query TypedQuery($var: String) {
  typed {
    id
    name
  }
}
```

</code-copy>

### Generating `TypedDocumentNode`s
Using `TypedDocumentNode` and 
[graphql-codegen](https://graphql-code-generator.com/docs/plugins/typed-document-node), 
you can somewhat simplify the process. You can take a variety of approaches 
here.

## Transpile `.graphql` to `.ts` in-place
Under this approach, you configure `graphql-codegen` to generate a single 
TypeScript files corresponding to each of your GraphQL operations, e.g. 
`src/components/typed/TypedQuery.query.graphql` -> 
`src/components/types/TypedQuery.query.graphql.ts`

<code-copy>

```ts
import { TypedQuery } from './TypedQuery.query.graphql';
```

</code-copy>

- ✅ Single import per operation aids code splitting
- ❌ Requires another file watcher for development

## Bundle `.graphql` operations into a single `operations.ts` file
Under this approach, you configure `graphql-codegen` to create a single 
TypeScript file that exports runtime objects for each operation. e.g. 
`src/components/**/*.{query,mutation,subscription}.graphql` -> 
`src/codegen/operations.ts`

<code-copy>

```ts copy
import { TypedQuery } from '../../codegen/operations';
```

</code-copy>

- ✅ Keeps code-generated files in one place
- ❌ Monolithic file for operations could be a bundle-size concern

## Generate a single `operations.d.ts`

Under this approach, you configure `graphql-codegen` to output a single, 
types-only TypeScript file. You would then use a [build 
tool](../building-for-production.md) and/or [dev-server 
plugin](../buildless-development.md) to import the GraphQL files. This approach 
is most like the old `graphql-codegen` workflow that did not use 
`TypedDocumentNode`.

<code-copy>

```ts
import type { TypedQueryDocument } from '../../codegen/operations';
import TypedQuery from './Typed.query.graphql';
```

</code-copy>

- ✅ Simpler migration from old workflow
- ❌ Requires tooling to load GraphQL files

## Using them in Components

When you pass your `TypedDocumentNode` to a controller (or haunted hook, or 
hybrids factory), TypeScript will infer the return type. If you're using a 
component class (e.g. `class extends ApolloQuery`), pass the `TypedDocumentNode` 
objects' type as the first type argument to your component constructors.

These examples assume you followed the first approach outlined above. If you are 
generating types, omit the `typeof` operator.

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">

  ```ts
  import type { ApolloQueryElement } from '@apollo-elements/components';

  import { TypedQuery } from './Typed.query.graphql';

  import '@apollo-elements/components';

  type TypedHTMLQueryElement = ApolloQueryElement<typeof TypedQuery>;

  const typedHTMLQueryElement =
    document.querySelector<TypedHTMLQueryElement>('apollo-query');

  typedHTMLQueryElement.query = TypedQuery;

  type DataType = (typeof typedHTMLQueryElement)['data'];
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
  import { ApolloQueryMixin } from '@apollo-elements/mixins';
  import { TypedQuery } from './Typed.query.graphql';

  class TypedQueryElement
  extends ApolloQueryMixin(HTMLElement)<typeof TypedQuery> {
    query = TypedQuery;

    #data: this['data'];

    get data(): this['data'] { return this.#data; }

    set data(value: this['data']) {
      this.#data = value;
      if (data !== null)
        console.assert(typeof this.#data.name === 'string');
      return this.#data;
    }
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  import { LitElement, PropertyValues } from 'lit';
  import { ApolloQueryController } from '@apollo-elements/core';
  import { TypedQuery } from './Typed.query.graphql';

  class TypedQueryElement extends LitElement {
    query = new ApolloQueryController(this, TypedQuery, {
      onData: (data) => {
        if (data)
          console.assert(typeof this.query.data.name === 'string');
      }
    });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  import { FASTElement, customElement, html } from '@microsoft/fast-element';
  import { ApolloQueryBehavior } from '@apollo-elements/fast';
  import { TypedQuery } from './Typed.query.graphql';

  @customElement({ name: 'typed-element' })
  class TypedQueryElement extends FASTElement {
    query = new ApolloQueryBehavior(this, TypedQuery, {
      onData(data) {
        if (newValue !== null)
          console.assert(typeof newValue.name === 'string');
      }
    });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  import { useQuery } from '@apollo-elements/haunted';
  import { TypedQuery } from './Typed.query.graphql';

  function TypedQueryElement() {
    const { data } = useQuery(TypedQuery);

    if (data !== null)
      console.assert(typeof data.name === 'string');
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```tsx
  import { useQuery } from '@apollo-elements/atomico';
  import { TypedQuery } from './Typed.query.graphql';

  function TypedQueryElement() {
    const { data } = useQuery(TypedQuery);

    if (data !== null)
      console.assert(typeof data.name === 'string');
    return <host>...</host>;
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  import { define, query, html } from '@apollo-elements/hybrids';
  import { TypedQuery } from './Typed.query.graphql';

  type ApolloQueryElement<T extends TypedDocumentNode> =
    HTMLElement & { query: ApolloQueryController<T> };

  define<ApolloQueryElement<typeof TypedQuery>>('typed-query', {
    query: query(TypedQuery),
    render: ({ query: { data } }) => {
      if (data !== null)
        console.assert(typeof data.name === 'string');
    }
  });
  ```

  </code-tab>
</code-tabs>
