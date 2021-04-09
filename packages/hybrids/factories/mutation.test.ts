import type { TypedDocumentNode } from '@apollo/client/core';
import type { SinonSpy, SinonStub } from 'sinon';

import { describeMutation, MutationElement } from '@apollo-elements/test-helpers/mutation.test';
import { nextFrame } from '@open-wc/testing';
import 'sinon-chai';

import { define, html } from 'hybrids';

import { mutation } from './mutation';
import {
  Entries,
  SetupOptions,
  setupSpies,
  setupStubs,
  stringify,
  assertType,
} from '@apollo-elements/test-helpers';
import { __testing_escape_hatch__ } from '../helpers/accessors';

let counter = 0;

function getTagName(): string {
  const tagName = `mutation-element-${counter}`;
  counter++;
  return tagName;
}

describe('[hybrids] ApolloMutation', function() {
  describeMutation({
    async setupFunction<T extends MutationElement>(options: SetupOptions<T> = {}) {
      const { attributes, innerHTML = '', properties } = options;

      const tag = getTagName();

      define<MutationElement>(tag, {
        ...mutation(null),
        stringify: () => stringify,
        hasRendered: (host: MutationElement & { render(): ShadowRoot }) => async () => {
          host.render();
          return host;
        },
        render: ({ called, data, error, errors, loading, stringify }) => html`
          <output id="called">${stringify(called)}</output>
          <output id="data">${stringify(data)}</output>
          <output id="error">${stringify(error)}</output>
          <output id="errors">${stringify(errors)}</output>
          <output id="loading">${stringify(loading)}</output>
        `,
      });

      const attrs = attributes ? ` ${attributes}` : '';

      const template = document.createElement('template');

      template.innerHTML = `<${tag}${attrs}></${tag}>`;

      const [element] =
        (template.content.cloneNode(true) as DocumentFragment)
          .children as HTMLCollectionOf<T>;

      if (properties?.onCompleted)
        element.onCompleted = properties.onCompleted as T['onCompleted'];

      if (properties?.onError)
        element.onError = properties.onCompleted as T['onError'];

      let spies!: Record<string|keyof T, SinonSpy>;
      let stubs!: Record<string|keyof T, SinonStub>;

      // @ts-expect-error: just for tests
      element[__testing_escape_hatch__] = function(el: T) {
        spies = setupSpies(options?.spy, el);
        stubs = setupStubs(options?.stub, el);
      };

      document.body.append(element);

      for (const [key, val] of Object.entries(properties ?? {}) as Entries<T>)
        key !== 'onCompleted' && key !== 'onError' && (element[key] = val);

      await nextFrame();

      element.innerHTML = innerHTML;

      await nextFrame();

      return { element, spies, stubs };
    },

  });
});

function TDNTypeCheck() {
  type TypeCheckData = { a: 'a'; b: number };
  type TypeCheckVars = { c: 'c'; d: number };

  const TDN = {} as TypedDocumentNode<TypeCheckData, TypeCheckVars>;

  const Class = define('typed-mutation', {
    ...mutation(TDN),
  });

  const instance = new Class();

  assertType<TypeCheckData>(instance.data!);
  assertType<TypeCheckVars>(instance.variables!);
}
