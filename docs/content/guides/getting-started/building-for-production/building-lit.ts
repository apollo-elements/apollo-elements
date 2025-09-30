import { ApolloQueryController } from '@apollo-elements/core';
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { HelloQuery } from './Hello.query.graphql';
import style from './hello-query.css';

@customElement('hello-world')
class HelloWorld extends LitElement {
  query = new ApolloQueryController(this, HelloQuery);

  static styles = style;
}
