---
title: Atomico
layout: layout-api-index
package: atomico
sidebar: api
---

# Web Component Libraries >> Atomico

[Atomico](https://atomico.gitbook.io) is a hooks-based web components library.

## Installing

<code-tabs collection="package-managers" default="npm">
  {{<code-tab package="npm">}}npm i -S @apollo-elements/atomico{{</code-tab>}}
  {{<code-tab package="yarn">}}yarn add @apollo-elements/atomico{{</code-tab>}}
  {{<code-tab package="pnpm">}}pnpm add @apollo-elements/atomico{{</code-tab>}}
</code-tabs>

Import `useQuery`, `useMutation`, or `useSubscription` to define your operation.

{{<docs-playground id="apollo-atomico" lang="ts">}}
  {{<playground-file name="Hello.ts" include="Hello.ts" />}}
  {{<playground-file name="index.html" include="index.html" />}}

  {{<playground-file name="style.css" include="style.css" />}}

  {{<playground-file name="Hello.query.graphql.ts" include="Hello.query.graphql.ts" />}}

  {{<playground-file name="client.ts" include="client.ts" />}}
{{</docs-playground>}}<style>
#apollo-atomico {
  --playground-preview-width: 300px;
}
</style>
