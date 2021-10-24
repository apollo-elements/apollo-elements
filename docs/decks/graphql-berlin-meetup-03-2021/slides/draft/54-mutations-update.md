---
name: mutations-update
# tags: slide
---

## Mutations - Updating the Cache


<div progressive>

```js




@customElement('toggle-friend')
class ToggleBestFriend extends ApolloMutation {

  updater(cache, { data: { toggleBestFriend: friend } }) {









  }
}
```

```js reveal


import FriendsListQuery from '../friends-list/FriendsList.query.graphql';

@customElement('toggle-friend')
class ToggleBestFriend extends ApolloMutation {

  updater(cache, { data: { toggleBestFriend: friend } }) {
    const query = FriendsListQuery;
    const existing = cache.readQuery({ query });







  }
}
```

```js reveal




@customElement('toggle-friend')
class ToggleBestFriend extends ApolloMutation {

  updater(cache, { data: { toggleBestFriend: friend } }) {



    const friends =
          friend.isBestFriend ? [...existing.friends, friend]
        : existing.friends.filter(friend => friend.id !== friend.id);



  }
}
```

```js reveal




@customElement('toggle-friend')
class ToggleBestFriend extends ApolloMutation {

  updater(cache, { data: { toggleBestFriend: friend } }) {







    const data = { ...existing, friends };
    cache.writeQuery({ query, data });
  }
}
```

```js reveal

import ToggleBestFriendMutation from './ToggleBestFriend.mutation.graphql';
import FriendsListQuery from '../friends-list/FriendsList.query.graphql';

@customElement('toggle-friend')
class ToggleBestFriend extends ApolloMutation {

  updater(cache, { data: { toggleBestFriend: friend } }) {
    const query = FriendsListQuery;
    const existing = cache.readQuery({ query });

    const friends =
          friend.isBestFriend ? [...existing.friends, friend]
        : existing.friends.filter(friend => friend.id !== friend.id);

    const data = { ...existing, friends };
    cache.writeQuery({ query, data });
  }
}
```

</div>
