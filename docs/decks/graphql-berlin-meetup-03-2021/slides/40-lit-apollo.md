---
name: queries
---

## lit-apollo

<div class="progressive">

```typescript
import { ApolloQuery, html } from '@apollo-elements/lit-apollo';


















```

```typescript reveal
import { ApolloQuery, html } from '@apollo-elements/lit-apollo';
import { customElement, property } from 'lit-element/lib/decorators';

import PersonQuery from './Person.query.graphql';
import styles from './person-query.css';
import type {
  PersonQueryData as Data,
  PersonQueryVariables as Variables,
} from '../../generated/schema';











```

<img reveal style="top: 40vh;left: 90vw;" src="images/file-tree.png" alt="file tree with three files: person-element.ts, person-element.css, and Person.query.graphql"/>

```typescript reveal

@customElement('person-element')
class PersonElement extends ApolloQuery<Data, Variables> {
  @property({ attribute: 'person-id' }) personId: string = null;

  static styles = [styles];

  updated(changed) {
    if (changed.has("personId"))
      this.variables = { id: this.personId };
  }
}

```

```typescript reveal

@customElement('person-element')
class PersonElement extends ApolloQuery<Data, Variables> {
  render() {
    const { name, friends } = this.data.person;
    return html`
      <p id="friends">
        ${friends.map(friend => `${name} 💗 ${friend.name}`)}
      </p>
    `;
  }
}

```

</div>
