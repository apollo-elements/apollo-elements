import type { Entries } from '@apollo-elements/interfaces';
import type { DocumentNode, TypedDocumentNode } from '@apollo/client/core';
import type { SinonSpy, SinonStub } from 'sinon';
import type { SetupOptions } from '@apollo-elements/test';

import { aTimeout, nextFrame } from '@open-wc/testing';
import { describeMutation, MutationElement } from '@apollo-elements/test/mutation.test';
import { define, html, RenderFunction, Hybrids } from 'hybrids';
import { assertType, setupSpies, setupStubs, stringify } from '@apollo-elements/test';

import { mutation, MutationHybridsFactoryOptions } from './mutation';

import { __testing_escape_hatch__ } from '../helpers/accessors';

let counter = 0;

function getTagName(): string {
  const tagName = `mutation-element-${counter}`;
  counter++;
  return tagName;
}

type TestableApolloMutationHybrid<T, U> = Hybrids<MutationElement<T, U> & {
  stringify(x: unknown): string;
  hasRendered(): Promise<MutationElement<T, U>>;
  render?: RenderFunction<MutationElement<T, U>>;
}>

const testMutation = <T, U>(
  doc?: DocumentNode | TypedDocumentNode<T, U> | null,
  opts?: MutationHybridsFactoryOptions<T, U>
): TestableApolloMutationHybrid<T, U> => ({
    ...mutation<T, U>(doc, opts),
    stringify: () => stringify,
    hasRendered: host => async () => {
      await aTimeout(0);
      host.render?.(host);
      await aTimeout(0);
      return host;
    },
  });

describe('[hybrids] ApolloMutation', function() {
  describeMutation({
    async setupFunction<T extends MutationElement>(options: SetupOptions<T> = {}) {
      const { attributes, innerHTML = '', properties } = options;

      const tag = getTagName();

      define<MutationElement>(tag, {
        ...testMutation(),
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
