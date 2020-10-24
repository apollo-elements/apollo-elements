import {
  ApolloClient,
  ApolloError,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import type { DocumentNode, GraphQLError } from 'graphql';

import { fixture, expect, aTimeout, oneEvent } from '@open-wc/testing';

import { html } from 'lit-html';

import { stub } from 'sinon';

import type * as Sinon from 'sinon';

import 'sinon-chai';

import {
  setupClient,
  NoParamMutationData,
  NoParamMutationVariables,
  isApolloError,
  assertType,
  NullableParamMutationData,
  NullableParamMutationVariables,
  teardownClient,
} from '@apollo-elements/test-helpers';

import './apollo-mutation';

import {
  ApolloMutationElement,
} from './apollo-mutation';

import {
  MutationCompletedEvent,
  WillNavigateEvent,
  WillMutateEvent,
  MutationErrorEvent,
} from './events';

import NoParamMutation from '../test-helpers/NoParam.mutation.graphql';
import NullableParamMutation from '../test-helpers/NullableParam.mutation.graphql';

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };

function TypeCheck() {
  const el = new ApolloMutationElement<TypeCheckData, TypeCheckVars>();
  /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

  assertType<HTMLElement>                         (el);

  // ApolloElementInterface
  assertType<ApolloClient<NormalizedCacheObject>> (el.client);
  assertType<Record<string, unknown>>             (el.context);
  assertType<boolean>                             (el.loading);
  assertType<DocumentNode>                        (el.document);
  assertType<Error>                               (el.error);
  assertType<readonly GraphQLError[]>             (el.errors);
  assertType<TypeCheckData>                       (el.data);
  assertType<string>                              (el.error.message);
  assertType<'a'>                                 (el.data.a);
  // @ts-expect-error: b as number type
  assertType<'a'>                                 (el.data.b);
  if (isApolloError(el.error))
    assertType<readonly GraphQLError[]>           (el.error.graphQLErrors);

  // ApolloMutationInterface
  assertType<DocumentNode>                        (el.mutation);
  assertType<TypeCheckVars>                       (el.variables);
  assertType<boolean>                             (el.called);
  assertType<boolean>                             (el.ignoreResults);
  assertType<boolean>                             (el.awaitRefetchQueries);
  assertType<number>                              (el.mostRecentMutationId);
  assertType<ErrorPolicy>                         (el.errorPolicy);
  assertType<string>                              (el.errorPolicy);
  // @ts-expect-error: ErrorPolicy is not a number
  assertType<number>                              (el.errorPolicy);
  assertType<string>                              (el.fetchPolicy);
  assertType<Extract<FetchPolicy, 'no-cache'>>    (el.fetchPolicy);

  if (typeof el.refetchQueries === 'function')
    assertType<(result: FetchResult<TypeCheckData>) => RefetchQueryDescription>(el.refetchQueries);
  else
    assertType<RefetchQueryDescription>(el.refetchQueries);

  if (typeof el.optimisticResponse !== 'function')
    assertType<TypeCheckData>(el.optimisticResponse);
  else
    assertType<(vars: TypeCheckVars) => TypeCheckData>(el.optimisticResponse);

  /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
}

