| Option | Type | Description |
| ------ | ---- | ----------- |
| client | <pre class="language-ts"><code class="language-ts">ApolloClient</code></pre> | ApolloClient instance use to make the call. |
| context | <pre class="language-ts"><code class="language-ts">Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">&gt;</span></code></pre> | Context object passed through the link execution chain. |
| errorPolicy | <pre class="language-ts"><code class="language-ts">ErrorPolicy</code></pre> | Error policy to use for the mutation. See [`errorPolicy`](/api/interfaces/query#errorpolicy) |
| fetchPolicy | <pre class="language-ts"><code class="language-ts">FetchPolicy</code></pre> | See [`fetchPolicy`](/api/interfaces/query#fetchpolicy) |
| nextFetchPolicy | <pre class="language-ts"><code class="language-ts">FetchPolicy</code></pre> | See [`nextFetchPolicy`](/api/interfaces/query#nextfetchpolicy) |
| noAutoSubscribe | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | See [`noAutoSubscribe`](/api/interfaces/query#noautosubscribe) |
| notifyOnNetworkStatusChange | See [`notifyOnNetworkStatusChange`](/api/interfaces/query#notifyonnetworkstatuschange) |
| onCompleted | <pre class="language-ts"><code class="language-ts"><span class="token punctuation">(</span>data<span class="token punctuation">:</span> D) <span class="token operator">=></span> <span class="token keyword">void</span></code></pre> | Callback for when the query resolves. |
| onError | See [`onError`](/api/interfaces/query#onerror) | Callback for when an error occurs. |
| partialRefetch | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | See [`partialRefetch`](/api/interfaces/query#partialrefetch) |
| pollInterval | <pre class="language-ts"><code class="language-ts">number</code></pre> | See [`pollInterval`](/api/interfaces/query#pollinterval) |
| query | <pre class="language-ts"><code class="language-ts">DocumentNode <span class="token operator">&vert;</span> TypedDocumentNode</code></pre> | A GraphQL document that consists of a single query to be sent down to the server. |
| returnPartialData | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | See [`returnPartialData`](/api/interfaces/query#returnpartialdata) |
| shouldSubscribe | See [`shouldSubscribe`](/api/interfaces/query#shouldsubscribe) | Predicate which determines whether or not to automatically subscribe |
| variables | <pre class="language-ts"><code class="language-ts">Variables<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token punctuation">,</span> <span class="token constant">V</span><span class="token operator">&gt;</span> </code></pre> | A map going from variable name to variable value, where the variables are used within the GraphQL query. |
