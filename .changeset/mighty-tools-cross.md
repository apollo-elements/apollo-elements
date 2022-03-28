---
"@apollo-elements/core": patch
---

Refactor internal notification mechanism

removes internal `update` symbol. changes internal `notify` method signature
from a list of property names to a record of property name to old value.
