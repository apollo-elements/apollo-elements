---
"@apollo-elements/core": patch
---

Fixes the type of `attributeChangedCallback` for generic Custom Elements. [Per the HTML specification](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions), attributeChangedCallback takes a fourth parameter, the attribute's namespace.
