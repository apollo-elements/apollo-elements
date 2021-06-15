import type * as C from '@apollo/client/core';

import type {
  ComponentDocument,
  Constructor,
  Data,
  MaybeTDN,
  MaybeVariables,
  OptimisticResponseType,
  RefetchQueriesType,
  Variables,
} from '@apollo-elements/core/types';

import type { ApolloMutationElement } from '@apollo-elements/core/types';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

import { ApolloElementMixin } from './apollo-element-mixin.js';
import { controlled } from '@apollo-elements/core/decorators';

import { ApolloMutationController } from '@apollo-elements/core/apollo-mutation-controller';

type MixinInstance<B extends Constructor> = B & {
  new <D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>():
    InstanceType<B> & ApolloMutationElement<D, V>;
  documentType: 'mutation';
  observedAttributes?: string[];
}

function ApolloMutationMixinImpl<B extends Constructor>(base: B): B & MixinInstance<B> {
  class MixedApolloMutationElement<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>
    extends ApolloElementMixin(base)<D, V> {
    static override documentType = 'mutation' as const;

    static get observedAttributes(): string[] {
      return [
        ...(super.observedAttributes ?? []), /* c8 ignore next */
        'await-refetch-queries',
        'refetch-queries',
      ];
    }

    controller = new ApolloMutationController<D, V>(this, null, {
      update: this.updater,
      onCompleted: data => data && this.onCompleted?.(data),
      onError: error => this.onError?.(error),
    });

    @controlled({ readonly: true }) readonly called = false;

    @controlled() mutation: ComponentDocument<D> | null = null;

    @controlled({ path: 'options' }) optimisticResponse?: OptimisticResponseType<D, V>;

    @controlled({ path: 'options' }) refetchQueries: RefetchQueriesType<D> | null = null;

    @controlled({ path: 'options' }) fetchPolicy?: Extract<C.FetchPolicy, 'no-cache'>;

    @controlled({ path: 'options' }) awaitRefetchQueries?: boolean;

    @controlled({ path: 'options' }) ignoreResults = false;

    onCompleted?(_data: Data<D>): void;

    onError?(_error: Error): void;

    updater?(
      ...params: Parameters<C.MutationUpdaterFn<Data<D>>>
    ): ReturnType<C.MutationUpdaterFn<Data<D>>>;

    override attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
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
      params?: Partial<C.MutationOptions<Data<D>, Variables<D, V>>>
    ): Promise<C.FetchResult<Data<D>>> {
      return this.controller.mutate(params);
    }
  }

  return MixedApolloMutationElement as MixinInstance<B>;
}

/**
 * `ApolloMutationMixin`: class mixin for apollo-mutation elements.
 */
export const ApolloMutationMixin =
  dedupeMixin(ApolloMutationMixinImpl);
