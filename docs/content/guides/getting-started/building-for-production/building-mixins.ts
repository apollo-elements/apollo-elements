import { HelloQuery } from './Hello.query.graphql';
import style from './hello-query.css';

class HelloWorld extends ApolloQuery {
  query = HelloQuery;

  static get styles() {
    return style;
  }
}

customElements.define('hello-world', HelloWorld);
