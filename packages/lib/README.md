# @apollo-elements/lib

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/lib.svg)](https://www.npmjs.com/package/@apollo-elements/lib)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/lib)](https://github.com/apollo-elements/apollo-elements/blob/master/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

Helper functions for Apollo Elements

## createApolloClient
Creates a simple ApolloClient instance given a URI and some params.

```ts
createApolloClient({
  uri: '/graphql',
  typePolicies: {
    User: {
      fields: {
        fullName(_, { readField }) {
          return `${readField('firstName')} ${readField('lastName')}`;
        }
      }
    }
  }
});
```

## hasAllVariables
Predicate that validates a GraphQL request (a `DocumentNode` and a variables object) as having all of its required (i.e. non-nullable) variables defined.

```ts
function hasAllVariables(params: { query: DocumentNode, variables: any }): boolean
```

## isClientOperation
Predicate that validates a `DocumentNode` as being an exclusively client-side operation, i.e. all of it's requests are modified by a `@client` directive.

```ts
function isClientOperation(operation: Operation): boolean
```

## isValidGql
Predicate that validates an object as a `DocumentNode`.

```ts
function isValidGql(document: DocumentNode | any): boolean
```
