---
"@apollo-elements/atomico": patch
"@apollo-elements/components": patch
"@apollo-elements/core": patch
"@apollo-elements/create": patch
"@apollo-elements/fast": patch
"@apollo-elements/gluon": patch
"@apollo-elements/haunted": patch
"@apollo-elements/hybrids": patch
"@apollo-elements/lit-apollo": patch
"@apollo-elements/mixins": patch
"@apollo-elements/polymer": patch
"@apollo-elements/cem-preset": patch
"esbuild-plugin-monorepo-resolve": patch
"rocket-preset-apollo-elements": patch
---

Update TypeScript to 4.6

Note, previous major versions did not generate github releases
due to problems with changesets. Their breaking change was to no longer 
transpile class private fields, so if you use webpack or other bundlers
which don't support private fields, you'll need to use babel.
