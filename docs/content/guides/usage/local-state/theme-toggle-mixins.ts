import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

type Theme = 'dark'|'light';
type Data = { theme: Theme };

const template = document.createElement('template');
template.innerHTML = '<button @click="${this.toggleTheme}"></button>';
template.content.append(new Text('Change to '));
template.content.append(new Text(''));
template.content.append(new Text(' theme'));

export class ThemeToggle extends ApolloQueryMixin(HTMLElement)<Data, null> {
  query = ThemeToggleQuery;

  #data: Data = null;
  get data() { return this.#data; }
  set data(value: Data) {
    this.#data = data;
    this.render();
  }

  get nextTheme(): Theme {
    return this.data?.theme === 'dark' ? 'light' : 'dark';
  }

  $(selector) { return this.shadowRoot.querySelector(selector); }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
    this.$('button').addEventListener('click', this.toggleTheme.bind(this));
  }

  render() {
    const [, nextTheme] = this.$('button').childNodes;
    nextTheme.data = this.nextTheme;
  }

  toggleTheme() {
    // TBD
  }
}

customElements.define('theme-toggle', ThemeToggle);
