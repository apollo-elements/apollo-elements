import { html } from 'haunted';
import { useMutation } from './useMutation';
import { component } from 'haunted';

import { Entries, SetupOptions, setupSpies, setupStubs } from '@apollo-elements/test-helpers';

import UpdateUserMutation from '@apollo-elements/test-helpers/graphql/UpdateUser.mutation.graphql';

import { aTimeout, defineCE, expect, fixture } from '@open-wc/testing';

import { setupClient, teardownClient } from '@apollo-elements/test-helpers';
import { describeMutation, MutationElement } from '@apollo-elements/test-helpers/mutation.test';

import type {
  UpdateUserMutationData,
  UpdateUserMutationVariables,
} from '@apollo-elements/test-helpers/schema';

import { ApolloMutationElement } from '@apollo-elements/interfaces';
import { DocumentNode } from 'graphql';

describe('[haunted] useMutation', function() {
  const ccOrig = ApolloMutationElement.prototype.connectedCallback;

  afterEach(function() {
    ApolloMutationElement.prototype.connectedCallback = ccOrig;
  });

  describeMutation({
    async setupFunction<T extends MutationElement<any, any>>(opts?: SetupOptions<T>) {
      const { innerHTML = '', attributes } = opts ?? {};

      const properties:
        Partial<T> =
        (opts?.properties ?? {} as Partial<T>);

      ApolloMutationElement.prototype.connectedCallback = function() {
        // @ts-expect-error: whatever man it's a test file
        this.stringify = (x: unknown) => JSON.stringify(x, null, 2);

        // @ts-expect-error: whatever man it's a test file
        this.hasRendered = async function(this: ApolloMutationElement) {
          await aTimeout(50);
          return this;
        };

        ccOrig.call(this);
      };

      const {
        awaitRefetchQueries,
        client,
        context,
        ignoreResults,
        mutation,
        optimisticResponse,
        refetchQueries,
        variables,
        onCompleted,
        onError,
        updater: update,
        ...props
      } = properties;

      function Mutation<T extends MutationElement>(this: T) {
        const [, { called, loading, data, error }] = useMutation(null as unknown as DocumentNode, {
          awaitRefetchQueries,
          // @ts-expect-error: just for the interface
          client,
          context,
          ignoreResults,
          mutation,
          optimisticResponse,
          // @ts-expect-error: just for the interface
          refetchQueries,
          variables,
          onCompleted,
          onError,
          update,
        });

        return html`
          <output id="called">${this.stringify(called)}</output>
          <output id="data">${this.stringify(data)}</output>
          <output id="error">${this.stringify(error)}</output>
          <output id="errors">${this.stringify(this.errors)}</output>
          <output id="loading">${this.stringify(loading)}</output>
        `;
      }

      const klass = component<MutationElement>(Mutation);

      const tag = defineCE(klass);

      const attrs = attributes ? ` ${attributes}` : '';

      const element = await fixture<T>(`<${tag}${attrs}>${innerHTML}</${tag}>`);

      const spies = setupSpies(opts?.spy, element);
      const stubs = setupStubs(opts?.stub, element);

      for (const [key, val] of Object.entries(props ?? {}) as Entries<T>)
        element[key] = val;

      return { element, spies, stubs };
    },

  });

  describe('README usage', function() {
    describe('with global client', function() {
      beforeEach(setupClient);

      afterEach(teardownClient);

      describe('with UpdateUser mutation', function() {
        let element: MutationElement<UpdateUserMutationData, UpdateUserMutationVariables>;

        beforeEach(async function define() {
          function UpdateUser() {
            let username: string;

            let haircolor: string;

            const [updateUser, { data }] =
              useMutation<UpdateUserMutationData, UpdateUserMutationVariables>(UpdateUserMutation);

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
          expect(element.shadowRoot.getElementById('output')!.textContent)
            .to.equal('We\'ll call you nothing!');
        });

        beforeEach(function() {
          element.shadowRoot.querySelector('input')!.value = 'Jackson';
          element.shadowRoot.querySelector('input')!.dispatchEvent(new Event('input'));
          element.shadowRoot.querySelector('select')!.selectedIndex = 4;
          element.shadowRoot.querySelector('select')!.dispatchEvent(new Event('input'));
          element.shadowRoot.getElementById('button')!.click();
        });

        beforeEach(() => aTimeout(70));

        it('mutates', function() {
          expect(element.shadowRoot.getElementById('output')!.textContent)
            .to.equal('We\'ll call you Blond Jackson!');
        });

        describe('then changing the variables', function() {
          beforeEach(function() {
            element.shadowRoot.querySelector('input')!.value = 'Rover';
            element.shadowRoot.querySelector('input')!.dispatchEvent(new Event('input'));
            element.shadowRoot.querySelector('select')!.selectedIndex = 3;
            element.shadowRoot.querySelector('select')!.dispatchEvent(new Event('input'));
            element.shadowRoot.getElementById('button')!.click();
          });

          beforeEach(() => aTimeout(100));

          it('mutates again', function() {
            expect(element.shadowRoot.getElementById('output')!.textContent)
              .to.equal('We\'ll call you Red Rover!');
          });
        });
      });
    });
  });
});
