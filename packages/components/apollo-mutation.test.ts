import type { SinonSpy, SinonStub } from 'sinon';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import type { GraphQLError, OptimisticResponseType } from '@apollo-elements/interfaces';

import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client/core';

import * as S from '@apollo-elements/test';

import { ApolloError } from '@apollo/client/core';

import {
  aTimeout,
  expect,
  fixture,
  fixtureSync,
  nextFrame,
  oneEvent,
} from '@open-wc/testing';

import { html } from 'lit/static-html.js';

import { match, spy, stub } from 'sinon';

import {
  assertType,
  isApolloError,
  setupClient,
  teardownClient,
} from '@apollo-elements/test';

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


describe('[components] <apollo-mutation>', function describeApolloMutation() {
  beforeEach(setupClient);

  afterEach(teardownClient);

  describe('with no variables in DOM', function() {
    let element: ApolloMutationElement;

    beforeEach(async function() {
      element = await fixture<ApolloMutationElement>(html`
        <apollo-mutation></apollo-mutation>
      `);
    });

    it('does not set variables', function() {
      expect(element.variables).to.be.null;
    });

    describe('calling mutate({ mutation, variables })', function() {
      beforeEach(() => spy(element.controller, 'mutate'));
      afterEach(() => (element.controller.mutate as SinonSpy).restore?.());
      beforeEach(() => element.mutate({
        mutation: S.NullableParamMutation,
        variables: { nullable: 'nul' },
      }));
      it('calls controller mutate', function() {
        expect(element.controller.mutate).to.have.been.calledWithMatch({
          mutation: S.NullableParamMutation,
          variables: { nullable: 'nul' },
        });
      });
    });
  });

  describe('with refetch-queries attr', function() {
    let element: ApolloMutationElement;

    beforeEach(async function() {
      element = await fixture<ApolloMutationElement>(html`
        <apollo-mutation refetch-queries="A, B,C  ,   D  ,E"></apollo-mutation>
      `);
    });

    beforeEach(nextFrame);

    it('sets refetchQueries', function() {
      expect(element.refetchQueries)
        .to.deep.equal(['A', 'B', 'C', 'D', 'E'])
        .and.to.deep.equal(element.controller.options.refetchQueries);
    });

    describe('then removing attribute', function() {
      beforeEach(() => element.removeAttribute('refetch-queries'));
      beforeEach(nextFrame);
      it('unsets the property', function() {
        expect(element.refetchQueries).to.be.null;
      });
    });

    describe('calling mutate({ mutation })', function() {
      beforeEach(() => spy(element.controller.client!, 'mutate'));
      afterEach(() => (element.controller.client!.mutate as SinonSpy).restore?.());
      beforeEach(() => element.mutate({ mutation: S.NullableParamMutation }));
      it('calls client mutate', function() {
        expect(element.controller.client!.mutate).to.have.been.calledWith(match({
          mutation: S.NullableParamMutation,
          refetchQueries: ['A', 'B', 'C', 'D', 'E'],
        }));
      });
    });
  });

  describe('with variables as data attributes', function() {
    let element: ApolloMutationElement;

    beforeEach(async function() {
      element = await fixture<ApolloMutationElement>(html`
        <apollo-mutation
            data-var-a="variable-a"
            data-var-b="variable-b"
        ></apollo-mutation>
      `);
    });

    beforeEach(nextFrame);

    it('reads variables from dataset', function() {
      expect(element.variables).to.deep.equal({
        varA: 'variable-a',
        varB: 'variable-b',
      });
    });

    describe('setting inputKey', function() {
      const inputKey = 'inputTypeName';

      beforeEach(function() {
        element.inputKey = inputKey;
      });

      beforeEach(nextFrame);

      it('wraps variables in object with input key', function() {
        expect(element.variables).to.deep.equal({
          [inputKey]: {
            varA: 'variable-a',
            varB: 'variable-b',
          },
        });
      });

      it('sets input-key attribute', function() {
        expect(element.getAttribute('input-key')).to.equal(inputKey);
      });

      describe('then removing input-key attribute', function() {
        beforeEach(function() {
          element.removeAttribute('input-key');
        });

        beforeEach(nextFrame);

        it('unsets inputKey', function() {
          expect(element.inputKey).to.be.null;
        });
      });

      describe('then setting input-key attribute with the same value', function() {
        beforeEach(function() {
          element.setAttribute('input-key', inputKey);
        });

        beforeEach(nextFrame);

        it('has no effect', function() {
          expect(element.inputKey).to.equal(inputKey);
        });
      });
    });
  });

  describe('with children for variables', function() {
    let element: ApolloMutationElement;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement>(html`
        <apollo-mutation input-key="inputTypeName">
          <input data-variable="varA" value="variable-a"/>
          <input data-variable="varB" value="variable-b"/>
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

  describe('with single input variable', function() {
    let element: ApolloMutationElement;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement>(html`
        <apollo-mutation>
          <input data-variable="varA" value="variable-a"/>
        </apollo-mutation>
      `);
    });

    it('reads variables from children', function() {
      expect(element.variables).to.deep.equal({
        varA: 'variable-a',
      });
    });
  });

  describe('with multiple input variables', function() {
    let element: ApolloMutationElement;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement>(html`
        <apollo-mutation>
          <input data-variable="varA" value="variable-a"/>
          <input data-variable="varB" value="variable-b"/>
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

  describe('with single labeled variable', function() {
    let element: ApolloMutationElement;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement>(html`
        <apollo-mutation>
          <label>
            variable-a
            <input data-variable="varA" value="variable-a"/>
          </label>
        </apollo-mutation>
      `);
    });

    it('reads variables from children', function() {
      expect(element.variables).to.deep.equal({
        varA: 'variable-a',
      });
    });
  });

  describe('with mixed attribute, input, and labeled variables', function() {
    let element: ApolloMutationElement;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement>(html`
        <apollo-mutation data-var-b="variable-b">
          <label>
            variable-a
            <input data-variable="varA" value="variable-a"/>
          </label>
          <input data-variable="varC" value="variable-c" aria-label="variable C"/>
          <input class="sneaky-non-variable-no-dataset"/>
        </apollo-mutation>
      `);
    });

    it('reads variables from attributes and children', function() {
      expect(element.variables).to.deep.equal({
        varA: 'variable-a',
        varB: 'variable-b',
        varC: 'variable-c',
      });
    });
  });

  describe('with variables as data attributes and children variables', function() {
    let element: ApolloMutationElement;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement>(html`
        <apollo-mutation
            data-var-a="variable-a"
            data-var-b="variable-b">
          <input data-variable="varC" value="variable-c"/>
          <input data-variable="varD" value="variable-d"/>
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
      let element: ApolloMutationElement;
      const inputKey = 'inputTypeName';

      beforeEach(async function() {
        element = fixtureSync<ApolloMutationElement>(html`
          <apollo-mutation
              input-key="${inputKey}"
              data-var-a="variable-a"
              data-var-b="variable-b"
          ></apollo-mutation>
        `);
      });

      it('reads variables from dataset', function() {
        expect(element.variables).to.deep.equal({
          [inputKey]: {
            varA: 'variable-a',
            varB: 'variable-b',
          },
        });
      });

      describe('then nullifying inputKey', function() {
        beforeEach(function() {
          element.inputKey = null;
        });
        beforeEach(nextFrame);
        it('removes the input-key attribute', function() {
          expect(element.hasAttribute('input-key')).to.be.false;
        });
      });

      describe('then setting inputKey with the same value', function() {
        beforeEach(function() {
          element.inputKey = inputKey;
        });
        it('has no effect', function() {
          expect(element.getAttribute('input-key')).to.equal(inputKey);
        });
      });
    });

    describe('with children for variables', function() {
      let element: ApolloMutationElement;

      beforeEach(async function() {
        element = await fixture<ApolloMutationElement>(html`
          <apollo-mutation input-key="inputTypeName">
            <input data-variable="varA" value="variable-a"/>
            <input data-variable="varB" value="variable-b"/>
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

    describe('with variables as data attributes and children for variables', function() {
      let element: ApolloMutationElement;

      beforeEach(async function() {
        element = await fixture<ApolloMutationElement>(html`
          <apollo-mutation
              input-key="inputTypeName"
              data-var-a="variable-a"
              data-var-b="variable-b">
            <input data-variable="varC" value="variable-c"/>
            <input data-variable="varD" value="variable-d"/>
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
    let element: ApolloMutationElement<typeof S.NoParamMutation>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${S.NoParamMutation}">
          <button trigger>mutate</button>
        </apollo-mutation>
      `);
    });

    function clickButton() {
      element.querySelector('button')!.click();
    }

    it('has no href', function() {
      // @ts-expect-error: coverage...
      expect(element.href).to.be.undefined;
    });

    describe('clicking the button', function() {
      it('mutates', async function() {
        expect(element.data).to.not.be.ok;
        clickButton();
        await aTimeout(10);
        expect(element.data).to.be.ok;
      });

      it('fires will-mutate event', async function() {
        setTimeout(clickButton);

        const event = await oneEvent(element, WillMutateEvent.type);

        expect(event.detail.element).to.equal(element);
      });

      it('fires mutation-completed event', async function() {
        setTimeout(clickButton);

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

          clickButton();

          await aTimeout(10);

          expect(element.data).to.not.be.ok;
        });
      });
    });

    describe('when button is removed', function() {
      beforeEach(function() {
        element.querySelector('button')!.remove();
      });

      it('destroys trigger', function() {
        // @ts-expect-error: doing it for the coverage
        expect(element.buttons.length).to.equal(0);
      });
    });
  });

  describe('with a link trigger', function() {
    let element: ApolloMutationElement<typeof S.NoParamMutation>;

    let replaceStateStub: SinonStub;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${S.NoParamMutation}">
          <a href="#foo" trigger>do it.</a>
        </apollo-mutation>
      `);
      replaceStateStub = stub(history, 'replaceState');
    });

    afterEach(function() {
      replaceStateStub.restore();
      element.remove();
      // @ts-expect-error: fixture
      element = undefined;
    });

    describe('clicking the link', function() {
      it('mutates', async function() {
        expect(element.data).to.not.be.ok;
        element.querySelector<HTMLButtonElement>('[trigger]')!.click();
        await aTimeout(10);
        expect(element.data).to.be.ok;
      });

      it('fires will-mutate event', async function() {
        setTimeout(() => {
          element.querySelector<HTMLButtonElement>('[trigger]')!.click();
        });

        const event = await oneEvent(element, WillMutateEvent.type);

        expect(event.detail.element).to.equal(element);
      });

      it('fires mutation-completed event', async function() {
        setTimeout(() => {
          element.querySelector<HTMLButtonElement>('[trigger]')!.click();
        });

        const event = await oneEvent(element, MutationCompletedEvent.type);

        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
      });

      it('fires will-navigate event', async function() {
        setTimeout(() => {
          element.querySelector<HTMLButtonElement>('[trigger]')!.click();
        });

        const event = await oneEvent(element, WillNavigateEvent.type);

        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
      });

      it('navigates', async function() {
        setTimeout(() => {
          element.querySelector<HTMLButtonElement>('[trigger]')!.click();
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

          element.querySelector<HTMLButtonElement>('[trigger]')!.click();

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

          element.querySelector<HTMLButtonElement>('[trigger]')!.click();

          await aTimeout(10);

          expect(element.data).to.not.be.ok;
        });
      });
    });

    describe('clicking twice', function() {
      it('mutates', async function() {
        const link = element.querySelector('a');
        let count = 0;
        element.addEventListener(WillMutateEvent.type, function() { count++; });
        link!.click();
        link!.click();
        link!.click();
        expect(count).to.equal(1);
      });
    });
  });

  describe('with a link trigger that wraps a button', function() {
    let element: ApolloMutationElement<typeof S.NullableParamMutation>;

    let replaceStateStub: SinonStub;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${S.NullableParamMutation}">
          <a href="#foo" trigger>
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
          (data: S.NullableParamMutationData): string =>
            `/nullable/${data?.nullableParam?.nullable}/`;
        element.setAttribute('data-nullable', 'special');
      });

      beforeEach(nextFrame);

      describe('clicking the button', function() {
        beforeEach(() => spy(element.controller.client!, 'mutate'));
        afterEach(() => (element.controller.client!.mutate as SinonSpy).restore?.());
        beforeEach(async function() {
          const button = element.querySelector('button');
          button!.click();
          await aTimeout(100);
        });

        it('navigates to the resolved URL', function() {
          expect(element.controller.client!.mutate).to.have.been.calledWithMatch({
            variables: {
              nullable: 'special',
            },
          });
          expect(replaceStateStub)
            .to.have.been.calledWith(element.data, 'will-navigate', '/nullable/special/');
        });
      });
    });

    describe('clicking the link', function() {
      it('mutates', async function() {
        const button = element.querySelector('button');
        expect(element.data).to.not.be.ok;
        button!.click();
        await aTimeout(10);
        expect(element.data).to.be.ok;
      });

      it('fires will-mutate event', async function() {
        const button = element.querySelector('button');
        setTimeout(() => button!.click());

        const event = await oneEvent(element, WillMutateEvent.type);

        expect(event.detail.element).to.equal(element);
      });

      it('fires mutation-completed event', async function() {
        const button = element.querySelector('button');

        setTimeout(async function() {
          button!.click();
          expect(button!.disabled, 'button disabled').to.be.true;
        });

        const event = await oneEvent(element, MutationCompletedEvent.type);

        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
        expect(button!.disabled).to.be.false;
      });

      it('fires will-navigate event', async function() {
        const button = element.querySelector('button');
        setTimeout(() => button!.click());

        const event = await oneEvent(element, WillNavigateEvent.type);

        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
      });

      it('navigates', async function() {
        setTimeout(() => {
          element.querySelector('button')!.click();
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

          button!.click();

          await aTimeout(100);

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

          element.querySelector('button')!.click();

          await aTimeout(10);

          expect(element.data).to.not.be.ok;
        });
      });
    });
  });

  describe('with variable inputs and a button trigger', function() {
    let element: ApolloMutationElement<typeof S.NullableParamMutation>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${S.NullableParamMutation}">
          <input data-variable="nullable" value="input">
          <input data-vrible="nullable" value="fail">
          <button trigger>Do It</button>
        </apollo-mutation>
      `);
    });

    describe('clicking the button', function() {
      let input: HTMLInputElement;
      let button: HTMLButtonElement;
      let event: MutationCompletedEvent;

      beforeEach(async function() {
        input = element.querySelector('input')!;
        button = element.querySelector('button')!;

        setTimeout(async function() {
          button.click();
          expect(input.disabled, 'input disabled').to.be.true;
        });

        // @ts-expect-error: oneEvent doesn't type based on event
        event = await oneEvent(element, MutationCompletedEvent.type);
      });

      it('toggles input disabled property', async function() {
        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
        expect(input.disabled).to.be.false;
      });

      it('uses input variables', function() {
        expect(element.data!.nullableParam!.nullable).to.equal('input');
      });
    });

    describe('setting variables property', function() {
      let input: HTMLInputElement;
      let button: HTMLButtonElement;
      let event: MutationCompletedEvent;

      beforeEach(function() {
        element.variables = { nullable: 'manual' };
      });

      beforeEach(async function() {
        input = element.querySelector('input')!;
        button = element.querySelector('button')!;

        setTimeout(async function() {
          button.click();
          expect(input.disabled).to.be.true;
        });

        // @ts-expect-error: oneEvent doesn't type based on event
        event = await oneEvent(element, MutationCompletedEvent.type);
      });

      describe('clicking the button', function() {
        it('toggles input disabled property', async function() {
          expect(event.detail.element).to.equal(element);
          expect(event.detail.data).to.equal(element.data);
          expect(input.disabled).to.be.false;
        });

        it('uses set variables instead of input variables', function() {
          expect(element.data!.nullableParam!.nullable).to.equal('manual');
        });
      });
    });
  });

  describe('with variable script and a button trigger', function() {
    let element: ApolloMutationElement<typeof S.NullableParamMutation>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${S.NullableParamMutation}">
          <button trigger>Do It</button>
          <script type="application/json">
            { "nullable": "DOM" }
          </script>
        </apollo-mutation>
      `);
    });

    describe('clicking the button', function() {
      let button: HTMLButtonElement;

      beforeEach(async function() {
        button = element.querySelector('button')!;
        setTimeout(async function() {
          button.click();
        });

        await oneEvent(element, MutationCompletedEvent.type);
      });

      it('uses DOM variables', function() {
        expect(element.data!.nullableParam!.nullable).to.equal('DOM');
      });
    });

    describe('setting variables property', function() {
      let button: HTMLButtonElement;
      let event: MutationCompletedEvent;

      beforeEach(function() {
        element.variables = { nullable: 'manual' };
      });

      beforeEach(async function() {
        button = element.querySelector('button')!;
        setTimeout(async function() {
          button.click();
        });

        // @ts-expect-error: oneEvent doesn't type based on event
        event = await oneEvent(element, MutationCompletedEvent.type);
      });

      describe('clicking the button', function() {
        it('toggles input disabled property', async function() {
          expect(event.detail.element).to.equal(element);
          expect(event.detail.data).to.equal(element.data);
        });

        it('uses set variables instead of input variables', function() {
          expect(element.data!.nullableParam!.nullable).to.equal('manual');
        });
      });
    });
  });

  describe('with multiple variable inputs that trigger on change', function() {
    let element: ApolloMutationElement<typeof S.InputParamMutation>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation input-key="input" .mutation="${S.InputParamMutation}">
          <input data-variable="a" trigger="change"/>
          <input data-variable="b" trigger="change"/>
          <button trigger>Save</button>
        </apollo-mutation>
      `);
    });

    describe('typing in the first input', function() {
      let input: HTMLInputElement;
      let event: MutationCompletedEvent;
      let disabledAfterTyping: boolean;

      beforeEach(async function() {
        input = element.querySelector('input[data-variable="a"]')!;

        setTimeout(async function() {
          input.value = 'hello';
          input.dispatchEvent(new Event('change'));
          disabledAfterTyping = input.disabled;
        });

        // @ts-expect-error: oneEvent doesn't type based on event
        event = await oneEvent(element, MutationCompletedEvent.type);
      });

      it('toggles input disabled property', async function() {
        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
        expect(input.disabled).to.be.false.and.to.not.equal(disabledAfterTyping);
      });

      it('uses input variables', function() {
        expect(element.data!.inputParam!.a).to.equal('hello');
        expect(element.data!.inputParam!.b).to.equal('b');
      });
    });

    describe('typing in the second input', function() {
      let input: HTMLInputElement;
      let event: MutationCompletedEvent;
      let disabledAfterTyping: boolean;

      beforeEach(nextFrame);

      beforeEach(async function() {
        input = element.querySelector('input[data-variable="b"]')!;

        setTimeout(function() {
          input.value = 'hello';
          input.dispatchEvent(new Event('change'));
          disabledAfterTyping = input.disabled;
        });

        // @ts-expect-error: oneEvent doesn't type based on event
        event = await oneEvent(element, MutationCompletedEvent.type);
      });

      it('toggles input disabled property', async function() {
        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
        expect(input.disabled).to.be.false.and.to.not.equal(disabledAfterTyping);
      });

      it('uses input variables', function() {
        expect(element.data!.inputParam!.a).to.equal('a');
        expect(element.data!.inputParam!.b).to.equal('hello');
      });
    });

    describe('clicking the button', function() {
      let input: HTMLInputElement;
      let button: HTMLButtonElement;
      let event: MutationCompletedEvent;

      beforeEach(async function() {
        input = element.querySelector('input')!;
        button = element.querySelector('button')!;

        setTimeout(async function() {
          button.click();
          expect(input.disabled).to.be.true;
        });

        // @ts-expect-error: oneEvent doesn't type based on event
        event = await oneEvent(element, MutationCompletedEvent.type);
      });

      it('toggles input disabled property', async function() {
        expect(event.detail.element).to.equal(element);
        expect(event.detail.data).to.equal(element.data);
        expect(input.disabled).to.be.false;
      });

      it('uses input variables', function() {
        expect(element.data!.inputParam!.a).to.equal('a');
        expect(element.data!.inputParam!.b).to.equal('b');
      });
    });
  });

  describe('with multiple variable inputs that trigger on keyup', function() {
    let element: ApolloMutationElement<typeof S.InputParamMutation>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation input-key="input" .mutation="${S.InputParamMutation}">
          <input data-variable="a" trigger="keyup"/>
          <input data-variable="b" trigger="keyup"/>
        </apollo-mutation>
      `);
    });

    describe('setting debounce to 500', function() {
      beforeEach(() => spy(element.controller, 'mutate'));
      afterEach(() => (element.controller.mutate as SinonSpy).restore?.());

      beforeEach(function() {
        element.debounce = 500;
      });

      beforeEach(nextFrame);

      it('reflects to attr', function() {
        expect(element.getAttribute('debounce')).to.equal('500');
      });

      describe('then typing in first input', function() {
        beforeEach(async function() {
          const input = element.querySelector('input')!;
          input.dispatchEvent(new Event('keyup'));
          await nextFrame();
          input.dispatchEvent(new Event('keyup'));
          await nextFrame();
          input.dispatchEvent(new Event('keyup'));
          await nextFrame();
          input.dispatchEvent(new Event('keyup'));
          await nextFrame();
          input.dispatchEvent(new Event('keyup'));
          await nextFrame();
          input.dispatchEvent(new Event('keyup'));
          await nextFrame();
          input.dispatchEvent(new Event('keyup'));
        });

        beforeEach(() => aTimeout(1000));

        it('only mutates once', function() {
          expect(element.controller.mutate).to.have.been.calledOnce;
        });
      });

      describe('then removing attribute', function() {
        beforeEach(function() {
          element.removeAttribute('debounce');
        });

        beforeEach(nextFrame);

        it('unsets property', function() {
          expect(element.debounce).to.be.null;
        });

        describe('then typing in first input', function() {
          beforeEach(async function() {
            const input = element.querySelector('input')!;
            input.dispatchEvent(new Event('keyup'));
            await nextFrame();
            input.dispatchEvent(new Event('keyup'));
            await nextFrame();
            input.dispatchEvent(new Event('keyup'));
            await nextFrame();
            input.dispatchEvent(new Event('keyup'));
            await nextFrame();
            input.dispatchEvent(new Event('keyup'));
            await nextFrame();
            input.dispatchEvent(new Event('keyup'));
            await nextFrame();
            input.dispatchEvent(new Event('keyup'));
          });

          beforeEach(() => aTimeout(1000));

          it('mutates many times', function() {
            expect((element.controller.mutate as SinonSpy).callCount).to.be.greaterThan(1);
          });
        });
      });
    });
  });

  describe('when mutation errors', function() {
    let element: ApolloMutationElement<typeof S.NullableParamMutation>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${S.NullableParamMutation}" data-nullable="error">
          <button trigger>Do It</button>
        </apollo-mutation>
      `);
    });

    describe('clicking the button', function() {
      it('fires mutation-error event', async function() {
        setTimeout(() => element.querySelector('button')!.click());
        const event = await oneEvent(element, MutationErrorEvent.type);
        expect(event.detail.element).to.equal(element);
        expect(event.detail.error).to.be.an.instanceOf(ApolloError);
      });
    });
  });

  describe('with a template and a mutation', function() {
    let element: ApolloMutationElement<typeof S.NoParamMutation>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${S.NoParamMutation}">
          <button trigger>mutate</button>
          <template>
            <span class="{{ data.noParam.noParam || 'no-data' }}"></span>
          </template>
        </apollo-mutation>
      `);
    });

    describe('before mutating', function() {
      it('renders null data to shadow root', function() {
        expect(element).shadowDom.to.equal('<span class="no-data"></span>');
      });
    });

    describe('after mutating', function() {
      beforeEach(async function() {
        setTimeout(function() {
          element.querySelector('button')!.click();
        });
        await oneEvent(element, 'mutation-completed');
      });
      it('renders data to shadow root', function() {
        expect(element).shadowDom.to.equal('<span class="noParam"></span>');
      });
    });
  });

  describe('with no-shadow attribute set, a template, and a mutation', function() {
    let element: ApolloMutationElement<typeof S.NoParamMutation>;

    beforeEach(async function() {
      element = fixtureSync<typeof element>(html`
        <apollo-mutation no-shadow .mutation="${S.NoParamMutation}">
          <button id="trigger" trigger>mutate</button>
          <template>
            <span class="{{ data.noParam.noParam || 'no-data' }}"></span>
          </template>
        </apollo-mutation>
      `);
    });

    describe('before mutating', function() {
      it('renders null data to light children', function() {
        expect(element.shadowRoot).to.be.null;
        expect(element).lightDom.to.equal(`
          <button id="trigger" trigger>mutate</button>
          <template></template>
          <div class="output">
            <span class="no-data"></span>
          </div>
        `);
      });
    });

    describe('after mutating', function() {
      beforeEach(async function() {
        setTimeout(function() {
          element.querySelector('button')!.click();
        });
        await oneEvent(element, 'mutation-completed');
      });
      it('renders data to shadow root', function() {
        expect(element).lightDom.to.equal(`
          <button id="trigger" trigger>mutate</button>
          <template></template>
          <div class="output">
            <span class="noParam"></span>
          </div>
        `);
      });
    });

    describe('when cheekily moving the trigger', function() {
      let movedTrigger: HTMLButtonElement;
      let newTrigger: HTMLButtonElement;

      beforeEach(() => spy(element.controller, 'mutate'));
      afterEach(() => (element.controller.mutate as SinonSpy).restore?.());

      beforeEach(function() {
        const node = document.createElement('div');
        movedTrigger = element.querySelector('[trigger]')!;
        node.classList.add('haha');
        document.body.append(node);
        node.append(movedTrigger);
      });

      beforeEach(nextFrame);

      afterEach(function() {
        document.querySelector('haha')?.remove?.();
      });

      describe('then clicking the moved trigger', function() {
        beforeEach(nextFrame);

        beforeEach(function() {
          movedTrigger.click();
        });
        it('does not mutate', function() {
          expect(element.controller.mutate).to.not.have.been.called;
        });
      });

      describe('then adding a new trigger', function() {
        beforeEach(function() {
          newTrigger = document.createElement('button');
          newTrigger.id = 'new-trigger';
          newTrigger.setAttribute('trigger', '');
          element.appendChild(newTrigger);
        });

        beforeEach(nextFrame);

        describe('when clicking the new trigger', function() {
          beforeEach(function() {
            newTrigger.click();
          });
          beforeEach(nextFrame);
          it('mutates', function() {
            expect(element.controller.mutate).to.have.been.called;
          });
        });
      });
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };

function TypeCheck() {
  const el = new ApolloMutationElement<TypeCheckData, TypeCheckVars>();
  /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

  assertType<HTMLElement>                         (el);

  // ApolloElementInterface
  assertType<ApolloClient<NormalizedCacheObject>|null>  (el.client);
  assertType<Record<string, unknown>|undefined>         (el.context);
  assertType<boolean>                                   (el.loading);
  assertType<DocumentNode|null>                         (el.document);
  assertType<ApolloError|Error|null>                    (el.error);
  assertType<readonly GraphQLError[]|null>              (el.errors);
  assertType<TypeCheckData>                             (el.data!);
  assertType<string>                                    (el.error!.message);
  assertType<'a'>                                       (el.data.a);
  // @ts-expect-error: b as number type
  assertType<'a'>                                       (el.data.b);
  if (isApolloError(el.error!))
    assertType<readonly GraphQLError[]>                 (el.error.graphQLErrors);

  // ApolloMutationInterface
  assertType<DocumentNode>                              (el.mutation!);
  assertType<TypeCheckVars>                             (el.variables!);
  assertType<boolean>                                   (el.called);
  assertType<boolean>                                   (el.ignoreResults!);
  assertType<boolean>                                   (el.awaitRefetchQueries!);
  assertType<ErrorPolicy>                               (el.errorPolicy!);
  assertType<string>                                    (el.errorPolicy!);
  // @ts-expect-error: ErrorPolicy is not a number
  assertType<number>                                    (el.errorPolicy!);
  assertType<string>                                    (el.fetchPolicy!);
  assertType<Extract<FetchPolicy, 'no-cache'>|undefined>(el.fetchPolicy);

  if (typeof el.refetchQueries === 'function')
    assertType<(result: FetchResult<TypeCheckData>) => RefetchQueryDescription>(el.refetchQueries);
  else
    assertType<RefetchQueryDescription|null|undefined>(el.refetchQueries);

  if (typeof el.optimisticResponse !== 'function')
    assertType<TypeCheckData|undefined>(el.optimisticResponse);
  else
    assertType<OptimisticResponseType<TypeCheckData, TypeCheckVars>>(el.optimisticResponse);

  /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
}
