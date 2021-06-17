---
"@apollo-elements/components": patch
"@apollo-elements/create": patch
"@apollo-elements/lit-apollo": major
---

Updates to `lit` npm package.

To migrate,

```bash
npm r -S lit-element lit-html
npm i -S @apollo-elements/lit-apollo@next
```

```bash
yarn remove lit-element lit-html
yarn add @apollo-elements/lit-apollo@next
```
