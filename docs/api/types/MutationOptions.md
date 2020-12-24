All named arguments to mutate default to the element's corresponding instance property. So you can call `element.mutate()` without arguments and it will call using `element.mutation`, `element.variables`, etc. You can likewise override instance properties per-call by passing them in, e.g.

```ts
await element.mutate({
  fetchPolicy: 'network-only'
  variables: {
    ...element.variables,
    name: 'overridden',
  },
});
```

| Property | Type | Description |
| -------- | ---- | ----------- |
| awaitRefetchQueries | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | See [awaitRefetchQueries](#awaitrefetchqueries) |
| context | <pre class="language-ts"><code class="language-ts">Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">&gt;</span></code></pre> | See [context](/api/interfaces/element/#context) |
| errorPolicy | <pre class="language-ts"><code class="language-ts">ErrorPolicy</code></pre> | See [errorPolicy](/api/interfaces/element/#errorpolicy) |
| fetchPolicy | <pre class="language-ts"><code class="language-ts">FetchPolicy</code></pre> | See [fetchPolicy](#fetchpolicy) |
| mutation | <pre class="language-ts"><code class="language-ts">DocumentNode <span class="token operator">&vert;</span> TypedDocumentNode</code></pre> | See [mutation](#mutation) |
| optimisticResponse | <pre class="language-ts"><code class="language-ts">OptimisticResponseType<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token punctuation">,</span> <span class="token constant">V</span><span class="token operator">&gt;</span></code></pre> | See [optimisticResponse](#optimisticresponse) |
| refetchQueries | <pre class="language-ts"><code class="language-ts">RefetchQueriesType<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token operator">&gt;</span></code></pre> | See [refetchQueries](#refetchqueries) |
| update | <pre class="language-ts"><code class="language-ts">MutationUpdaterFn<span class="token operator">&lt;</span>Data<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token operator">&gt;&gt;</span> </code></pre> | See [updater](#updater) |
| variables | <pre class="language-ts"><code class="language-ts">Variables<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token punctuation">,</span> <span class="token constant">V</span><span class="token operator">&gt;</span> </code></pre> | See [variables](#variables) |
