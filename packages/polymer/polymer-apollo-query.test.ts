import type * as I from '@apollo-elements/core/types';

import { gql } from '@apollo/client';

import { GraphQLError } from 'graphql/error/GraphQLError';

import { fixture, expect, oneEvent, defineCE, nextFrame } from '@open-wc/testing';
import { stub } from 'sinon';

import { setupClient, stringify, teardownClient, TestableElement } from '@apollo-elements/test';

import './polymer-apollo-query';

import { PolymerApolloQuery } from './polymer-apollo-query';

import { PolymerElement, html } from '@polymer/polymer';

import * as S from '@apollo-elements/test/schema';

import { describeQuery, setupQueryClass } from '@apollo-elements/test/query.test';

class TestableApolloQuery<D = unknown, V = I.VariablesOf<D>>
  extends PolymerApolloQuery<D, V>
  implements TestableElement {
  declare shadowRoot: ShadowRoot;

  static get template() {
    const template = document.createElement('template');
    template.innerHTML = /* html */`
      <output id="data"></output>
      <output id="error"></output>
      <output id="errors"></output>
      <output id="loading"></output>
      <output id="networkStatus"></output>
    `;
    return template;
  }

  $(id: string) { return this.shadowRoot.getElementById(id); }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(TestableApolloQuery.template.content.cloneNode(true));
    this.addEventListener('data-changed', this.render);
    this.addEventListener('error-changed', this.render);
    this.addEventListener('errors-changed', this.render);
    this.addEventListener('loading-changed', this.render);
    this.addEventListener('network-status-changed', this.render);
  }

  render() {
    this.$('data')!.textContent = stringify(this.data);
    this.$('error')!.textContent = stringify(this.error);
    this.$('errors')!.textContent = stringify(this.errors);
    this.$('loading')!.textContent = stringify(this.loading);
    this.$('networkStatus')!.textContent = stringify(this.networkStatus);
  }

  async hasRendered() {
    await nextFrame();
    return this;
  }
}

describe('[polymer] <polymer-apollo-query>', function() {
  describeQuery({
    setupFunction: setupQueryClass(TestableApolloQuery),
    class: TestableApolloQuery,
  });

  describe('notify events', function() {
    let element: PolymerApolloQuery;
    beforeEach(setupClient);
    afterEach(teardownClient);

    beforeEach(async function() {
      element = await fixture<typeof element>(`<polymer-apollo-query></polymer-apollo-query>`);
    });

    it('notifies on data change', async function() {
      const queryStub = stub(element.client, 'query');

      queryStub.resolves({
        data: { messages: ['hi'] },
      });

      const query = gql`query { messages }`;

      setTimeout(() => element.executeQuery({ query }));
      const { detail: { value } } = await oneEvent(element, 'data-changed');
      expect(value).to.deep.equal({ messages: ['hi'] });
      queryStub.restore();
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
            query: {
              type: Object,
              value: () => S.NullableParamQuery,
            },
            variables: {
              type: Object,
              value: () => ({ nullable: '🤡' }),
            },
          };
        }

        static get template() {
          return html`
          <polymer-apollo-query
              query="[[query]]"
              variables="[[variables]]"
              data="{{data}}"
          ></polymer-apollo-query>

          <output>[[data.nullableParam.nullable]]</output>
        `;
        }
      }

      beforeEach(async function() {
        const tag = defineCE(WrapperElement);
        wrapper = await fixture<WrapperElement>(`<${tag}></${tag}>`);
      });

      it('binds data up into parent component', async function() {
        expect(wrapper.shadowRoot.textContent).to.contain('🤡');
      });
    });
  });
});
