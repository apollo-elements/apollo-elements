import type {
  ApolloClient,
  ApolloError,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import * as S from '@apollo-elements/test/schema';

import { gql } from '@apollo/client/core';
import { html } from 'haunted';
import { useMutation } from './useMutation';
import { component } from 'haunted';

import { assertType } from '@apollo-elements/test';

import { aTimeout, defineCE, expect, fixture } from '@open-wc/testing';

import { setupClient, teardownClient } from '@apollo-elements/test';

describe('[haunted] useMutation', function() {
  describe('README usage', function() {
    describe('with global client', function() {
      beforeEach(setupClient);

      afterEach(teardownClient);

      describe('with UpdateUser mutation', function() {
        let element: HTMLElement;

        beforeEach(async function define() {
          function UpdateUser() {
            let username: string;

            let haircolor: string;

            const [updateUser, { data }] = useMutation(S.UpdateUserMutation);

            return html`
              <label> Name
                <input type="text" @input="${(e: InputEvent & { target: HTMLInputElement }) => username = e.target.value}"/>
              </label>

              <label> Hair Colour
                <select @input="${(e: InputEvent & { target: HTMLSelectElement }) => haircolor = e.target!.value}">
                  <option>Black</option>
                  <option>Brown</option>
                  <option>Auburn</option>
                  <option>Red</option>
                  <option>Blond</option>
                  <option>Tutti Fruiti</option>
                </select>
              </label>

              <button id="button"
                  @click="${() => updateUser({ variables: { username, haircolor } })}">
                Save
              </button>

              <output id="output">We'll call you ${data?.updateUser?.nickname ?? 'nothing'}!</output>
            `;
          }

          const tag = defineCE(component(UpdateUser));

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(function() {
          expect(element.shadowRoot!.getElementById('output')!.textContent)
            .to.equal('We\'ll call you nothing!');
        });

        beforeEach(function() {
          element.shadowRoot!.querySelector('input')!.value = 'Jackson';
          element.shadowRoot!.querySelector('input')!.dispatchEvent(new Event('input'));
          element.shadowRoot!.querySelector('select')!.selectedIndex = 4;
          element.shadowRoot!.querySelector('select')!.dispatchEvent(new Event('input'));
          element.shadowRoot!.getElementById('button')!.click();
        });

        beforeEach(() => aTimeout(70));

        it('mutates', function() {
          expect(element.shadowRoot!.getElementById('output')!.textContent)
            .to.equal('We\'ll call you Blond Jackson!');
        });

        describe('then changing the variables', function() {
          beforeEach(function() {
            element.shadowRoot!.querySelector('input')!.value = 'Rover';
            element.shadowRoot!.querySelector('input')!.dispatchEvent(new Event('input'));
            element.shadowRoot!.querySelector('select')!.selectedIndex = 3;
            element.shadowRoot!.querySelector('select')!.dispatchEvent(new Event('input'));
            element.shadowRoot!.getElementById('button')!.click();
          });

          beforeEach(() => aTimeout(100));

          it('mutates again', function() {
            expect(element.shadowRoot!.getElementById('output')!.textContent)
              .to.equal('We\'ll call you Red Rover!');
          });
        });
      });
    });
  });
});

type TypeCheckData = { a: 'a'; b: number };
type TypeCheckVars = { c: 'c'; d: number };

const TDN: TypedDocumentNode<TypeCheckData, TypeCheckVars> =
  gql`query TypedQuery($c: String, $d: Int) { a b }`;

function TDNTypeCheck() {
  const [mutate, { called, client, data, error, loading }] = useMutation(TDN);
  assertType<TypeCheckData>(data!);
  assertType<boolean>(called);
  assertType<boolean>(loading);
  assertType<ApolloClient<NormalizedCacheObject>>(client!);
  assertType<Error|ApolloError>(error!);

  (async function() {
    const r = await mutate({ variables: { c: 'c', d: 12 } });
    assertType<TypeCheckData>(r!.data!);
  });
}
TDNTypeCheck;
