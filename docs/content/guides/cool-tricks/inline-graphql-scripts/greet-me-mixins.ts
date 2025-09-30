import { ApolloQueryMixin, GraphQLScriptChildMixin } from '@apollo-elements/mixins';

interface Data {
  name: string;
  greeting: string;
}


const template = document.createElement('template');
template.innerHTML = `<p></p>`;

template.content.querySelector('p').append(new Text('Hello'));
template.content.querySelector('p').append(new Text(', '));
template.content.querySelector('p').append(new Text('friend'));

class GreetMe extends GraphQLScriptChildMixin(ApolloQueryMixin(HTMLElement))<Data, null> {
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
    this.shadowRoot.append(template.content.cloneNode(true));
  }

  render() {
    const [greetingNode, , nameNode] =
      this.shadowRoot.querySelector('p').childNodes;
    greetingNode.data = this.data?.greeting ?? 'Hello';
    nameNode.data = this.data?.name ?? 'friend';
  }
}

customElements.define('greet-me', GreetMe);
