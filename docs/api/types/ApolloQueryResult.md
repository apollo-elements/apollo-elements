| Property | Type | Description |
| -------- | ---- | ----------- |
| data | <pre class="language-ts"><code class="language-ts">Data<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token operator">&gt;</span></code></pre> | If the query resolved, the data. |
| error | <pre class="language-ts"><code class="language-ts">ApolloError</code></pre> | If the query rejected, the error. |
| errors | <pre class="language-ts"><code class="language-ts"><span class="token keyword">readonly</span> GraphQLError<span class="token punctuation">[</span><span class="token punctuation">]</span></code></pre> | If the query returned partials results, and some were errors, the list of errors. |
| loading | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | Whether the operation is in-flight. |
| partial | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | Whether the query returned partial data. |
| networkStatus | <pre class="language-ts"><code class="language-ts">NetworkStatus</code></pre> | See [NetworkStatus](#networkstatus). |
