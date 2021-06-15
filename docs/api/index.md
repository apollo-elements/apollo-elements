# API || 20

Apollo Elements consists of a core of reactive controllers, packages for various web-components libraries, ready-made HTML elements, some library helpers, and this documentation.

## Core

The core controllers do all the heavy-lifting, interacting with the Apollo Client and exposing an interface with your app. All three [controllers extend from a common base class](./core/controllers/controller/).
The core controllers work directly with any `ReactiveControllerHost`, e.g. `LitElement`.

- [Queries](./core/controllers/query/): Fetch GraphQL data
- [Mutations](./core/controllers/mutation/): Update your Graph
- [Subscriptions](./core/controllers/subscription/): Receive real-time updates


## Libraries

Whatever your preference for how to build web components, there's a flavour of Apollo Elements for you and your team. You can even mix-and-match in the same project, thanks to the common interface of HTML and the DOM.

- [Class Mixins](./libraries/mixins/): Vanilla JS class mixins
- [Lit](./libraries/lit-apollo/): Perhaps the most popular web-component library
- [FAST](./libraries/fast/): Microsoft's new entry into the field
- [Haunted](./libraries/haunted/): The React hooks API, but web components
- [Hybrids](./libraries/hybrids/): A unique chimera of object-oriented and functional styles
- [Gluon](./libraries/gluon/): A breath more than vanilla, for the minimalists in the crowd
- [Polymer](./libraries/polymer/): The original web-components library

## Components

- [`<apollo-client>`](./components/apollo-client/): Scope a subtree of ApolloElements to a specific client instance
- [`<apollo-query>`](./components/apollo-query/): Declaratively display GraphQL query data using HTML
- [`<apollo-mutation>`](./components/apollo-mutation/): Declaratively add mutations to your app
- [`<apollo-subscription>`](./components/apollo-subscription/): Receive real-time updates from HTML

## Packages

- [Generator](./create/): Quickly scaffold a GraphQL app
