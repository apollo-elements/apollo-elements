import { ApolloQueryMixin, GraphQLScriptChildMixin } from '@apollo-elements/mixins';

interface Data {
  name: string;
  greeting: string;
}


class GreetMe extends GraphQLScriptChildMixin(ApolloQueryMixin(HTMLElement))<Data, null> {
  static template = document.createElement('template');
  static {
    this.template.innerHTML = `<p></p>`;
    this.template.content.querySelector('p').append(new Text('Hello'));
    this.template.content.querySelector('p').append(new Text(', '));
    this.template.content.querySelector('p').append(new Text('friend'));
  }

  #data: Data = null;

  get data() {
    return this.#data;
  }

  set data(value: Data) {
    this.#data = value;
    this.render();
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(GreetMe.template.content.cloneNode(true));
  }

  render() {
    const [greetingNode, , nameNode] =
      this.shadowRoot.querySelector('p').childNodes;
    greetingNode.data = this.data?.greeting ?? 'Hello';
    nameNode.data = this.data?.name ?? 'friend';
  }
}

customElements.define('greet-me', GreetMe);
