import type {
  ApolloClient,
  ApolloError,
  FetchResult,
  MutationOptions,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import * as S from '@apollo-elements/test/schema';

import { gql } from '@apollo/client/core';
import { html } from 'atomico';
import { useMutation } from './useMutation';
import { c, useEffect, useState } from 'atomico';

import { assertType } from '@apollo-elements/test';

import { defineCE, expect } from '@open-wc/testing';
import { fixture } from 'atomico/test-dom';

import { setupClient, teardownClient } from '@apollo-elements/test';

describe('[atomico] useMutation', function() {
  describe('README usage', function() {
    describe('with global client', function() {
      beforeEach(setupClient);

      afterEach(teardownClient);

      describe('with UpdateUser mutation', function() {
        let element: HTMLElement & { updated: Promise<void> };

        let mutateFn: (
          params?: Partial<MutationOptions<S.UpdateUserMutationData,
          S.UpdateUserMutationVariables>>
        ) =>
          Promise<FetchResult<S.UpdateUserMutationData>>;

        let variables: S.UpdateUserMutationVariables;

        type IEventFrom<T> = InputEvent & { target: T};

        beforeEach(function define() {
          function Renderer() {
            const [username, setUsername] = useState('');

            const [haircolor, setHaircolor] = useState('');

            const [updateUser, { data }] = useMutation(S.UpdateUserMutation);

            useEffect(() => { mutateFn = updateUser; }, [updateUser]);
            useEffect(() => { variables = { username, haircolor }; }, [username, haircolor]);

            return html`
              <host shadowDom>
                <label> Name
                  <input type="text" oninput=${(e: IEventFrom<HTMLInputElement>) => setUsername(e.target.value)}/>
                </label>

                <label> Hair Colour
                  <select oninput=${(e: IEventFrom<HTMLSelectElement>) => setHaircolor(e.target.value)}>
                    <option value="Black">Black</option>
                    <option value="Brown">Brown</option>
                    <option value="Auburn">Auburn</option>
                    <option value="Red">Red</option>
                    <option value="Blond">Blond</option>
                    <option value="Tutti Fruiti">Tutti Fruiti</option>
                  </select>
                </label>

                <output id="output">We'll call you ${data?.updateUser?.nickname ?? 'nothing'}!</output>
              </host>
            `;
          }

          const Component = defineCE(c(Renderer as any));
          element = fixture(html`<${Component}></${Component}>`);
        });

        beforeEach(() => element.updated);

        it('renders initial state', function() {
          expect(element.shadowRoot!.getElementById('output')!.textContent)
            .to.equal('We\'ll call you nothing!');
        });

        describe('mutating', function() {
          beforeEach(async function() {
            element.shadowRoot!.querySelector('input')!.value = 'Jackson';
            element.shadowRoot!.querySelector('input')!.dispatchEvent(new Event('input'));
            element.shadowRoot!.querySelector('select')!.selectedIndex = 4;
            element.shadowRoot!.querySelector('select')!.dispatchEvent(new Event('input'));
            await element.updated;
            await mutateFn({ variables });
          });

          it('mutates', function() {
            expect(element.shadowRoot!.getElementById('output')!.textContent)
              .to.equal('We\'ll call you Blond Jackson!');
          });

          describe('then changing the variables', function() {
            beforeEach(async function() {
              element.shadowRoot!.querySelector('input')!.value = 'Rover';
              element.shadowRoot!.querySelector('input')!.dispatchEvent(new Event('input'));
              element.shadowRoot!.querySelector('select')!.selectedIndex = 3;
              element.shadowRoot!.querySelector('select')!.dispatchEvent(new Event('input'));
              await element.updated;
              await mutateFn({ variables });
            });

            it('mutates again', function() {
              expect(element.shadowRoot!.getElementById('output')!.textContent)
                .to.equal('We\'ll call you Red Rover!');
            });
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