describe('[components] <apollo-mutation>', function describeApolloMutation() {
  beforeEach(setupClient);

  afterEach(teardownClient);

  describe('with variables as data attributes', function() {
    let element: ApolloMutationElement<unknown, unknown>;

    beforeEach(async function() {
      element = await fixture<ApolloMutationElement<unknown, unknown>>(html`
        <apollo-mutation
            data-var-a="variable-a"
            data-var-b="variable-b"
        ></apollo-mutation>
      `);
    });

    it('reads variables from dataset', function() {
      expect(element.variables).to.deep.equal({
        varA: 'variable-a',
        varB: 'variable-b',
      });
    });
  });

  describe('with children in variables slots', function() {
    let element: ApolloMutationElement<unknown, unknown>;

    beforeEach(async function() {
      element = await fixture<ApolloMutationElement<unknown, unknown>>(html`
        <apollo-mutation>
          <input slot="variable" data-variable="varA" value="variable-a"/>
          <input slot="variable" data-variable="varB" value="variable-b"/>
        </apollo-mutation>
      `);
    });

    it('reads variables from children', function() {
      expect(element.variables).to.deep.equal({
        varA: 'variable-a',
        varB: 'variable-b',
      });
    });
  });

  describe('with variables as data attributes and children in variables slots', function() {
    let element: ApolloMutationElement<unknown, unknown>;

    beforeEach(async function() {
      element = await fixture<ApolloMutationElement<unknown, unknown>>(html`
        <apollo-mutation
            data-var-a="variable-a"
            data-var-b="variable-b">
          <input slot="variable" data-variable="varC" value="variable-c"/>
          <input slot="variable" data-variable="varD" value="variable-d"/>
        </apollo-mutation>
      `);
    });

    it('reads variables from children', function() {
      expect(element.variables).to.deep.equal({
        varA: 'variable-a',
        varB: 'variable-b',
        varC: 'variable-c',
        varD: 'variable-d',
      });
    });
  });

  describe('with an input key', function() {
    describe('with variables as data attributes', function() {
      let element: ApolloMutationElement<unknown, unknown>;

      beforeEach(async function() {
        element = await fixture<ApolloMutationElement<unknown, unknown>>(html`
          <apollo-mutation
              input-key="inputTypeName"
              data-var-a="variable-a"
              data-var-b="variable-b"
          ></apollo-mutation>
        `);
      });

      it('reads variables from dataset', function() {
        expect(element.variables).to.deep.equal({
          inputTypeName: {
            varA: 'variable-a',
            varB: 'variable-b',
          },
        });
      });
    });

    describe('with children in variables slots', function() {
      let element: ApolloMutationElement<unknown, unknown>;

      beforeEach(async function() {
        element = await fixture<ApolloMutationElement<unknown, unknown>>(html`
          <apollo-mutation input-key="inputTypeName">
            <input slot="variable" data-variable="varA" value="variable-a"/>
            <input slot="variable" data-variable="varB" value="variable-b"/>
          </apollo-mutation>
        `);
      });

      it('reads variables from children', function() {
        expect(element.variables).to.deep.equal({
          inputTypeName: {
            varA: 'variable-a',
            varB: 'variable-b',
          },
        });
      });
    });

    describe('with variables as data attributes and children in variables slots', function() {
      let element: ApolloMutationElement<unknown, unknown>;

      beforeEach(async function() {
        element = await fixture<ApolloMutationElement<unknown, unknown>>(html`
          <apollo-mutation
              input-key="inputTypeName"
              data-var-a="variable-a"
              data-var-b="variable-b">
            <input slot="variable" data-variable="varC" value="variable-c"/>
            <input slot="variable" data-variable="varD" value="variable-d"/>
          </apollo-mutation>
        `);
      });

      it('reads variables from children', function() {
        expect(element.variables).to.deep.equal({
          inputTypeName: {
            varA: 'variable-a',
            varB: 'variable-b',
            varC: 'variable-c',
            varD: 'variable-d',
          },
        });
      });
    });
  });

  describe('with a button trigger', function() {
    let element: ApolloMutationElement<NoParamMutationData, NoParamMutationVariables>;
    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${NoParamMutation}">
          <button slot="trigger">mutate</button>
        </apollo-mutation>
      `);
    });

    describe('clicking the button', function() {
      it('mutates', async function() {
        expect(element.data).to.be.null;
        element.querySelector<HTMLButtonElement>('[slot="trigger"]').click();
        await aTimeout(10);
        expect(element.data).to.be.ok;
      });

      it('fires will-mutate event', async function() {
        setTimeout(() => {
          element.querySelector<HTMLButtonElement>('[slot="trigger"]').click();
        });

        const event = await oneEvent(element, WillMutateEvent.type);

        expect(event.detail.element).to.equal(element);
      });

      it('fires mutation-completed event', async function() {
        setTimeout(() => {
          element.querySelector<HTMLButtonElement>('[slot="trigger"]').click();
        });

        const event = await oneEvent(element, MutationCompletedEvent.type);

        expect(event.detail.element).to.equal(element);
      });

      describe('when will-mutate event is canceled', function() {
        it('does not mutate', async function() {
          const { type } = WillMutateEvent;
          element.addEventListener(type, function(event) {
            event.preventDefault();
            expect(event.detail.element).to.equal(element);
          }, { once: true });

          element.querySelector<HTMLButtonElement>('[slot="trigger"]').click();

          await aTimeout(10);

          expect(element.data).to.be.null;
        });
      });
    });
  });

  describe('with a link trigger', function() {
    let element: ApolloMutationElement<NoParamMutationData, NoParamMutationVariables>;

    let replaceStateStub: Sinon.SinonStub;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${NoParamMutation}">
          <a slot="trigger" href="#foo">do it.</a>
        </apollo-mutation>
      `);
      replaceStateStub = stub(history, 'replaceState');
    });

    afterEach(function() {
      replaceStateStub.restore();
    });

    describe('clicking the link', function() {
      it('mutates', async function() {
        expect(element.data).to.be.null;
        element.querySelector<HTMLButtonElement>('[slot="trigger"]').click();
        await aTimeout(10);
        expect(element.data).to.be.ok;
      });

      it('fires will-mutate event', async function() {
        setTimeout(() => {
          element.querySelector<HTMLButtonElement>('[slot="trigger"]').click();
        });

        const event = await oneEvent(element, WillMutateEvent.type);

        expect(event.detail.element).to.equal(element);
      });

      it('fires mutation-completed event', async function() {
        setTimeout(() => {
          element.querySelector<HTMLButtonElement>('[slot="trigger"]').click();
        });

        const event = await oneEvent(element, MutationCompletedEvent.type);

        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
      });

      it('fires will-navigate event', async function() {
        setTimeout(() => {
          element.querySelector<HTMLButtonElement>('[slot="trigger"]').click();
        });

        const event = await oneEvent(element, WillNavigateEvent.type);

        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
      });

      it('navigates', async function() {
        setTimeout(() => {
          element.querySelector<HTMLButtonElement>('[slot="trigger"]').click();
        });

        await oneEvent(element, WillNavigateEvent.type);

        expect(replaceStateStub).to.have.been.called;
      });

      describe('when will-navigate event is canceled', function() {
        it('does not navigate', async function() {
          const { type } = WillNavigateEvent;
          element.addEventListener(type, function(event) {
            event.preventDefault();
            expect(event.detail.element).to.equal(element);
          }, { once: true });

          element.querySelector<HTMLButtonElement>('[slot="trigger"]').click();

          await aTimeout(10);

          expect(replaceStateStub).to.not.have.been.called;
        });
      });

      describe('when will-mutate event is canceled', function() {
        it('does not mutate', async function() {
          const { type } = WillMutateEvent;
          element.addEventListener(type, function(event) {
            event.preventDefault();
            expect(event.detail.element).to.equal(element);
          }, { once: true });

          element.querySelector<HTMLButtonElement>('[slot="trigger"]').click();

          await aTimeout(10);

          expect(element.data).to.be.null;
        });
      });
    });

    describe('clicking twice', function() {
      it('mutates', async function() {
        const link = element.querySelector('a');
        let count = 0;
        element.addEventListener(WillMutateEvent.type, function() { count++; });
        link.click();
        await element.updateComplete;
        link.click();
        link.click();
        expect(count).to.equal(1);
      });
    });
  });

  describe('with a link trigger that wraps a button', function() {
    let element: ApolloMutationElement<NullableParamMutationData, NullableParamMutationVariables>;

    let replaceStateStub: Sinon.SinonStub;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${NullableParamMutation}">
          <a slot="trigger" href="#foo">
            <button>do it</button>
          </a>
        </apollo-mutation>
      `);

      replaceStateStub = stub(history, 'replaceState');
    });

    afterEach(function() {
      replaceStateStub.restore();
    });

    describe('when element has `resolveURL` property', function() {
      beforeEach(function() {
        element.resolveURL =
          ({ nullableParam }: NullableParamMutationData): string => `/nullable/${nullableParam.nullable}/`;
        element.setAttribute('data-nullable', 'special');
      });

      describe('clicking the button', function() {
        beforeEach(async function() {
          const button = element.querySelector('button');
          button.click();
          await aTimeout(100);
        });

        it('navigates to the resolved URL', function() {
          expect(replaceStateStub)
            .to.have.been.calledWith(element.data, 'will-navigate', '/nullable/special/');
        });
      });
    });

    describe('clicking the link', function() {
      it('mutates', async function() {
        const button = element.querySelector('button');
        expect(element.data).to.be.null;
        button.click();
        await aTimeout(10);
        expect(element.data).to.be.ok;
      });

      it('fires will-mutate event', async function() {
        const button = element.querySelector('button');
        setTimeout(() => button.click());

        const event = await oneEvent(element, WillMutateEvent.type);

        expect(event.detail.element).to.equal(element);
      });

      it('fires mutation-completed event', async function() {
        const button = element.querySelector('button');

        setTimeout(async function() {
          button.click();
          expect(button.disabled).to.be.true;
        });

        const event = await oneEvent(element, MutationCompletedEvent.type);

        await element.updateComplete;

        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
        expect(button.disabled).to.be.false;
      });

      it('fires will-navigate event', async function() {
        const button = element.querySelector('button');
        setTimeout(() => button.click());

        const event = await oneEvent(element, WillNavigateEvent.type);

        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
      });

      it('navigates', async function() {
        setTimeout(() => {
          element.querySelector('button').click();
        });

        await oneEvent(element, WillNavigateEvent.type);

        expect(replaceStateStub).to.have.been.called;
      });

      describe('when will-navigate event is canceled', function() {
        it('does not navigate', async function() {
          const button = element.querySelector('button');
          const { type } = WillNavigateEvent;
          element.addEventListener(type, function(event) {
            event.preventDefault();
            expect(event.detail.element).to.equal(element);
          }, { once: true });

          button.click();

          await aTimeout(10);

          expect(replaceStateStub).to.not.have.been.called;
        });
      });

      describe('when will-mutate event is canceled', function() {
        it('does not mutate', async function() {
          const { type } = WillMutateEvent;
          element.addEventListener(type, function(event) {
            event.preventDefault();
            expect(event.detail.element).to.equal(element);
          }, { once: true });

          element.querySelector('button').click();

          await aTimeout(10);

          expect(element.data).to.be.null;
        });
      });
    });
  });

  describe('with variable inputs and a button trigger', function() {
    let element: ApolloMutationElement<NoParamMutationData, NoParamMutationVariables>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${NoParamMutation}">
          <input slot="variable" data-variable="varA" value="variable-a">
          <button slot="trigger">Do It</button>
        </apollo-mutation>
      `);
    });

    describe('clicking the button', function() {
      it('toggles input disabled property', async function() {
        const input = element.querySelector('input');
        const button = element.querySelector('button');
        setTimeout(async function() {
          button.click();
          expect(input.disabled).to.be.true;
        });

        const event = await oneEvent(element, MutationCompletedEvent.type);

        await element.updateComplete;

        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
        expect(input.disabled).to.be.false;
      });
    });
  });

  describe('when mutation errors', function() {
    let element: ApolloMutationElement<NullableParamMutationData, NullableParamMutationVariables>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${NullableParamMutation}" data-nullable="error">
          <button slot="trigger">Do It</button>
        </apollo-mutation>
      `);
    });

    describe('clicking the button', function() {
      it('fires mutation-error event', async function() {
        await element.updateComplete;
        const button = element.querySelector('button');
        setTimeout(() => button.click());
        const event = await oneEvent(element, MutationErrorEvent.type);
        expect(event.detail.element).to.equal(element);
        expect(event.detail.error).to.be.an.instanceOf(ApolloError);
      });
    });
  });
});
