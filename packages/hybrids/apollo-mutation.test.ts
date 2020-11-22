import { describeMutation, MutationElement } from '@apollo-elements/test-helpers/mutation.test';
import { aTimeout, nextFrame } from '@open-wc/testing';
import 'sinon-chai';

import { SinonSpy, SinonStub } from 'sinon';
import { define, html, Hybrids } from 'hybrids';

import { ApolloMutation } from './apollo-mutation';
import { SetupOptions, setupSpies, setupStubs, stringify } from '@apollo-elements/test-helpers';
import { __testing_escape_hatch__ } from './helpers/accessors';

let counter = 0;

function getTagName(): string {
  const tagName = `mutation-element-${counter}`;
  counter++;
  return tagName;
}

function render<D = unknown, V = unknown>(host: MutationElement<D, V>): ReturnType<typeof html> {
  const { called, data, error, errors, loading } = host;
  return html`
    <output id="called">${host.stringify(called)}</output>
    <output id="data">${host.stringify(data)}</output>
    <output id="error">${host.stringify(error)}</output>
    <output id="errors">${host.stringify(errors)}</output>
    <output id="loading">${host.stringify(loading)}</output>
  `;
}

const hasRendered =
  host => async () => { await aTimeout(50); return host; };

describe('[hybrids] ApolloMutation', function() {
  describeMutation({
    async setupFunction<T extends MutationElement>(options: SetupOptions<T> = {}) {
      const { attributes, innerHTML = '', properties } = options;

      const tag = getTagName();

      define<T>(tag, {
        ...ApolloMutation,
        stringify: () => stringify,
        hasRendered,
        render,
      } as Hybrids<T>);

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

      let spies: Record<string|keyof T, SinonSpy>;
      let stubs: Record<string|keyof T, SinonStub>;

      element[__testing_escape_hatch__] = function(el) {
        spies = setupSpies(options?.spy, el);
        stubs = setupStubs(options?.stub, el);
      };

      document.body.append(element);

      for (const [key, val] of Object.entries(properties ?? {}))
        key !== 'onCompleted' && key !== 'onError' && (element[key] = val);

      await nextFrame();

      element.innerHTML = innerHTML;

      await nextFrame();

      return { element, spies, stubs };
    },

  });
});
