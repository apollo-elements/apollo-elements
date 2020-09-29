<meta name="description" content="How to use Apollo Elements to write declarative GraphQL mutation web components"/>

Mutations are how you change data in your graphql. If you think of queries as analogous to HTTP `GET` requests or SQL `READ` statements, then mutations are kind of like HTTP `POST` requests or SQL `WRITE` statements.

Unlike query and subscription components, mutation components don't automatically send a request to the graphql server. You have to call their `mutate()` method in order to issue the mutation. This is usually in response to some user input.

To make it easier to write declarative mutations, you can import the `<apollo-mutation>` element from `@apollo-elements/components`, like in this lit-element example, which combines a query and a mutation into a single component:

```ts
import '@apollo-elements/components/apollo-mutation';
import { ApolloQuery, customElement, html } from '@apollo-elements/lit-apollo';
import { gql } from '@apollo/client/core';
import { ifDefined } from 'lit-html/directives/if-defined';

const ProfileQuery = gql`
  query ProfileQuery($userId: ID!) {
    profile(userId: $userId) {
      id
      name
      picture
      birthday
    }
  }
`;

const UpdateProfileMutation = gql`
  mutation UpdateProfileMutation($input: UpdateProfileInput) {
    id
    name
    picture
    birthday
  }
`;

interface Data {
  id: string;
  name: string;
  picture: string;
  birthday: string;
}

interface Variables {
  userId: string;
  isMe: boolean;
}

@customElement('profile-page')
export class ProfilePage extends ApolloQuery<Data, Variables> {
  query = ProfileQuery;

  render() {
    return html`
      <h2>Profile</h2>

      <dl ?hidden="${this.loading || !this.data}">
        <dt>Name</dt>
        <dd>${this.data?.name}</dd>

        <dt>Picture</dt>
        <dd><img src="${ifDefined(this.data?.picture)}"/></dd>

        <dt>Birthday</dt>
        <dd>${this.data?.birthday}</dd>
      </dl>

      <form ?hidden="${!this.data?.isMe}">
        <h3>Edit</h3>
        <apollo-mutation .mutation="${UpdateProfileMutation}" input-key="input">
          <label>Name
            <input slot="variable" data-variable="name">
          </label>

          <label>Picture (URL)
            <input slot="variable" data-variable="picture">
          </label>

          <label>Birthday
            <input slot="variable" data-variable="birthday" type="date"/>
          </label>

          <button slot="trigger">Save</button>
        </apollo-mutation>
      </form>
    `;
  }
}
```

Read more about the `<apollo-mutation>` component on [the components pages](../../modules/_apollo_elements_components.html)