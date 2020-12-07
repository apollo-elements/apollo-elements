import type {
  ApolloClient,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';
import type { DocumentNode } from 'graphql';
import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import { fixture, expect, oneEvent, defineCE, nextFrame } from '@open-wc/testing';

import { gql } from '@apollo/client/core';

import { stub } from 'sinon';

import {
  assertType,
  isApolloError,
  NullableParamMutationData,
  NullableParamMutationVariables,
  setupClient,
  teardownClient,
} from '@apollo-elements/test-helpers';

import { setupMutationClass, describeMutation } from '@apollo-elements/test-helpers/mutation.test';
import type { MutationElement } from '@apollo-elements/test-helpers/mutation.test';

import { GraphQLError } from 'graphql';

import './apollo-mutation';

import { PolymerApolloMutation } from './apollo-mutation';

import { PolymerElement, html } from '@polymer/polymer';

import NullableParamMutation from '@apollo-elements/test-helpers/graphql/NullableParam.mutation.graphql';

class TestableApolloMutation<D, V>
  extends PolymerApolloMutation<D, V>
  implements MutationElement<D, V> {
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

  $(id: keyof TestableApolloMutation<D, V>) { return this.shadowRoot.getElementById(id); }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(TestableApolloMutation.template.content.cloneNode(true));
    this.addEventListener('called-changed', this.render);
    this.addEventListener('data-changed', this.render);
    this.addEventListener('error-changed', this.render);
    this.addEventListener('errors-changed', this.render);
    this.addEventListener('loading-changed', this.render);
  }

  render() {
    this.$('called')!.textContent = this.stringify(this.called);
    this.$('data')!.textContent = this.stringify(this.data);
    this.$('error')!.textContent = this.stringify(this.error);
    this.$('errors')!.textContent = this.stringify(this.errors);
    this.$('loading')!.textContent = this.stringify(this.loading);
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }

  async hasRendered() {
    await nextFrame();
    return this;
  }
}

class WrapperElement extends PolymerElement {
  declare shadowRoot: ShadowRoot;

  declare mutation: DocumentNode;

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
      <apollo-mutation id="mutation"
          mutation="[[mutation]]"
          variables="[[variables]]"
          data="{{data}}">
      </apollo-mutation>

      <button id="button" on-click="onClick"></button>

      <output>[[data.nullableParam.nullable]]</output>
    `;
  }

  onClick() {
    this.$.mutation.mutate();
  }
}

describe('[polymer] <apollo-mutation>', function() {
  describeMutation({
    class: TestableApolloMutation,
    setupFunction: setupMutationClass(TestableApolloMutation),
  });

  describe('notify events', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);

    let element: PolymerApolloMutation<unknown, unknown>;

    beforeEach(async function setupElement() {
      element = await fixture(`<apollo-mutation></apollo-mutation>`);
    });

    it('notifies on data change', async function() {
      const mutationStub = stub(element.client, 'mutate');

      mutationStub.resolves({ data: { messages: ['hi'] } });

      const mutation = gql`mutation { messages }`;

      element.mutate({ mutation });

      const { detail: { value } } = await oneEvent(element, 'data-changed');

      expect(value).to.deep.equal({ messages: ['hi'] });
      mutationStub.restore();
    });

    it('notifies on error change', async function() {
      const err = new Error('error');
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
      const tag = defineCE(WrapperElement);
      wrapper = await fixture<WrapperElement>(`<${tag}></${tag}>`);
    });

    beforeEach(function() {
      wrapper.$.button.click();
    });

    beforeEach(nextFrame);

    it('binds data up into parent component', async function() {
      expect(wrapper.shadowRoot.textContent).to.contain('🤡');
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends PolymerApolloMutation<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    // ApolloElementInterface
    assertType<ApolloClient<NormalizedCacheObject>> (this.client);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
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
    assertType<DocumentNode>                        (this.mutation!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<boolean>                             (this.called);
    assertType<boolean>                             (this.ignoreResults);
    assertType<boolean>                             (this.awaitRefetchQueries!);
    assertType<number>                              (this.mostRecentMutationId);
    assertType<ErrorPolicy>                         (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<string>                              (this.fetchPolicy!);
    assertType<Extract<FetchPolicy, 'no-cache'>>    (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: FetchResult<TypeCheckData>) => RefetchQueryDescription>(this.refetchQueries);
    else
      assertType<RefetchQueryDescription>(this.refetchQueries!);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData>(this.optimisticResponse!);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>(this.optimisticResponse);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends PolymerApolloMutation<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
