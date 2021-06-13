# Usage >> Mutations >> Composing Mutations and Queries || 30

Combining a query and mutations in the same component is a common pattern. For example, an "edit profile" page might query the existing user profile to pre-populate inputs, and issue a mutation which updates some or all of the profile fields. In cases like these, you can use the `<apollo-mutation>` component to declare your mutations inside the query component's template.

## Example: Edit User Profile

Say you had this query for a user profile page:

```graphql copy
query ProfileQuery($userId: ID!) {
  profile(userId: $userId) {
    id
    name
    picture
    birthday
  }
}
```

And you wanted to create a mutation component which displays the existing profile and updates aspects of it when the user edits them:

```graphql copy
mutation UpdateProfileMutation($input: UpdateProfileInput) {
  id
  name
  picture
  birthday
}
```

To make it easier to write declarative mutations, you can import the `<apollo-mutation>` element from `@apollo-elements/components`, like in this example, which combines a query and a mutation into a single component:

<code-tabs collection="libraries" default-tab="lit">

  ```html tab html
  <apollo-query>
    <script type="application/graphql">
      query User($userId: ID!) {
        user(userId: $userId) { id isMe name birthday picture }
      }
    </script>
    <template>
      <h2>Profile</h2>

      <dl ?hidden="{%raw%}{{ loading || !data }}{%endraw%}">
        <dt>Name</dt>
        <dd>{%raw%}{{ data.user.name }}{%endraw%}</dd>

        <dt>Picture</dt>
        <dd><img .src="{%raw%}{{ data.user.picture }}{%endraw%}"/></dd>

        <dt>Birthday</dt>
        <dd>{%raw%}{{ data.user.birthday }}{%endraw%}</dd>
      </dl>

      <form ?hidden="{%raw%}{{ !data.user.isMe }}{%endraw%}">
        <h3>Edit</h3>
        <apollo-mutation input-key="input">
          <script type="application/graphql">
            mutation UpdateProfileMutation($input: UpdateProfileInput) {
              id
              name
              picture
              birthday
            }
          </script>
          <label for="name">Name</label>
          <input id="name"
                 data-variable="name"
                 .value="{%raw%}{{ data.user.name }}{%endraw%}"/>

          <label for="picture">Picture (URL)</label>
          <input id="picture"
                 data-variable="picture"
                 .value="{%raw%}{{ data.user.picture }}{%endraw%}"/>

          <label for="birthday">Birthday</label>
          <input id="birthday"
                 data-variable="birthday" type="date"
                 .value="{%raw%}{{ data.user.birthday }}{%endraw%}"/>

          <button trigger>Save</button>
        </apollo-mutation>
      </form>
    </template>
  </apollo-query>
  ```

  ```ts tab mixins

  import '@apollo-elements/components/apollo-mutation';
  import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

  import ProfileQuery from './Profile.query.graphql';
  import UpdateProfileMutation from 'UpdateProfile.mutation.graphql';

  import type {
    ProfileQueryData as Data,
    ProfileQueryVariables as Variables,
  } from '../schema';

  const template = document.createElement('template');
  template.innerHTML = `
    <h2>Profile</h2>

    <dl>
      <dt>Name</dt>
      <dd></dd>

      <dt>Picture</dt>
      <dd><img role="presentation"/></dd>

      <dt>Birthday</dt>
      <dd></dd>
    </dl>

    <form hidden>
      <h3>Edit</h3>
      <apollo-mutation input-key="input">
        <label>Name <input data-variable="name"></label>
        <label>Picture (URL) <input data-variable="picture"></label>
        <label>Birthday <input data-variable="birthday" type="date"/></label>
        <button trigger>Save</button>
      </apollo-mutation>
    </form>
  `;

  export class ProfilePage extends
  ApolloQueryMixin(HTMLElement)<Data, Variables> {
    query = ProfileQuery;

    #loading = false;
    get loading() { return this.#loading; }
    set loading(value: boolean) {
      this.#loading = value;
      this.render();
    }

    #data: Data = null;
    get data() { return this.#data; }
    set data(value: Data) {
      this.#data = value;
      this.render()
    }

    $(selector) { return this.shadowRoot.querySelector(selector); }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
      this.$('apollo-mutation').mutation = UpdateProfileMutation;
      this.render();
    }

    render() {
      this.$('dl').hidden = this.loading || !this.data;
      this.$('dd:nth-of-type(0)').textContent = this.data?.name;
      if (this.data?.picture)
        this.$('dd img').src = this.data.picture;
      this.$('dd:nth-of-type(2)').textContent = this.data?.birthday;
      this.$('form').hidden = !this.data?.isMe;
    }
  }

  customElements.define('profile-page', ProfilePage);
  ```

  ```ts tab lit

  import '@apollo-elements/components/apollo-mutation';
  import { ApolloQuery, customElement, html } from '@apollo-elements/lit-apollo';
  import { ifDefined } from 'lit/directives/if-defined.js';

  import ProfileQuery from './Profile.query.graphql';
  import UpdateProfileMutation from 'UpdateProfile.mutation.graphql';

  import type {
    ProfileQueryData as Data,
    ProfileQueryVariables as Variables,
  } from '../schema';

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
            <label>Name <input data-variable="name"></label>
            <label>Picture (URL) <input data-variable="picture"></label>
            <label>Birthday <input data-variable="birthday" type="date"/></label>
            <button trigger>Save</button>
          </apollo-mutation>
        </form>
      `;
    }
  }
  ```

  ```ts tab fast

  import '@apollo-elements/components/apollo-mutation';
  import { ApolloQuery, customElement, html } from '@apollo-elements/fast';

  import ProfileQuery from './Profile.query.graphql';
  import UpdateProfileMutation from 'UpdateProfile.mutation.graphql';

  import type {
    ProfileQueryData as Data,
    ProfileQueryVariables as Variables,
  } from '../schema';

  const template = html<ProfilePage>`
    <h2>Profile</h2>

    <dl ?hidden="${x => x.loading || !x.data}">
      <dt>Name</dt>
      <dd>${x => x.data?.name}</dd>

      <dt>Picture</dt>
      <dd><img src="${x => x.data?.picture ?? null}"/></dd>

      <dt>Birthday</dt>
      <dd>${x => x.data?.birthday}</dd>
    </dl>

    <form ?hidden="${!x => x.data?.isMe}">
      <h3>Edit</h3>
      <apollo-mutation .mutation="${UpdateProfileMutation}" input-key="input">
        <label>Name <input data-variable="name"></label>
        <label>Picture (URL) <input data-variable="picture"></label>
        <label>Birthday <input data-variable="birthday" type="date"/></label>
        <button trigger>Save</button>
      </apollo-mutation>
    </form>
  `;

  @customElement({ name: 'profile-page', template })
  export class ProfilePage extends ApolloQuery<Data, Variables> {
    query = ProfileQuery;
  }
  ```

  ```ts tab haunted

  import '@apollo-elements/components/apollo-mutation';
  import { useQuery, component, html } from '@apollo-elements/haunted';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

  function ProfilePage() {
    const { data, loading } = useQuery(ProfileQuery);

    return html`
      <h2>Profile</h2>

      <dl ?hidden="${loading || !data}">
        <dt>Name</dt>
        <dd>${data?.name}</dd>

        <dt>Picture</dt>
        <dd><img src="${ifDefined(data?.picture)}"/></dd>

        <dt>Birthday</dt>
        <dd>${data?.birthday}</dd>
      </dl>

      <form ?hidden="${!data?.isMe}">
        <h3>Edit</h3>
        <apollo-mutation .mutation="${UpdateProfileMutation}" input-key="input">
          <label>Name <input data-variable="name"></label>
          <label>Picture (URL) <input data-variable="picture"></label>
          <label>Birthday <input data-variable="birthday" type="date"/></label>
          <button trigger>Save</button>
        </apollo-mutation>
      </form>
    `;

  }

  customElements.define('profile-page', component(ProfilePage));
  ```

  ```ts tab hybrids

  import '@apollo-elements/components/apollo-mutation';
  import { query, define, html } from '@apollo-elements/hybrids';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

  const render = ({ query: { data, loading } }) => html`
    <h2>Profile</h2>

    <dl hidden="${loading || !data}">
      <dt>Name</dt>
      <dd>${data?.name}</dd>

      <dt>Picture</dt>
      <dd><img src="${data?.picture ?? null}"/></dd>

      <dt>Birthday</dt>
      <dd>${data?.birthday}</dd>
    </dl>

    <form hidden="${!data?.isMe}">
      <h3>Edit</h3>
      <apollo-mutation mutation="${UpdateProfileMutation}" input-key="input">
        <label>Name <input data-variable="name"></label>
        <label>Picture (URL) <input data-variable="picture"></label>
        <label>Birthday <input data-variable="birthday" type="date"/></label>
        <button trigger>Save</button>
      </apollo-mutation>
    </form>
  `;

  define('profile-page', {
    query: query(ProfileQuery),
    render,
  });
  ```

</code-tabs>

Read more about the [`<apollo-mutation>` component](/api/components/apollo-mutation/).
