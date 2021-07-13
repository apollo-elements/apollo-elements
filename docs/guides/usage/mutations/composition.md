# Usage >> Mutations >> Composing Mutations and Queries || 30

Consider an "edit my profile" page in a typical web app. As the developer, you'll want to first fetch the user's profile (the query), display it in some pleasant page layout (the template), and offer controls to update profile fields like nickname or avatar (the mutation).

Combining queries with mutations in the same component like this is a common pattern. Apollo Elements provides some different ways to accomplish that goal. Let's take these GraphQL documents as an example and see how we can combine them on one page.

<style data-helmet>
#gql-documents {
  display: grid;
  gap: 12px 6px;
  grid-template: auto auto / auto;
}

#gql-documents pre {
  height: 100%;
}

@media (min-width: 600px) {
  #gql-documents {
    grid-template: auto / auto auto;
  }
}
</style>
<div id="gql-documents">

```graphql copy
query ProfileQuery(
  $userId: ID!
) {
  profile(userId: $userId) {
    id
    name
    picture
    birthday
  }
}
```

```graphql copy
mutation UpdateProfileMutation(
  $input: UpdateProfileInput
) {
  updateProfile(input: $input) {
    id
    name
    picture
    birthday
  }
}
```

</div>

## Using `<apollo-mutation>`

<a hidden id="#example-edit-user-profile"></a>

