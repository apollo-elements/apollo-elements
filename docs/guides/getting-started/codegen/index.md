---
description: How to use Apollo Elements and GraphQL Code Generator to improve the experience of developing with GraphQL and web components.
---

# Getting Started >> Codegen || 40

Using the `@graphql-codegen/cli` package and its plugins, you can automatically generate TypeScript typings from your schema and query documents.

## Install Dependencies

```bash copy
npm i -D \
  @graphql-codegen/cli \
  @graphql-codegen/typescript \
  @graphql-codegen/typescript-operations
```

Or if you use `yarn`:

```bash copy
yarn add -D \
  @graphql-codegen/cli \
  @graphql-codegen/typescript \
  @graphql-codegen/typescript-operations
```

## Configure GraphQL Code Generator

Create a file called `.graphqlrc.yml` in your project root and paste in these contents:

```yml copy
schema: 'https://api.app.dev/graphql' # replace with url to your graphql server

extensions:
  codegen:
    config: # season to taste
      constEnums: true            # use `const enum` to define unions
      declarationKind: interface  # use `interface` keyword to define types
      dedupeOperationSuffix: true # prevent `MyQueryQuery`
      documentVariableSuffix: ''  # export `MyQuery` instead of `MyQueryDocument`
      immutableTypes: true        # add `readonly` keyword to frozen objects
      namingConvention: keep      # don't rename types
      operationResultSuffix: Data # add `Data` suffix to result types
      optionalResolveType: true   # make `__resolveType` field optional
      useIndexSignature: true     # required for compatibility with apollo server

    generates:
      src/codegen/schema.ts: # replace with path to the file you wish to generate
        schema: src/client.schema.graphql # replace with path to client-side schema
        plugins:
          - typescript
          - typescript-operations
          - typescript-document-nodes

        documents:
          - src/components/*.query.graphql
          - src/components/*.mutation.graphql
          - src/components/*.subscription.graphql
          - src/components/*.fragment.graphql

```

Now, to automatically generate typings, run

```bash copy
npx graphql-codegen --watch
```

This has the added benefit of linting your graphql files for errors.

[Read more about `graphql-codegen` on their webpage](https://graphql-code-generator.com/)
