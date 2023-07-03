import type { Binding, ViewTemplate } from '@microsoft/fast-element'
import { FASTElement, customElement, html, ref, when, repeat } from '@microsoft/fast-element';
import { ApolloQueryBehavior, ApolloMutationBehavior } from '@apollo-elements/fast';
import { ProfileQuery } from './Profile.query.graphql.js';
import { CountriesQuery } from './Countries.query.graphql.js';
import { UpdateProfileMutation } from './UpdateProfile.mutation.graphql.js';
import { client } from './client.js';
import { styles } from './user-profile.css.js';

const name = 'user-profile';
const getCountry: Binding<UserProfile> = x => x.profile.data?.profile?.country.countryCode ?? '';
const getFlag: Binding<UserProfile> = x => x.profile.data?.profile?.country.emoji ?? '';
const getName: Binding<UserProfile> = x => x.profile.data?.profile?.name ?? 'New User';
const hasProfile: Binding<UserProfile> = x => !!x.profile.data?.profile;
const onClickSave: Binding<UserProfile> = x => x.onClickSave();
const getCountries: Binding<UserProfile> = x => Array.from(x.countries.data?.countries ?? []);

const template: ViewTemplate<UserProfile> = html`
  <fast-card>
    <p>Hello, ${getName} ${getFlag}</p>
    <fast-text-field ${ref('nameInput')}
        appearance="filled"
        placeholder="Username">Name</fast-text-field>
    <label for="country">Country</label>
    <fast-combobox autocomplete="both" ${ref('countryInput')}
        id="country"
        value="${getCountry}">${repeat(getCountries, html`
      <fast-option value="${x => x.countryCode}">${x => x.name}
        <span slot="start">${x => x.emoji}</span>
      </fast-option>`)}
    </fast-combobox>
    <fast-button @click="${onClickSave}">Save</fast-button>
  </fast-card>
`;

@customElement({ name, template, styles })
class UserProfile extends FASTElement {
  countryInput: HTMLSelectElement;
  nameInput: HTMLInputElement;

  countries = new ApolloQueryBehavior(this, CountriesQuery, { client });
  profile = new ApolloQueryBehavior(this, ProfileQuery, { client });
  update = new ApolloMutationBehavior(this, UpdateProfileMutation, {
    client,
    update(cache, result) {
      const profile = result.data.updateProfile;
      cache.writeQuery({
        query: ProfileQuery,
        data: { profile },
      });
    }
  });

  onClickSave() {
    this.update.mutate({
      variables: {
        input: {
          name: this.nameInput.value,
          country: this.countryInput.options[this.countryInput.selectedIndex]?.value ?? null,
        },
      },
    });
  }
}
