| Option | Type | Description |
| ------ | ---- | ----------- |
| query | <pre class="language-ts"><code class="language-ts">DocumentNode <span class="token operator">&vert;</span> TypedDocumentNode</code></pre> | Query to fetch, defaults to `this.query` |
| updateQuery | <pre class="language-ts"><code class="language-ts">Function</code></pre>| Function to determine how to update the cache when the query resolves. (deprecated - use field policies instead) |
| variables | <pre class="language-ts"><code class="language-ts">Variables<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token punctuation">,</span> <span class="token constant">V</span><span class="token operator">&gt;</span> </code></pre> | Query variables |
| context | <pre class="language-ts"><code class="language-ts">Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">&gt;</span></code></pre> | Context object passed through the link execution chain. |
