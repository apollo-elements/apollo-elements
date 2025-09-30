import { ControllerHostMixin } from '@apollo-elements/mixins/controller-host-mixin';
import { ApolloQueryController } from '@apollo-elements/core/apollo-query-controller';

const template = document.createElement("template");
template.innerHTML = `
  <h2>Astronauts</h2>
  <div id="astronauts"></div>
`;

const itemTemplate = document.createElement("template");
itemTemplate.innerHTML = `
  <astro-naut name="">
    <img>
  </astro-naut>
`;

class Astronauts extends ApolloQueryMixin(HTMLElement) {
  query = new ApolloQueryController(this, gql`
    query Users {
      users {
        id
        name
        picture
      }
    }
  `)

  constructor() {
    super();
    this
      .attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true));
  }

  update() {
    this.render();
    super.update();
  }

  update() {
    const node = this.shadowRoot.getElementById('astronauts');
    for (const child of node.children)
      child.remove();
    for (const { id, name , picture } of this.data?.users ?? []) {
      const astronode = itemTemplate.content.cloneNode(true);
      astronode.id = id;
      astronode.name = name;
      const img = astronode.querySelector('img');
      img.src = picture;
      img.alt = `Portrait of ${name}`;
      node.appendChild(astronode);
    }
  }
}
