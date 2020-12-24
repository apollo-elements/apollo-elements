| Property | Type | Description |
| -------- | ---- | ----------- |
| called | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | Whether the mutation has been called |
| client | <pre class="language-ts"><code class="language-ts">ApolloClient</code></pre> | ApolloClient instance use to make the call. |
| data | <pre class="language-ts"><code class="language-ts">Data<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token operator">&gt;</span></code></pre> | Mutation result. See [data](..//api/interfaces/mutation/#data) in ApolloMutationInterface |
| error | <pre class="language-ts"><code class="language-ts">ApolloError</code></pre> | Error thrown by the mutation attempt. |
| loading | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | Whether the mutation request is in-flight. |
