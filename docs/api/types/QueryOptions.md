| Option | Type | Description |
| ------ | ---- | ----------- |
| query | <pre class="language-ts"><code class="language-ts">DocumentNode <span class="token operator">&vert;</span> TypedDocumentNode</code></pre> | A GraphQL document that consists of a single query to be sent down to the server. |
| variables | <pre class="language-ts"><code class="language-ts">Variables<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token punctuation">,</span> <span class="token constant">V</span><span class="token operator">&gt;</span> </code></pre> | A map going from variable name to variable value, where the variables are used within the GraphQL query. |
| fetchPolicy | <pre class="language-ts"><code class="language-ts">FetchPolicy</code></pre> | Specifies the [`fetchPolicy`](#fetchpolicy) to be used for this query. |
| errorPolicy | <pre class="language-ts"><code class="language-ts">ErrorPolicy</code></pre> | Specifies the [`ErrorPolicy`](#errorpolicy) to be used for this query. |
| context | <pre class="language-ts"><code class="language-ts">Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">&gt;</span></code></pre> | Context object passed through the link execution chain. |
