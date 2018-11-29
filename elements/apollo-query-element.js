import { NotifyingElementMixin } from '../mixins/notifying-element-mixin.js';
import { ApolloQuery } from '../classes/apollo-query.js';

/**
 * `<apollo-query>` fires Polymer-style prop-changed events
 * when its `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * @customElement
 * @extends ApolloQuery
 * @appliesMixin NotifyingElementMixin
 */
const ApolloQueryElement = NotifyingElementMixin(ApolloQuery);

customElements.define('apollo-query', ApolloQueryElement);
