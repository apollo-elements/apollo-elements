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
      constEnums: true
      declarationKind: interface
      dedupeOperationSuffix: true
      immutableTypes: true
      namingConvention: keep
      noSchemaStitching: true
      operationResultSuffix: Data
      optionalResolveType: true
      useIndexSignature: true

    generates:
      src/codegen/schema.ts: # replace with path to the file you wish to generate
        schema: src/client.schema.graphql # replace with path to client-side schema
        plugins:
          - typescript
          - typescript-operations

        documents:
          - packages/test-helpers/*.query.graphql
          - packages/test-helpers/*.mutation.graphql
          - packages/test-helpers/*.subscription.graphql
          - packages/test-helpers/*.fragment.graphql

```

Now, to automatically generate typings, run

```bash copy
npx graphql-codegen --watch
```

This has the added benefit of linting your graphql files for errors.

[Read more about `graphql-codegen` on their webpage](https://graphql-code-generator.com/)
