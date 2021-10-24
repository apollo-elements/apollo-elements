---
name: mutations-dom
# tags: slide
---

## Mutations - DOM

<div progressive>

```js
import { ApolloMutation                                } from '@apollo-elements/lit-apollo';




class ToggleBestFriend extends ApolloMutation {












}
```

```js reveal
import { ApolloMutation, customElement, property, html } from '@apollo-elements/lit-apollo';



@customElement('toggle-friend')
class ToggleBestFriend extends ApolloMutation {
  @property({ attribute: false }) friend: Person;

  render() {
    return html`
      <label for="button">${this.friend.name}</label>
      <button id="button" @click="${() => this.mutate()}">
        ${this.isBestFriend ? '💔' : '💕'}
      </button>
    `;
  }


}
```

</div>
