import type * as I from '@apollo-elements/core/types';

import type * as C from '@apollo/client/core';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import { aTimeout, fixture, expect, oneEvent, defineCE, nextFrame } from '@open-wc/testing';

import { gql } from '@apollo/client/core';

import { stub, spy } from 'sinon';

import {
  assertType,
  isApolloError,
  NullableParamMutationData,
  NullableParamMutationVariables,
  setupClient,
  stringify,
  teardownClient,
  TestableElement,
} from '@apollo-elements/test';

import { setupMutationClass, describeMutation } from '@apollo-elements/test/mutation.test';

import { GraphQLError } from 'graphql';

import './polymer-apollo-mutation';

import { PolymerApolloMutation } from './polymer-apollo-mutation';

import { PolymerElement, html } from '@polymer/polymer';
import { flush } from '@polymer/polymer/lib/utils/flush';

import NullableParamMutation from '@apollo-elements/test/graphql/NullableParam.mutation.graphql';

class TestableApolloMutation<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends PolymerApolloMutation<D, V>
  implements TestableElement {
  declare shadowRoot: ShadowRoot;

  static get template() {
    const template = document.createElement('template');
    template.innerHTML = /* html */`
      <output id="called"></output>
      <output id="data"></output>
      <output id="error"></output>
      <output id="errors"></output>
      <output id="loading"></output>
    `;
    return template;
  }

  $(id: keyof this) { return this.shadowRoot.getElementById(id as string); }

  observed: Array<keyof TestableApolloMutation<D, V>> = [
    'called',
    'data',
    'error',
    'errors',
    'loading',
  ]

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(TestableApolloMutation.template.content.cloneNode(true));
  }

  render() {
    if (!this.shadowRoot) return;
    for (const key of this.observed)
      this.$(key)!.textContent = stringify(this[key]);
  }

  update() {
    this.render();
  }

  async hasRendered(): Promise<this> {
    await this.updateComplete;
    await nextFrame();
    flush();
    return this;
  }
}

class WrapperElement extends PolymerElement {
  declare shadowRoot: ShadowRoot;

  declare mutation: C.DocumentNode;

  declare variables: NullableParamMutationVariables;

  declare $: {
    button: HTMLButtonElement;
    mutation: PolymerApolloMutation<NullableParamMutationData, NullableParamMutationVariables>
  };

  static get properties() {
    return {
      mutation: { type: Object, value: () => NullableParamMutation },
      variables: { type: Object, value: () => ({ nullable: '🤡' }) },
    };
  }

  static get template() {
    return html`
      <polymer-apollo-mutation id="mutation"
          mutation="[[mutation]]"
          variables="[[variables]]"
          data="{{data}}">
      </polymer-apollo-mutation>

      <button id="button" on-click="onClick"></button>

      <output>[[data.nullableParam.nullable]]</output>
    `;
  }

  onClick() {
    this.$.mutation.onCompleted ??= spy();
    this.$.mutation.mutate();
  }
}

describe('[polymer] <polymer-apollo-mutation>', function() {
  describeMutation({
    class: TestableApolloMutation,
    setupFunction: setupMutationClass(TestableApolloMutation),
  });

  describe('notify events', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);

    let element: PolymerApolloMutation;

    beforeEach(async function setupElement() {
      element = await fixture(`<polymer-apollo-mutation></polymer-apollo-mutation>`);
    });

    it('notifies on data change', async function() {
      const mutationStub = stub(element.client!, 'mutate');

      mutationStub.resolves({ data: { messages: ['hi'] } });

      const mutation = gql`mutation { messages }`;

      element.mutate({ mutation });

      const { detail: { value } } = await oneEvent(element, 'data-changed');

      expect(value).to.deep.equal({ messages: ['hi'] });
      mutationStub.restore();
    });

    it('notifies on error change', async function() {
      let err: Error;
      try {
        throw new Error('error');
      } catch (e) { err = e; }
      setTimeout(() => element.error = err);
      const { detail: { value: { message } } } = await oneEvent(element, 'error-changed');
      expect(message).to.equal('error');
    });

    it('notifies on errors change', async function() {
      const errs = [new GraphQLError('error')];
      setTimeout(() => element.errors = errs);
      const { detail: { value } } = await oneEvent(element, 'errors-changed');
      expect(value).to.equal(errs);
    });

    it('notifies on loading change', async function() {
      setTimeout(() => element.loading = true);
      const { detail: { value } } = await oneEvent(element, 'loading-changed');
      expect(value).to.be.true;
    });

    it('notifies on called change', async function() {
      setTimeout(() => element.called = true);
      const { detail: { value } } = await oneEvent(element, 'called-changed');
      expect(value).to.be.true;
    });
  });

  describe('when used in a Polymer template', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);

    let wrapper: WrapperElement;

    beforeEach(async function setupWrapper() {
      const tag = defineCE(class extends WrapperElement {});
      wrapper = await fixture<WrapperElement>(`<${tag}></${tag}>`);
    });

    beforeEach(function() {
      wrapper.$.button.click();
    });

    beforeEach(() => aTimeout(100));

    beforeEach(flush);

    it('binds data up into parent component', async function() {
      expect(wrapper).shadowDom.to.equal(`
        <polymer-apollo-mutation id="mutation"></polymer-apollo-mutation>
        <button id="button"></button>
        <output>🤡</output>
      `);
    });

    it('calls onCompleted', function() {
      expect(wrapper.$.mutation.onCompleted).to.have.been.calledOnce;
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends PolymerApolloMutation<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    // ApolloElementInterface
    assertType<C.ApolloClient<C.NormalizedCacheObject>>(this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<C.DocumentNode>                      (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly GraphQLError[]>             (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloMutationInterface
    assertType<C.DocumentNode>                      (this.mutation!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<boolean>                             (this.called);
    assertType<boolean>                             (this.ignoreResults!);
    assertType<boolean>                             (this.awaitRefetchQueries!);
    assertType<C.ErrorPolicy>                       (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<string>                              (this.fetchPolicy!);
    assertType<Extract<C.FetchPolicy, 'no-cache'>>  (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: C.FetchResult<TypeCheckData>) => RefetchQueryDescription>(this.refetchQueries);
    else
      assertType<RefetchQueryDescription>(this.refetchQueries!);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData>(this.optimisticResponse!);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>(this.optimisticResponse);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = C.TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends PolymerApolloMutation<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
