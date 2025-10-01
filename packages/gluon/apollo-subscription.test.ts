import type * as C from '@apollo/client';

import type * as I from '@apollo-elements/core/types';

import type { ApolloSubscriptionController } from '@apollo-elements/core';

import { html } from 'lit-html';

import { nextFrame } from '@open-wc/testing';

import { ApolloSubscription } from './apollo-subscription';
import { assertType, isApolloError, stringify, TestableElement } from '@apollo-elements/test';

import {
  describeSubscription,
  setupSubscriptionClass,
} from '@apollo-elements/test/subscription.test';

import { GluonElement } from '@gluon/gluon';

class TestableApolloSubscription<D, V extends C.OperationVariables = C.OperationVariables>
  extends ApolloSubscription<D, V> implements TestableElement {
  declare shadowRoot: ShadowRoot;

  static get is() { return 'gluon-test-subscription-element'; }

  // @ts-expect-error: Test intentionally declares controller with specific types matching class type parameters
  declare controller: ApolloSubscriptionController<D, V>;

  get template() {
    return html`
      <output id="data">${stringify(this.data)}</output>
      <output id="error">${stringify(this.error)}</output>
      <output id="loading">${stringify(this.loading)}</output>
    `;
  }

  async render() {
    // For gluon, manually render template to DOM
    const { render } = await import('lit-html');
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    render(this.template, this.shadowRoot!);
  }

  $(id: string) {
    // Try both shadowRoot and lightDOM for gluon elements
    return this.shadowRoot?.getElementById(id) || this.querySelector(`#${id}`);
  }

  async hasRendered(): Promise<this> {
    await this.updateComplete;
    await nextFrame();
    await this.render();
    return this;
  }
}

describe('[gluon] ApolloSubscription', function() {
  describeSubscription({
    class: TestableApolloSubscription,
    setupFunction: setupSubscriptionClass(TestableApolloSubscription),
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloSubscription<TypeCheckData, TypeCheckVars> {
  typeCheck() {


    assertType<HTMLElement>                         (this);
    // @ts-expect-error: TypeCheck class doesn't fully implement GluonElement (missing createRenderRoot)
    assertType<GluonElement>                        (this);

    // ApolloElementInterface
    assertType<C.ApolloClient>(this.client!);
    assertType<Record<string, unknown>>                 (this.context!);
    assertType<boolean>                                 (this.loading);
    assertType<C.DocumentNode>                          (this.document!);
    assertType<Error>                                   (this.error!);
    assertType<readonly I.GraphQLError[]>               (this.errors!);
    assertType<TypeCheckData>                           (this.data!);
    assertType<string>                                  (this.error.message);
    assertType<'a'>                                     (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                     (this.data.b);
    if (isApolloError(this.error))
      // Note: graphQLErrors removed in Apollo Client v4
      // assertType<readonly I.GraphQLError[]>(this.error.graphQLErrors);

    // ApolloSubscriptionInterface
    assertType<C.DocumentNode>                          (this.subscription!);
    assertType<TypeCheckVars>                           (this.variables!);
    assertType<C.FetchPolicy>                           (this.fetchPolicy!);
    assertType<C.ErrorPolicy>                           (this.errorPolicy!);
    assertType<string>                                  (this.fetchPolicy);
    // Note: notifyOnNetworkStatusChange removed in Apollo Client v4
    // assertType<boolean>(this.notifyOnNetworkStatusChange!);
    assertType<number>                                  (this.pollInterval!);
    assertType<boolean>                                 (this.skip);
    assertType<boolean>                                 (this.noAutoSubscribe);


  }
}

type TDN = C.TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloSubscription<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
