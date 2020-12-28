---
description: Strongly typed GraphQL operation components with less boilerplate
---

# Getting Started >> Codegen >> TypedDocumentNode || 50

[TypedDocumentNode](https://the-guild.dev/blog/typed-document-node) is a new technique where the `query`, `mutation`, or `subscription` object for your components comes with it's `data` and `variables` types built in. Before `TypedDocumentNode`, if you wanted to strongly type your GraphQL operations, you would need to define the `data` and `variables` types manually, or use `graphql-codegen` to create those types, which you could manually apply to operations.

```graphql copy
query TypedQuery($var: String) {
  typed {
    id
    name
  }
}
```

### Generating `TypedDocumentNode`s
Using `TypedDocumentNode` and [graphql-codegen](https://graphql-code-generator.com/docs/plugins/typed-document-node), you can somewhat simplify the process. You can take a variety of approaches here.

## Transpile `.graphql` to `.ts` in-place
Under this approach, you configure `graphql-codegen` to generate a single TypeScript files corresponding to each of your GraphQL operations, e.g. `src/components/typed/TypedQuery.query.graphql` -> `src/components/types/TypedQuery.query.graphql.ts`

```ts copy
import { TypedQuery } from './TypedQuery.query.graphql';
```

- ✅ Single import per operation aids code splitting
- ❌ Requires another file watcher for development

## Bundle `.graphql` operations into a single `operations.ts` file
Under this approach, you configure `graphql-codegen` to create a single TypeScript file that exports runtime objects for each operation. e.g. `src/components/**/*.{query,mutation,subscription}.graphql` -> `src/codegen/operations.ts`

```ts copy
import { TypedQuery } from '../../codegen/operations';
```

- ✅ Keeps code-generated files in one place
- ❌ Monolithic file for operations could be a bundle-size concern

## Generate a single `operations.d.ts`

Under this approach, you configure `graphql-codegen` to output a single, types-only TypeScript file. You would then use a [build tool](../building-for-production.md) and/or [dev-server plugin](../buildless-development.md) to import the GraphQL files. This approach is most like the old `graphql-codegen` workflow that did not use `TypedDocumentNode`.

```ts copy
import type { TypedQueryDocument } from '../../codegen/operations';
import TypedQuery from './Typed.query.graphql';
```

- ✅ Simpler migration from old workflow
- ❌ Requires tooling to load GraphQL files

## Using them in Components

Pass your `TypedDocumentNode` objects' type as the first type argument to your component constructors. These examples assume you followed the first approach outlined above. If you are generating types, omit the `typeof` operator.

<code-tabs collection="libraries" default-tab="lit">

  ```ts tab mixins
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

  ```ts tab lit
  import { ApolloQuery, PropertyValues } from '@apollo-elements/lit-apollo';
  import { TypedQuery } from './Typed.query.graphql';

  class TypedQueryElement extends ApolloQuery<typeof TypedQuery> {
    query = TypedQuery;

    updated(changed: PropertyValues<this>) {
      if (changed.has('data') && this.data !== null)
        console.assert(typeof this.data.name === 'string');
    }
  }
  ```

  ```ts tab fast
  import { ApolloQuery, customElement, html } from '@apollo-elements/fast';
  import { TypedQuery } from './Typed.query.graphql';

  @customElement({ name: 'typed-element' })
  class TypedQueryElement extends ApolloQuery<typeof TypedQuery> {
    query = TypedQuery;

    dataChanged(oldValue: this['data'], newValue: this['data']): void {
      if (newValue !== null)
        console.assert(typeof newValue.name === 'string');
    }
  }
  ```

  ```ts tab haunted
  import { useQuery } from '@apollo-elements/haunted';
  import { TypedQuery } from './Typed.query.graphql';

  // Bonus: Haunted will infer the function argument type, so no need for type arguments.

  function TypedQueryElement() {
    const { data } = useQuery(TypedQuery);

    if (data !== null)
      console.assert(typeof data.name === 'string');
  }
  ```

  ```ts tab hybrids
  import { define, query, html } from '@apollo-elements/hybrids';
  import { TypedQuery } from './Typed.query.graphql';

  define<ApolloQueryElement<typeof TypedQuery>>('typed-query', {
    query: query(TypedQuery),
    render: ({ data }) => {
      if (data !== null)
        console.assert(typeof data.name === 'string');
    }
  });
  ```

</code-tabs>
