import type {
  NoParamMutationData,
  NoParamMutationVariables,
  InputParamMutationData,
  InputParamMutationVariables,
  NullableParamMutationData,
  NullableParamMutationVariables,
} from '@apollo-elements/test-helpers';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import type { GraphQLError } from '@apollo-elements/interfaces';

import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client/core';

import { ApolloError } from '@apollo/client/core';

import {
  aTimeout,
  expect,
  fixture,
  fixtureSync,
  nextFrame,
  oneEvent,
} from '@open-wc/testing';

import { sendKeys } from '@web/test-runner-commands';


import { html } from 'lit-html';

import { spy, SinonSpy, stub, SinonStub } from 'sinon';

import 'sinon-chai';

import {
  assertType,
  isApolloError,
  setupClient,
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

import InputParamMutation from '@apollo-elements/test-helpers/graphql/InputParam.mutation.graphql';
import NoParamMutation from '@apollo-elements/test-helpers/graphql/NoParam.mutation.graphql';
import NullableParamMutation from '@apollo-elements/test-helpers/graphql/NullableParam.mutation.graphql';
import { OptimisticResponseType } from '@apollo-elements/interfaces';

describe('[components] <apollo-mutation>', function describeApolloMutation() {
  beforeEach(setupClient);

  afterEach(teardownClient);

  describe('with no variables in DOM', function() {
    let element: ApolloMutationElement<unknown, unknown>;

    beforeEach(async function() {
      element = await fixture<ApolloMutationElement<unknown, unknown>>(html`
        <apollo-mutation></apollo-mutation>
      `);
    });

    it('does not set variables', function() {
      expect(element.variables).to.be.null;
    });
  });

  describe('with variables as data attributes', function() {
    let element: ApolloMutationElement<unknown, unknown>;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement<unknown, unknown>>(html`
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

    describe('setting inputKey', function() {
      const inputKey = 'inputTypeName';
      beforeEach(function() {
        element.inputKey = inputKey;
      });

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
        it('unsets inputKey', function() {
          expect(element.inputKey).to.be.null;
        });
      });

      describe('then setting input-key attribute with the same value', function() {
        beforeEach(function() {
          element.setAttribute('input-key', inputKey);
        });
        it('has no effect', function() {
          expect(element.inputKey).to.equal(inputKey);
        });
      });
    });
  });

  describe('with children for variables', function() {
    let element: ApolloMutationElement<unknown, unknown>;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement<unknown, unknown>>(html`
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
    let element: ApolloMutationElement<unknown, unknown>;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement<unknown, unknown>>(html`
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

  describe('with single input variable', function() {
    let element: ApolloMutationElement<unknown, unknown>;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement<unknown, unknown>>(html`
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
    let element: ApolloMutationElement<unknown, unknown>;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement<unknown, unknown>>(html`
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
    let element: ApolloMutationElement<unknown, unknown>;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement<unknown, unknown>>(html`
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
    let element: ApolloMutationElement<unknown, unknown>;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement<unknown, unknown>>(html`
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
    let element: ApolloMutationElement<unknown, unknown>;

    beforeEach(async function() {
      element = fixtureSync<ApolloMutationElement<unknown, unknown>>(html`
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
      let element: ApolloMutationElement<unknown, unknown>;
      const inputKey = 'inputTypeName';

      beforeEach(async function() {
        element = fixtureSync<ApolloMutationElement<unknown, unknown>>(html`
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
      let element: ApolloMutationElement<unknown, unknown>;

      beforeEach(async function() {
        element = await fixture<ApolloMutationElement<unknown, unknown>>(html`
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
      let element: ApolloMutationElement<unknown, unknown>;

      beforeEach(async function() {
        element = await fixture<ApolloMutationElement<unknown, unknown>>(html`
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
    let element: ApolloMutationElement<NoParamMutationData, NoParamMutationVariables>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${NoParamMutation}">
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
        expect(element.data).to.be.null;
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

          expect(element.data).to.be.null;
        });
      });
    });

    describe('when button is removed', function() {
      beforeEach(function() {
        element.querySelector('button')!.remove();
      });

      it('destroys trigger', function() {
        // @ts-expect-error: coverage...
        expect(element.button).to.be.null;
      });
    });
  });

  describe('with a link trigger', function() {
    let element: ApolloMutationElement<NoParamMutationData, NoParamMutationVariables>;

    let replaceStateStub: SinonStub;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${NoParamMutation}">
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
        expect(element.data).to.be.null;
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

          expect(element.data).to.be.null;
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
    let element: ApolloMutationElement<NullableParamMutationData, NullableParamMutationVariables>;

    let replaceStateStub: SinonStub;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${NullableParamMutation}">
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
          ({ nullableParam }: NullableParamMutationData): string => `/nullable/${nullableParam!.nullable}/`;
        element.setAttribute('data-nullable', 'special');
      });

      describe('clicking the button', function() {
        beforeEach(async function() {
          const button = element.querySelector('button');
          button!.click();
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
          expect(button!.disabled).to.be.true;
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

          element.querySelector('button')!.click();

          await aTimeout(10);

          expect(element.data).to.be.null;
        });
      });
    });
  });

  describe('with variable inputs and a button trigger', function() {
    let element: ApolloMutationElement<NullableParamMutationData, NullableParamMutationVariables>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${NullableParamMutation}">
          <input data-variable="nullable" value="input">
          <input data-vrible="nullable" value="fail">
          <button trigger>Do It</button>
        </apollo-mutation>
      `);
    });

    describe('clicking the button', function() {
      let input: HTMLInputElement;
      let button: HTMLButtonElement;
      let event: MutationCompletedEvent<typeof element>;

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
        expect(element.data!.nullableParam!.nullable).to.equal('input');
      });
    });

    describe('setting variables property', function() {
      let input: HTMLInputElement;
      let button: HTMLButtonElement;
      let event: MutationCompletedEvent<typeof element>;

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
    let element: ApolloMutationElement<NullableParamMutationData, NullableParamMutationVariables>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${NullableParamMutation}">
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
      let event: MutationCompletedEvent<typeof element>;

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
    let element: ApolloMutationElement<InputParamMutationData, InputParamMutationVariables>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation input-key="input" .mutation="${InputParamMutation}">
          <input data-variable="a" value="a" trigger="change"/>
          <input data-variable="b" value="b" trigger="change"/>
          <button trigger>Save</button>
        </apollo-mutation>
      `);
    });

    describe('typing in the first input', function() {
      let input: HTMLInputElement;
      let button: HTMLButtonElement;
      let event: MutationCompletedEvent<typeof element>;

      beforeEach(async function() {
        input = element.querySelector('input[data-variable="a"]')!;
        setTimeout(async function() {
          input.focus();
          sendKeys({ type: 'hello' });
          input.blur();
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
        expect(element.data!.inputParam!.a).to.equal('hello');
        expect(element.data!.inputParam!.b).to.equal('input');
      });
    });

    describe('typing in the second input', function() {
      let input: HTMLInputElement;
      let button: HTMLButtonElement;
      let event: MutationCompletedEvent<typeof element>;

      beforeEach(async function() {
        input = element.querySelector('input[data-variable="b"]')!;
        setTimeout(async function() {
          input.focus();
          sendKeys({ type: 'hello' });
          input.blur();
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
        expect(element.data!.inputParam!.a).to.equal('input');
        expect(element.data!.inputParam!.b).to.equal('hello');
      });
    });

    describe('clicking the button', function() {
      let input: HTMLInputElement;
      let button: HTMLButtonElement;
      let event: MutationCompletedEvent<typeof element>;

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
        expect(element.data!.inputParam!.a).to.equal('input');
        expect(element.data!.inputParam!.b).to.equal('input');
      });
    });
  });

  describe('when mutation errors', function() {
    let element: ApolloMutationElement<NullableParamMutationData, NullableParamMutationVariables>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${NullableParamMutation}" data-nullable="error">
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
    let element: ApolloMutationElement<NoParamMutationData, NoParamMutationVariables>;

    beforeEach(async function() {
      element = await fixture<typeof element>(html`
        <apollo-mutation .mutation="${NoParamMutation}">
          <button trigger>mutate</button>
          <template>
            <span class="{{ data.noParam.noParam || 'no-data' }}"></span>
          </template>
        </apollo-mutation>
      `);
    });

    describe('before mutating', function() {
      it('renders null data to shadow root', function() {
        expect(element.shadowRoot).to.be.an.instanceof(ShadowRoot);
        expect(element.$('.noParam')).to.not.be.ok;
        expect(element.$('.no-data')).to.be.ok;
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
        expect(element.shadowRoot).to.be.an.instanceof(ShadowRoot);
        expect(element.$('.noParam')).to.be.ok;
        expect(element.$('.no-data')).to.not.be.ok;
      });
    });
  });

  describe('with no-shadow attribute set, a template, and a mutation', function() {
    let element: ApolloMutationElement<NoParamMutationData, NoParamMutationVariables>;

    beforeEach(async function() {
      element = fixtureSync<typeof element>(html`
        <apollo-mutation no-shadow .mutation="${NoParamMutation}">
          <button trigger>mutate</button>
          <template>
            <span class="{{ data.noParam.noParam || 'no-data' }}"></span>
          </template>
        </apollo-mutation>
      `);
    });

    describe('before mutating', function() {
      it('renders null data to light children', function() {
        expect(element.shadowRoot).to.be.null;
        expect(element.querySelector('.output')).to.be.ok;
        expect(element.$('.noParam')).to.not.be.ok;
        expect(element.$('.no-data')).to.be.ok;
        expect(
          element.querySelector('.output')!.contains(element.$('.no-data'))
        ).to.be.true;
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
        expect(element.querySelector('.noParam')).to.be.ok;
        expect(element.querySelector('.no-data')).to.not.be.ok;
      });
    });

    describe('then cheekily moving the trigger', function() {
      let onClickSpy: SinonSpy;
      let movedTrigger: HTMLButtonElement;
      let newTrigger: HTMLButtonElement;

      beforeEach(function() {
        const node = document.createElement('div');
        movedTrigger = element.querySelector('[trigger]')!;
        node.classList.add('haha');
        document.body.append(node);
        node.append(movedTrigger);
        onClickSpy = spy(element, 'onClick' as keyof typeof element);
      });

      afterEach(function() {
        document.querySelector('haha')?.remove?.();
        onClickSpy.restore?.();
      });

      describe('when clicking the moved trigger', function() {
        beforeEach(function() {
          movedTrigger.click();
        });
        it('does not mutate', function() {
          expect(onClickSpy).to.not.have.been.called;
        });
      });

      describe('then adding a new trigger', function() {
        beforeEach(function() {
          newTrigger = document.createElement('button');
          newTrigger.setAttribute('trigger', '');
          element.appendChild(newTrigger);
        });

        describe('when clicking the new trigger', function() {
          beforeEach(nextFrame);
          beforeEach(function() {
            newTrigger.click();
          });
          it('mutates', function() {
            expect(onClickSpy).to.have.been.called;
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
