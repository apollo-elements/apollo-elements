| Property | Type | Description |
| -------- | ---- | ----------- |
| path | <pre class="language-ts"><code class="language-ts">'options'</code></pre> | Optional. When set, the field will reflect the property at the specified path, i.e. `controller.options`. |
| readonly | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | Optional. When set, setting the field will have no effect. |
| onSet | <pre class="language-ts"><code class="language-ts">(x: unknown) => void</code></pre> | Optional. When defined, setting the field will have no effect. |