Import the `<apollo-mutation>` element from `@apollo-elements/components` to write declarative mutations right in your template. In this way, we combine our query and mutation into a single component:

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
  import { ControllerHostMixin } from '@apollo-elements/mixins';
  import { ApolloQueryController } from '@apollo-elements/core';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

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

  export class ProfilePage extends ControllerHostMixin(HTMLElement) {
    query = new ApolloQueryController(this, ProfileQuery);

    $ = selector => this.shadowRoot.querySelector(selector);

    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
      this.$('apollo-mutation').mutation = UpdateProfileMutation;
      this.requestUpdate();
    }

    update() {
      const { data, loading } = this.query;
      this.$('dl').hidden = loading || !data;
      this.$('dd:nth-of-type(0)').textContent = data?.name;
      if (data?.picture)
        this.$('dd img').src = data.picture;
      this.$('dd:nth-of-type(2)').textContent = data?.birthday;
      this.$('form').hidden = !data?.isMe;
      super.update();
    }
  }

  customElements.define('profile-page', ProfilePage);
  ```

  ```ts tab lit

  import '@apollo-elements/components/apollo-mutation';
  import { ApolloQueryController } from '@apollo-elements/core';
  import { LitElement, html } from 'lit';
  import { customElement } from 'lit/decorators.js';
  import { ifDefined } from 'lit/directives/if-defined.js';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

  @customElement('profile-page')
  export class ProfilePage extends LitElement {
    query = new ApolloQueryController(this, ProfileQuery);

    render() {
      const { data, loading } = this.query;
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
  }
  ```

  ```ts tab fast
  import '@apollo-elements/components/apollo-mutation';
  import { ApolloQuery, customElement, html } from '@apollo-elements/fast';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

  const template = html<ProfilePage>`
    <h2>Profile</h2>

    dl ?hidden="${x => x.loading || !x.data}"
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
  export class ProfilePage extends ApolloQuery<typeof ProfileQuery> {
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

  ```tsx tab atomico
  import '@apollo-elements/components/apollo-mutation';
  import { useQuery, c } from '@apollo-elements/atomico';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

  function ProfilePage() {
    const { data, loading } = useQuery(ProfileQuery);

    return (
      <host shadowDom>
        <h2>Profile</h2>
        <dl hidden={loading || !data}>
          <dt>Name</dt>
          <dd>{data?.name}</dd>
          <dt>Picture</dt>
          <dd><img src="{data?.picture}"/></dd>
          <dt>Birthday</dt>
          <dd>{data?.birthday}</dd>
        </dl>
        <form hidden="{!data?.isMe}">
          <h3>Edit</h3>
          <apollo-mutation mutation="{UpdateProfileMutation}" input-key="input">
            <label>Name <input data-variable="name"></label>
            <label>Picture (URL) <input data-variable="picture"></label>
            <label>Birthday <input data-variable="birthday" type="date"/></label>
            <button trigger>Save</button>
          </apollo-mutation>
        </form>
      </host>
    );

  }

  customElements.define('profile-page', c(ProfilePage));
  ```

  ```ts tab hybrids
  import '@apollo-elements/components/apollo-mutation';
  import { query, define, html } from '@apollo-elements/hybrids';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

  define('profile-page', {
    query: query(ProfileQuery),
    render: ({ query: { data, loading } }) => html`
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
    `,
  });
  ```

</code-tabs>

Read more about the [`<apollo-mutation>` component](/api/components/apollo-mutation/).

## Using `ApolloMutationController`

<code-tabs collection="libraries" default-tab="lit">

  ```html tab html
  <blink>The Apollo HTML elements use the controllers under the hood</blink>
  <marquee>Just follow the previous example.</marquee>
  ```

  ```ts tab mixins
  import { ControllerHostMixin } from '@apollo-elements/mixins';
  import { ApolloQueryController, ApolloMutationController } from '@apollo-elements/core';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

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
      <label>Name <input id="name"></label>
      <label>Picture (URL) <input id="picture"></label>
      <label>Birthday <input id="birthday" type="date"/></label>
      <button>Save</button>
    </form>
  `;

  export class ProfilePage extends ControllerHostMixin(HTMLElement) {
    query = new ApolloQueryController(this, ProfileQuery);
    mutation = new ApolloQueryController(this, UpdateProfileMutation);

    $ = selector => this.shadowRoot.querySelector(selector);
    $$ = selector => this.shadowRoot.querySelectorAll(selector);

    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
      this.$('button').addEventListener(e => this.mutation.mutate({
        variables: {
          // collect the inputs and flatten them in to a variables object
          input: Object.fromEntries(Array.from(this.$$('input'), el => [el.id, el.value]))
        }
      }));
      this.requestUpdate();
    }

    update() {
      const { data, loading } = this.query;
      this.$('dl').hidden = loading || !data;
      this.$('dd:nth-of-type(0)').textContent = data?.name;
      if (data?.picture)
        this.$('dd img').src = data.picture;
      this.$('dd:nth-of-type(2)').textContent = data?.birthday;
      this.$('form').hidden = !data?.isMe;
      super.update();
    }
  }

  customElements.define('profile-page', ProfilePage);
  ```

  ```ts tab lit
  import '@apollo-elements/components/apollo-mutation';
  import { ApolloQueryController, ApolloMutationController } from '@apollo-elements/core';
  import { LitElement, html } from 'lit';
  import { customElement, queryAll } from 'lit/decorators.js';
  import { ifDefined } from 'lit/directives/if-defined.js';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

  @customElement('profile-page')
  export class ProfilePage extends LitElement {
    query = new ApolloQueryController(this, ProfileQuery);
    mutation = new ApolloQueryController(this, UpdateProfileMutation);

    @queryAll('input') inputs: NodeListOf<HTMLInputElement>;

    render() {
      const { data, loading } = this.query;
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
          <label>Name <input ?disabled="${this.mutation.loading}" id="name"></label>
          <label>Picture (URL) <input ?disabled="${this.mutation.loading}" id="picture"></label>
          <label>Birthday <input ?disabled="${this.mutation.loading}" id="birthday" type="date"/></label>
          <button ?disabled="${this.mutation.loading}" @click="${this.onSave}">Save</button>
        </form>
      `;
    }

    onSave() {
      this.mutation.mutate({
        variables: {
          // collect the inputs and flatten them in to a variables object
          input: Object.fromEntries(Array.from(this.inputs, el => [el.id, el.value]))
        }
    });
  }
  ```

  ```ts tab fast
  /* FAST doesn't yet have controller support, so we'll stick to the mutation component */

  import '@apollo-elements/components/apollo-mutation';
  import { ApolloQuery, customElement, html } from '@apollo-elements/fast';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

  const template = html<ProfilePage>`
    <h2>Profile</h2>

    dl ?hidden="${x => x.loading || !x.data}"
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
  export class ProfilePage extends ApolloQuery<typeof ProfileQuery> {
    query = ProfileQuery;
  }
  ```

  ```ts tab haunted
  import '@apollo-elements/components/apollo-mutation';
  import { useQuery, useMutation, useState, component, html } from '@apollo-elements/haunted';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

  function ProfilePage() {
    const { data, loading } = useQuery(ProfileQuery);
    const [updateProfile, result] = useMutation(UpdateProfileMutation);
    const [input, setInput] = useState({})

    const onVariableInput = e => setInput({ ...input, [e.target.id]: e.target.value });

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
        <label>Name <input id="name" @input="${onVariableInput}"></label>
        <label>Picture (URL) <input id="picture" @input="${onVariableInput}"></label>
        <label>Birthday <input id="birthday" @input="${onVariableInput}" type="date"/></label>
        <button @click="${() => updateProfile({ variables: { input } })}">Save</button>
      </form>
    `;

  }

  customElements.define('profile-page', component(ProfilePage));
  ```

  ```tsx tab atomico
  import '@apollo-elements/components/apollo-mutation';
  import { useQuery, useMutation, useState, c } from '@apollo-elements/atomico';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

  function ProfilePage() {
    const { data, loading } = useQuery(ProfileQuery);
    const [updateProfile, result] = useMutation(UpdateProfileMutation);
    const [input, setInput] = useState({})

    const onVariableInput = e => setInput({ ...input, [e.target.id]: e.target.value });

    return (
      <host shadowDom>
        <h2>Profile</h2>
        <dl hidden={loading || !data}>
          <dt>Name</dt>
          <dd>${data?.name}</dd>
          <dt>Picture</dt>
          <dd><img src={data?.picture}/></dd>
          <dt>Birthday</dt>
          <dd>${data?.birthday}</dd>
        </dl>
        <form hidden={!data?.isMe}>
          <h3>Edit</h3>
          <label>Name <input id="name" oninput={onVariableInput}></label>
          <label>Picture (URL) <input id="picture" oninput={onVariableInput}></label>
          <label>Birthday <input id="birthday" oninput={onVariableInput} type="date"/></label>
          <button onclick={() => updateProfile({ variables: { input } })}>Save</button>
        </form>
      </host>
    );

  }

  customElements.define('profile-page', c(ProfilePage));
  ```

  ```ts tab hybrids
  import '@apollo-elements/components/apollo-mutation';
  import { query, mutation, define, html } from '@apollo-elements/hybrids';

  import { ProfileQuery } from './Profile.query.graphql';
  import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

  const onVariableInput = (host, e) => {
    host.mutation.variables = {
      input: {
        ...host.mutation.variables?.input,
        [e.target.id]: e.target.value,
      },
    };
  }

  define('profile-page', {
    query: query(ProfileQuery),
    mutation: mutation(UpdateProfileMutation),
    render: ({ query: { data, loading } }) => html`
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
        <label>Name <input id="name" oninput="${onVariableInput}"></label>
        <label>Picture (URL) <input id="picture" oninput="${onVariableInput}"></label>
        <label>Birthday <input id="birthd oninput="${onVariableInput}"ay" type="date"/></label>
        <button onclick="${() => host.mutation.mutate()}">Save</button>
      </form>
    `,
  });
  ```

</code-tabs>


Read more about [`ApolloMutationController`](/api/core/controllers/mutation/) in the API docs.
