| Property | Type | Description |
| -------- | ----------- | ---- |
| data | <pre class="language-ts"><code class="language-ts">Data<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token operator">&gt;</span></code></pre> | The result of a successful execution of the mutation |
| errors | <pre class="language-ts"><code class="language-ts"><span class="token keyword">readonly</span> GraphQLError<span class="token punctuation">[</span><span class="token punctuation">]</span></code></pre> | included when any errors occurred as a non-empty array |
| extensions | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | Reserved for adding non-standard properties |
| context | <pre class="language-ts"><code class="language-ts">Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">&gt;</span></code></pre> | See [context](/api/interfaces/element/#context) |
