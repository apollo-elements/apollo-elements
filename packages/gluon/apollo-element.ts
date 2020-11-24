import type { ApolloElementInterface, Constructor } from '@apollo-elements/interfaces';

import type { OperationVariables } from '@apollo/client/core';

import { GluonElement } from '@gluon/gluon';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { defineObservedProperties } from './helpers/descriptor';

export { html } from '@gluon/gluon';

/**
 * `ApolloElement`
 *
 * 🚀 Custom element base class for apollo gluon elements.
 *
 * See [[`ApolloElementInterface`]] for more information on events
 *
 * @element
 */
export class ApolloElement<D = unknown, V = OperationVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloElementMixin(GluonElement as Constructor<GluonElement>)<D, V>
  implements ApolloElementInterface<D, V> { }

defineObservedProperties(ApolloElement, {
  data: null,
  error: null,
  errors: null,
  loading: false,
});
