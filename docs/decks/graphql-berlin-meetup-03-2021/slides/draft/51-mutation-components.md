---
name: mutation-components
# tags: slide
---

## Mutations

Say we had a list component that should toggle an `isBestFriend` flag on any member of the list.

```js
class FriendsList extends ApolloQuery {
  render() {
    return html`${this.data.friends.map(friend => html`
      <toggle-friend .friend="${friend}"></toggle-friend>
    `)}`;
  }
}
```

<section reveal>

Let's define `<toggle-friend>` as a mutation component!

```graphql
mutation ToggleBestFriendMutation($friendId: ID!) {
  toggleBestFriend(friendId: $friendId) {
    id name picture
    isBestFriend
  }
}
```

</section>
