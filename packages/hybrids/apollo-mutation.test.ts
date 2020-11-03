import { describeMutation, MutationElement } from '@apollo-elements/test-helpers/mutation.test';
import { aTimeout, expect, nextFrame } from '@open-wc/testing';
import 'sinon-chai';
import gql from 'graphql-tag';

import { spy, stub, SinonSpy, SinonStub } from 'sinon';
import { define, html, Hybrids } from 'hybrids';

import NoParamMutation from '@apollo-elements/test-helpers/NoParam.mutation.graphql';
import NullableParamMutation from '@apollo-elements/test-helpers/NullableParam.mutation.graphql';

import { ApolloMutation } from './apollo-mutation';
import { setupClient } from '@apollo-elements/test-helpers/client';
import { ApolloError } from '@apollo/client/core';
import { SetupOptions, SetupResult } from '@apollo-elements/test-helpers';

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

const stringify =
  host => x => JSON.stringify(x, null, 2);

const hasRendered =
  host => async () => { await aTimeout(50); return host; };

describe('[hybrids] ApolloMutation', function() {
  describeMutation({
    async setupFunction<T extends MutationElement>(options: SetupOptions<T> = {}) {
      const { attributes, innerHTML = '', properties } = options;

      const tag = getTagName();

      define<T>(tag, {
        ...ApolloMutation,
        stringify,
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

      // @ts-expect-error: gotta hook up the spies somehow
      element.__testingEscapeHatch = function(el) {
        spies = Object.fromEntries((options?.spy ?? []).map(key =>
          [key, spy(el, key)])) as Record<string|keyof T, SinonSpy>;
        stubs = Object.fromEntries((options?.stub ?? []).map(key =>
          [key, stub(el, key)])) as Record<string | keyof T, SinonStub>;
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
