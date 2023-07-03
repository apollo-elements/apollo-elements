import type { Binding, ViewTemplate } from '@microsoft/fast-element';
import { FASTElement, customElement, html, when } from '@microsoft/fast-element';
import { ApolloMutationBehavior } from '@apollo-elements/fast';
import { AddUserMutation } from './AddUser.mutation.graphql.js';
import { client } from './client.js';
import { styles } from './add-user.css.js';

const format = x => { try { return new Date(x).toDateString(); } catch { return ''; } };

const name = 'add-user';

const getAddedUser: Binding<AddUser> = x => x.addUser.data?.insertUsers?.returning?.[0];
const getLoading:   Binding<AddUser> = x => x.addUser.loading;
const getTimestamp: Binding<AddUser> = x => format(getAddedUser(x)?.timestamp);
const getUserName:  Binding<AddUser> = x => getAddedUser(x)?.name ?? '';
const hasData:      Binding<AddUser> = x => x.addUser.called || !!x.addUser.data;
const onClick:      Binding<AddUser> = x => x.addUser.mutate();
const onInput:      Binding<AddUser> = (x, { event }) => x.onInput(event);

const dataTemplate: ViewTemplate<AddUser> = html`
<dl>
  <dt>Name</dt>  <dd>${getUserName}</dd>
  <dt>Added</dt> <dd>${getTimestamp}</dd>
</dl>`;

const template: ViewTemplate<AddUser> = html`
  <fast-card>
    <h2>Add User</h2>
    ${when(hasData, dataTemplate)}
    <fast-text-field ?disabled="${getLoading}" @input="${onInput}">
      User Name
    </fast-text-field>
    <fast-button ?disabled="${getLoading}" @click="${onClick}">
      Add User
    </fast-button>
  </fast-card>
`;
@customElement({ name, template, styles })
class AddUser extends FASTElement {
  addUser = new ApolloMutationBehavior(this, AddUserMutation, { client });

  onInput(event: Event & { target: HTMLInputElement }): boolean {
    const name = event.target.value
    this.addUser.variables = { name }
    return true;
  }
}
