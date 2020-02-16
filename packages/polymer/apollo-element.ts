import { NotifyingElementMixin } from './notifying-element-mixin';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

export class PolymerApolloElement<TData = {}> extends
  NotifyingElementMixin(ApolloElementMixin(HTMLElement)) {
  #data: TData = null;

  #error: Error = null;

  #loading = false;

  /**
   * Latest data.
   */
  get data(): TData { return this.#data; }

  set data(value) {
    this.#data = value;
    this.notify('data', value);
  }

  /**
   * Latest error.
   */
  get error(): Error { return this.#error; }

  set error(value) {
    this.#error = value;
    this.notify('error', value);
  }

  /**
   * Whether a request is in flight.
   */
  get loading(): boolean { return this.#loading; }

  set loading(value) {
    this.#loading = value;
    this.notify('loading', value);
  }
}
