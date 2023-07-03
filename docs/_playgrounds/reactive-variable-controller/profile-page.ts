import { customElement } from 'lit/decorators.js';
import { html, LitElement } from 'lit';

import { ReactiveVariableController } from '@apollo-elements/core';

import { locationVar } from './router.js';

import style from './profile-page.css.js';

@customElement('profile-page')
class ProfilePage extends LitElement {
  static styles = style;

  router = new ReactiveVariableController(this, locationVar);

  render() {
    const { username } = this.router.value?.groups ?? {}
    return html`
      <section ?hidden=${!username}>
        <h2>User ${username}</h2>
      </section>
    `;
  }
}
