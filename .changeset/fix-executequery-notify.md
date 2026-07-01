---
"@apollo-elements/core": patch
---

Fixed `executeQuery()` throwing under Apollo Client 4 by removing `notifyOnNetworkStatusChange` from `client.query()` options, where it is not supported.
