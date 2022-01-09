import type * as I from '@apollo-elements/core/types';

import { aTimeout, fixture, expect, oneEvent, nextFrame, defineCE } from '@open-wc/testing';

import { setupClient, teardownClient } from '@apollo-elements/test/client';

import {
  describeSubscription,
  setupSubscriptionClass,
} from '@apollo-elements/test/subscription.test';

import { PolymerApolloSubscription } from './polymer-apollo-subscription';
import { GraphQLError } from 'graphql';
import { stringify, TestableElement } from '@apollo-elements/test';
import { html, PolymerElement } from '@polymer/polymer';

import * as S from '@apollo-elements/test/schema';

import './polymer-apollo-subscription';

class TestableApolloSubscription<D, V = I.VariablesOf<D>>
  extends PolymerApolloSubscription<D, V>
  implements TestableElement {
  declare shadowRoot: ShadowRoot;

  static get template() {
    const template = document.createElement('template');
    template.innerHTML = /* html */`
      <output id="data"></output>
      <output id="error"></output>
      <output id="loading"></output>
    `;
    return template;
  }

  $(id: keyof this) { return this.shadowRoot.getElementById(id as string); }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(TestableApolloSubscription.template.content.cloneNode(true));
    this.addEventListener('data-changed', this.render);
    this.addEventListener('error-changed', this.render);
    this.addEventListener('loading-changed', this.render);
  }

  render() {
    this.$('data')!.textContent = stringify(this.data);
    this.$('error')!.textContent = stringify(this.error);
    this.$('loading')!.textContent = stringify(this.loading);
  }

  async hasRendered() {
    await nextFrame();
    return this;
  }
}

describe('[polymer] <polymer-apollo-subscription>', function() {
  describeSubscription({
    class: TestableApolloSubscription,
    setupFunction: setupSubscriptionClass(TestableApolloSubscription),
  });

  describe('notifying properties', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);
    let element: PolymerApolloSubscription;

    beforeEach(async function() {
      element = await fixture<typeof element>(`<polymer-apollo-subscription></polymer-apollo-subscription>`);
    });

    it('notifies on data change', async function() {
      const data = { messages: ['hi'] };
      setTimeout(() => element.data = data);
      const { detail: { value } } = await oneEvent(element, 'data-changed');
      expect(value).to.deep.equal(data);
    });

    it('notifies on error change', async function() {
      let err: Error;
      try {
        throw new Error('error');
      } catch (e) { err = e as Error; }
      setTimeout(() => element.error = err);
      const { detail: { value } } = await oneEvent(element, 'error-changed');
      expect(value).to.equal(err);
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

    describe('when used in a Polymer template', function() {
      let wrapper: WrapperElement;
      class WrapperElement extends PolymerElement {
        declare shadowRoot: ShadowRoot;

        static get properties() {
          return {
            subscription: {
              type: Object,
              value: () => S.NullableParamSubscription,
            },
            variables: {
              type: Object,
              value: () => ({ nullable: '🤡' }),
            },
          };
        }

        static get template() {
          return html`
          <polymer-apollo-subscription
              subscription="[[subscription]]"
              variables="[[variables]]"
              data="{{data}}"
          ></polymer-apollo-subscription>

          <output>[[data.nullableParam.nullable]]</output>
        `;
        }
      }

      beforeEach(async function() {
        const tag = defineCE(WrapperElement);
        wrapper = await fixture<WrapperElement>(`<${tag}></${tag}>`);
      });

      beforeEach(() => aTimeout(50));

      it('binds data up into parent component', async function() {
        expect(wrapper.shadowRoot.textContent).to.contain('🤡');
      });
    });
  });
});
