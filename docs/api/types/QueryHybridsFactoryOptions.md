| Option | Type | Description |
| ------ | ---- | ----------- |
| query | <pre class="language-ts"><code class="language-ts">DocumentNode <span class="token operator">&vert;</span> TypedDocumentNode</code></pre> | A GraphQL document that consists of a single query to be sent down to the server. |
| variables | <pre class="language-ts"><code class="language-ts">Variables<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token punctuation">,</span> <span class="token constant">V</span><span class="token operator">&gt;</span> </code></pre> | A map going from variable name to variable value, where the variables are used within the GraphQL query. |
| context | <pre class="language-ts"><code class="language-ts">Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">&gt;</span></code></pre> | Context object passed through the link execution chain. |
| errorPolicy | <pre class="language-ts"><code class="language-ts">ErrorPolicy</code></pre> | Error policy to use for the query. See [errorPolicy](/api/interfaces/query#errorpolicy) |
| fetchPolicy | <pre class="language-ts"><code class="language-ts">FetchPolicy</code></pre> | See [fetchPolicy](/api/interfaces/query#fetchpolicy) |
| nextFetchPolicy | <pre class="language-ts"><code class="language-ts">FetchPolicy</code></pre> | See [nextFetchPolicy](/api/interfaces/query#nextfetchpolicy) |
| client | <pre class="language-ts"><code class="language-ts">ApolloClient</code></pre> | ApolloClient instance use to make the call. |
| pollInterval | <pre class="language-ts"><code class="language-ts">number</code></pre> | See [pollInterval](/api/interfaces/query#pollinterval) |
| noAutoSubscribe | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | See [noAutoSubscribe](/api/interfaces/query#noautosubscribe) |
| notifyOnNetworkStatusChange | See [notifyOnNetworkStatusChange](/api/interfaces/query#notifyonnetworkstatuschange) |
| partialRefetch | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | See [partialRefetch](/api/interfaces/query#partialrefetch) |
| returnPartialData | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | See [returnPartialData](/api/interfaces/query#returnpartialdata) |
| shouldSubscribe | Predicate which determines whether to automatically subscribe.  See [shouldSubscribe](/api/interfaces/query#shouldsubscribe). |
| onError | Callback for when an error occurs. See [onError](/api/interfaces/query#onerror). |
| onData | Callback for when the query resolves. See [onData](/api/interfaces/query#ondata). |
