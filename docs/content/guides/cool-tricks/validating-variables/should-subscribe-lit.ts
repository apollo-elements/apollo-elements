import { ApolloQueryController } from '@apollo-elements/core';
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PostQuery } from './Post.query.graphql';
import { routeVar } from '../variables';

@customElement('blog-post')
class BlogPost extends LitElement {
  query = new ApolloQueryController(this, PostQuery, {
    shouldSubscribe() {
      return !!(routeVar().params?.postId)
    }
  });
}