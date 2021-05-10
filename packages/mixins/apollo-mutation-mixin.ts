import type { ReactiveControllerHost } from '@lit/reactive-element';

import type * as C from '@apollo/client/core';

import type * as I from '@apollo-elements/interfaces';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

import { ApolloElementMixin } from './apollo-element-mixin';
import { controlled } from './controller-host-mixin';

import { ApolloMutationController } from '@apollo-elements/core/apollo-mutation-controller';

type ApolloMutationResultEvent<TData = unknown> =
  CustomEvent<C.FetchResult<TData>>;

declare global {
  interface HTMLElementEventMap {
    'apollo-mutation-result': ApolloMutationResultEvent;
  }
}

type MixinInstance = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new <D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>():
    I.ApolloMutationInterface<D, V> & ReactiveControllerHost;
  documentType: 'mutation';
  observedAttributes?: string[];
}

function ApolloMutationMixinImpl<B extends I.Constructor>(base: B): B & MixinInstance {
  class ApolloMutationElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
    extends ApolloElementMixin(base)
    implements I.ApolloMutationInterface<D, V> {
    static documentType = 'mutation' as const;

    static get observedAttributes(): string[] {
      return [
        ...(super.observedAttributes ?? []), /* c8 ignore next */
        'await-refetch-queries',
        'refetch-queries',
      ];
    }

    controller = new ApolloMutationController<D, V>(this, null, {
      update: this.updater,
      onCompleted: data => this.onCompleted?.(data),
      onError: error => this.onError?.(error ?? null),
    });

    @controlled({ readonly: true }) readonly called = false;

    @controlled() mutation: I.ComponentDocument<D> | null = null;

    @controlled({ path: 'options' }) optimisticResponse?: I.OptimisticResponseType<D, V>;

    @controlled({ path: 'options' }) refetchQueries: I.RefetchQueriesType<D> | null = null;

    @controlled({ path: 'options' }) context?: Record<string, unknown>;

    @controlled({ path: 'options' }) fetchPolicy?: Extract<C.FetchPolicy, 'no-cache'>;

    @controlled({ path: 'options' }) awaitRefetchQueries?: boolean;

    @controlled({ path: 'options' }) ignoreResults = false;

    onCompleted?(_data: I.Data<D>): void;

    onError?(_error: Error): void;

    updater?(
      ...params: Parameters<C.MutationUpdaterFn<I.Data<D>>>
    ): ReturnType<C.MutationUpdaterFn<I.Data<D>>>;

    attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
      super.attributeChangedCallback?.(name, oldVal, newVal);
      /* c8 ignore start */
      // @ts-expect-error: ts is not tracking the static side
      if ((super.constructor?.observedAttributes ?? []).includes(name))
        return;
      /* c8 ignore stop */

      switch (name) { /* c8 ignore next */
        case 'await-refetch-queries':
          this.awaitRefetchQueries =
            this.hasAttribute('await-refetch-queries');
          break; /* c8 ignore next */

        case 'refetch-queries':
          this.refetchQueries =
            !newVal ? null : newVal
              .split(',')
              .map(x => x.trim());
          break; /* c8 ignore next */
      }
    }

    /**
     * This resolves a single mutation according to the options specified and returns a Promise which is either resolved with the resulting data or rejected with an error.
     */
    public async mutate(
      params?: Partial<C.MutationOptions<I.Data<D>, I.Variables<D, V>>>
    ): Promise<C.FetchResult<I.Data<D>>> {
      return this.controller.mutate(params);
    }
  }

  return ApolloMutationElement;
}

/**
 * `ApolloMutationMixin`: class mixin for apollo-mutation elements.
 */
export const ApolloMutationMixin =
  dedupeMixin(ApolloMutationMixinImpl);
