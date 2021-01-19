| Property | Type | Description |
| -------- | ---- | ----------- |
| data | <pre class="language-ts"><code class="language-ts">Data<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token operator">&gt;</span></code></pre> | Latest query data. |
| error | <pre class="language-ts"><code class="language-ts">ApolloError</code></pre> | See [`error`](/api/interfaces/query/#error) |
| loading | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | Whether the request is in-flight. |
| refetch | See [`refetch`](/api/interfaces/query/#refetch) |
| client | <pre class="language-ts"><code class="language-ts">ApolloClient</code></pre> | ApolloClient instance use to make the call. |
| called | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | Relevant to subscriptions only. |
| fetchMore | See [fetchMore](/api/interfaces/query/#fetchmore) |
| networkStatus | <pre class="language-ts"><code class="language-ts">NetworkStatus</code></pre> | See [networkStatus](/api/interfaces/query/#networkstatus) |
| variables | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | Query variables used in the call. |
| startPolling | <pre class="language-ts"><code class="language-ts"><span class="token punctuation">(</span>ms<span class="token punctuation">:</span> number<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span></code></pre> | Call to start polling the query. |
| stopPolling | <pre class="language-ts"><code class="language-ts"><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span> </code></pre> | Call to stop polling the query. |
| subscribeToMore | See [subscribeToMore](/api/interfaces/query/#subscribetomore) |
