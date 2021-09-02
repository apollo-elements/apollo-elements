---
name: mutations-optimistic
# tags: slide
---

## Mutations - Optimistic UI

<div progressive>

```js

import ToggleBestFriendMutation from './ToggleBestFriend.mutation.graphql';


@customElement('toggle-friend')
class ToggleBestFriend extends ApolloMutation {
  mutation = ToggleBestFriendMutation;

  get variables() { return { friendId: this.friend.id; } }









}
```

```js reveal

import ToggleBestFriendMutation from './ToggleBestFriend.mutation.graphql';


@customElement('toggle-friend')
class ToggleBestFriend extends ApolloMutation {
  mutation = ToggleBestFriendMutation;

  get variables() { return { friendId: this.friend.id; } }

  get optimisticResponse() {
    return {
      toggleBestFriend: {
        id: this.variables.friendId,
        isBestFriend: !this.isBestFriend,
      }
    }
  }
}
```

</div>
