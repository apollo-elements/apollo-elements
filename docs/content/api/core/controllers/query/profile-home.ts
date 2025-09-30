import '@apollo-elements/components/apollo-client';
import { ApolloQueryController } from '@apollo-elements/core';
import { customElement } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ProfileQuery } from './Profile.query.graphql.js';
import style from './profile-home.css.js';

@customElement('profile-home')
class ProfileHome extends LitElement {
  static ids = [1,2,3];

  static styles = style;

  profile = new ApolloQueryController(this, ProfileQuery, {
    variables: { id: 1 }
  });

  radio(id) {
    const astronaut = this.profile.data?.profile;
    return html`
      <label> <input id=${id} type=radio name=id value=${id}
               ?checked=${astronaut?.id == id}
               @change=${this.onChange}/> ${id} </label>`;
  }

  onChange(event) { this.profile.variables = { id: event.target.value } }

  render() {
    const { data, loading } = this.profile ?? {};
    const astronaut = data?.profile;
    return html`
      <form><legend>Crew ID</legend>${ProfileHome.ids.map(this.radio, this)}</form>
      <article class=${classMap({ loading })}>
        <img .src=${astronaut?.picture} alt=""/>
        <figure>
          <blockquote>${astronaut?.quote}</blockquote>
          <figcaption>- ${astronaut?.name}, ${astronaut?.position}</figcaption>
        </figure>
      </article>
    `;
  }
}
