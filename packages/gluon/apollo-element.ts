import type { ApolloElementInterface, Constructor } from '@apollo-elements/interfaces';

export { html } from '@gluon/gluon';
import { GluonElement } from '@gluon/gluon';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { defineObservedProperties } from './helpers/descriptor';

/**
 * # ApolloElement
 *
 * Gluon base class for apollo custom elements.
 */
export class ApolloElement<TData = unknown, TVariables = unknown>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloElementMixin(GluonElement as Constructor<GluonElement>)<TData, TVariables>
  implements ApolloElementInterface<TData> { }

defineObservedProperties(ApolloElement, {
  data: null,
  error: null,
  errors: null,
  loading: false,
});
