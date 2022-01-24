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
---

Improvements to the internal type system makes working with query data easier

This release makes some breaking changes to internal types. If for some reason you were importing
those types from core, your code may break. However, normal usage should not be affected.
