import type { PropertyValues, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';

type SlotchangeEvent = Event & { target: HTMLSlotElement };

type Constructor<T = HTMLElement> = {
  new (...args: any[]): T
}

export interface Item extends HTMLElement {
  itemIndex: number;
}

export declare class SelectMixinElement extends LitElement {
  static allowedChildren: string[]|RegExp;

  static keyboardMode?: 'tablist'|'grid';

  itemsMutationObserver: MutationObserver;

  #items: Item[];

  #focusedIndex: number;

  #focusedItem: Item;

  previousSelectedItem: Item | Item[];

  previousSelectedIndex: number | number[];

  /**
   * The selectable items
   */
  readonly items: Item[]

  /**
   * Whether multiple selections are allowed
   */
  multi: boolean;

  /**
   * The index of the focused item
   */
  readonly focusedIndex: number

  /**
   * The focused item
   */
  readonly focusedItem: Item

  /**
   * The boolean attribute on items which, when present, indicates that the item is selected.
   */
  attributeForSelected: string;

  /**
   * The currently selected item's index
   */
  selectedIndex: number | number[];

  /**
   * The currently selected Item
   */
  readonly selectedItem: Item|Item[];

  /**
   * Selected Item's Value
   */
  readonly value: unknown|unknown[]

  /**
   * Whether one of the items is the active element (i.e. focused)
   */
  readonly hasActiveItem: boolean;

  /**
   * The anonymous slot for list items
   */
  contentSlot: HTMLSlotElement;

  /**
   * Updates the read-only `selectedItem` and `selectedIndex` properties
   * Updates the `value` property
   * @param  selectedIndex selectedIndex
   */
  selectIndex(selectedIndex: number): void

  /**
   * Selects the next item in the list.
   * Wraps around to first item from last.
   */
  selectNext(): void;

  /**
   * Selects the previous item in the list.
   * Wraps around to last item from first.
   */
  selectPrevious(): void;

  // PRIVATE METHODS

  /**
   * Updates the read-only `focusedIndex` property
   * @param  focusedIndex focusedIndex
   */
  focusIndex(focusedIndex: number): void;

  /**
   * Focuses the next item in the list.
   * Wraps around to first item from last.
   */
  focusNext(): void;

  /**
   * Focuses the previous item in the list.
   * Wraps around to last item from first.
   */
  focusPrevious(): void;

  setItemIndex(element: Item, index: number);

  /**
   * Manage state by observing which items have the attribute-for-selected,
   * and removing attribute for selected from previously selected items.
   *
   * Caches previous values so that we can call requestUpdate
   * @param  mutationRecords
   */
  mutated(mutationRecords: (MutationRecord & { target: HTMLElement })[]): void;

  /**
   * Manage state by observing which items have the attribute-for-selected
   */
  initMutationObserver(): void;

  /**
   * Determines which children are 'items' according to the static 'allowedItems' property
   * Updates the `items` read-only property
   * @fires items-changed
   * @param  maybeEvent slotchange event
   */
  updateItems(maybeEvent?: SlotchangeEvent): void;

  /**
   * Update the read-only focusedIndex property
   * @param  focusedIndex the newly selected item's index
   */
  updateFocusedIndex(focusedIndex: number): void;

  /**
   * Update the read-only focusedItem property
   * @param  focusedItem the newly selected item
   */
  updateFocusedItem(focusedItem: Item): void;

  updateSelected({ previousSelectedItem, previousSelectedIndex }: {
    previousSelectedItem: Item | Item[],
    previousSelectedIndex: number | number[]
  }): void;

  /**
   * Actually updates the selected index
   * @param  value index to select
   */
  setSelectedIndex(value: number): void;

  /**
   * Updates selected index when an array is passed
   * @param   indices indices of items to select
   */
  selectMultiIndex(indices: number[]): void;

  /**
   * Handles keyboard events
   * Lets user select items with the arrow keys
   */
  onKeydown(event: KeyboardEvent): void;

  /**
   * Handles a change in the items.
   * @param   event items-changed event
   */
  onItemsChanged?(event: CustomEvent): void

  onSelect?(): void

  /**
   * Focuses an item.
   * @param  focusedItem
   */
  focusItem(focusedItem: Item): void;

  /**
   * Unfocuses an item.
   */
  unfocusItem(item: Item): void;

  /**
   * Toggles the selected state of the focused item.
   */
  toggleFocusedItem(): void;

  /**
   * React to `selectedItem` or `selectedIndex` changing
   */
  selectedItemChanged(): void;
}

const isSlotchangeEvent = (event: unknown): event is SlotchangeEvent =>
  event instanceof Event &&
  event.type !== 'slotchange';

const isAllowedChild = (allowedChildren: string[]|RegExp) => (node: Node): node is Item =>
    !(node instanceof HTMLElement) ? false
  : Array.isArray(allowedChildren) ? allowedChildren.includes(node.tagName.toLowerCase())
  : allowedChildren instanceof RegExp ? !!node.tagName.toLowerCase().match(allowedChildren)
  : true;

const getValue = x => x?.value ?? null;

const getIndex = (item: unknown, _index: number, array: unknown[]) =>
  array.indexOf(item);

const hasAttribute = (attr: string) => (element: Element) =>
  element.hasAttribute(attr);

const getItemIndex = x => x?.itemIndex ?? -1;

const noop = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

const SelectedIndexConverter = {
  fromAttribute(value, type) {
    return (value.includes(',')) ? value.split(',').map(x => parseInt(x))
    : parseInt(value);
  },

  toAttribute(value, type) {
    return Array.isArray(value) ? value.join(',') : value;
  },
};

/**
 * Provides methods and properties for a selecting element.
 *
 * The element's shadow root must contain an anonymous slot for items.
 *
 * If you define a static property `allowedChildren` (Array, String, or RegExp), the `items`
 * property will filter for those tag names based on their custom element class' static `is` property
 * or `localName`
 *
 * To select items that live in your shadow root, e.g. SVG children, you can override the
 * getters and update method:
 *
 * @fires select - When an item is selected
 *
 * @example
 * ```html
 * <my-select>
 *  #shadow-root
 *    <slot></slot>
 * </my-select>
 * ```
 *
 * @example
 * ```js
 * class HasSelectableShadowChildren extends SelectMixin {
 *   // override SelectMixin updateItems
 *   updateItems() {
 *     const { items: oldItems } = this;
 *     const items = Array.from(this.shadowRoot.querySelectorAll('svg rect'));
 *     items.forEach((element, index) => {
 *       element.itemIndex = index;
 *       element.setAttribute('data-item-index', index.toString());
 *     });
 *     this._items = items;
 *     this.requestUpdate('items', oldItems);
 *     this.fire('items-changed', items);
 *   }
 *
 *   // Override SelectMixin getter
 *   get selectedItem() { return this.shadowRoot.querySelector('rect.active'); }
 *   set selectedItem(_) {}
 *  }
 * ```
 *
 */
export function SelectMixin<TBase extends Constructor<LitElement>>(
  superclass: TBase
) {
  class MixedSelectMixinElement extends superclass {
    static allowedChildren: string[]|RegExp = /-/;

    static keyboardMode: 'tablist'|'grid';

    itemsMutationObserver: MutationObserver;

    #focusedIndex: number;

    #focusedItem: Item;

    previousSelectedItem: Item | Item[];

    previousSelectedIndex: number | number[];

    /**
     * The selectable items
     * @readonly
     */
    @property({ type: Array })

    get items(): Item[] {
      return Array.isArray(this.#items) ? this.#items : [];
    }

    set items(_) { _; }

    #items: Item[] = [];

    /**
     * Whether multiple selections are allowed
     */
    @property({ type: Boolean }) multi = false;

    /**
     * The index of the focused item
     * @readonly
     */
    @property({ type: Number })

    get focusedIndex() {
      return this.items.indexOf(this.focusedItem);
    }

    set focusedIndex(_) { _; }

    /**
     * The focused item
     * @readonly
     */
    @property({ type: Object })

    get focusedItem() {
      const [focusedItem] = this.items.filter(x => x.matches(':focus, :focus-within'));
      return focusedItem;
    }

    set focusedItem(_) { _; }

    /**
     * The boolean attribute on items which, when present, indicates that the item is selected.
     */
    @property({ type: String, attribute: 'attribute-for-selected' })
    attributeForSelected = 'selected';

    /**
     * The currently selected item's index
     */
    @property({
      type: Number,
      converter: SelectedIndexConverter,
      attribute: 'selected-index',
    })

    get selectedIndex(): number | number[] {
      const { multi, attributeForSelected, items, selectedItem } = this;
      return (
          !multi ? items.indexOf(<Item>selectedItem)
        : items.filter(hasAttribute(attributeForSelected)).map(getIndex)
      );
    }

    set selectedIndex(value) {
        // not an array ? great, select,
        !Array.isArray(value) ? this.setSelectedIndex(value)
        // Array, but not multi, take the first value,
      : !this.multi ? this.setSelectedIndex(value[0])
        // Array and multi ? select all passed values.
      : this.selectMultiIndex(value);
    }

    /**
     * The currently selected Item
     * @readonly
     */
    @property({ type: Object })

    get selectedItem(): Item|Item[] {
      const { multi, attributeForSelected, items } = this;
      return (
          multi ? items.filter(hasAttribute(attributeForSelected))
        : this.querySelector?.(`[${attributeForSelected}]`) as Item
      );
    }

    set selectedItem(_) { _; }

    /**
     * Selected Item's Value
     * @readonly
     */
    @property({ type: Object })

    get value(): unknown|unknown[] {
      return (
          this.multi && Array.isArray(this.selectedItem) ? this.selectedItem.map(getValue)
        : getValue(this.selectedItem)
      );
    }

    set value(_) { _; }

    /**
     * Whether one of the items is the active element (i.e. focused)
     * @type  true when an item is active
     * @readonly
     */
    get hasActiveItem(): boolean {
      return !!(this.items?.some?.(x => x.matches(':is(:focus, :active)')));
    }

    /**
     * The anonymous slot for list items
     */
    contentSlot: HTMLSlotElement;

    // LIFECYCLE

    /**
     * Adds event listeners for things like click, select, keydown.
     * Initializes the mutation observer
     */
    connectedCallback(): void {
      super.connectedCallback();
      this.addEventListener('items-changed', (this.onItemsChanged ?? noop));
      this.addEventListener('keydown', this.onKeydown);
      this.addEventListener('select', (this.onSelect ?? noop));
      this.initMutationObserver();
    }

    /**
     * Clears event listeners to prevent memory leaks
     */
    disconnectedCallback(): void {
      super.disconnectedCallback();
      this.removeEventListener('items-changed', (this.onItemsChanged ?? noop));
      this.removeEventListener('keydown', this.onKeydown);
      this.removeEventListener('select', (this.onSelect ?? noop));
      this.itemsMutationObserver.disconnect();
    }

    firstUpdated(changed: PropertyValues): void {
      super.firstUpdated(changed);
      this.contentSlot ??= this.shadowRoot!.querySelector('slot:not([name])');
      this.contentSlot?.addEventListener?.('slotchange', this.updateItems);
      // let's get this party started
      this.updateItems();
    }

    updated(changed: PropertyValues): void {
      super.updated && super.updated(changed);
      if (changed.has('attributeForSelected')) this.initMutationObserver();
      if (changed.has('selectedItem')) this.selectedItemChanged();
    }

    // PUBLIC METHODS

    /**
     * Updates the read-only `selectedItem` and `selectedIndex` properties
     * Updates the `value` property
     * @param  selectedIndex selectedIndex
     */
    selectIndex(selectedIndex: number): void {
      this.selectedIndex = selectedIndex;
    }

    /**
     * Selects the next item in the list.
     * Wraps around to first item from last.
     */
    selectNext(): void {
      if (this.multi) return;
      const { items: { length }, selectedIndex } = this;
      const lastItemIndex = length - 1;
      const nextIndex =
          selectedIndex === lastItemIndex ? 0
          : typeof selectedIndex === 'number' ? selectedIndex + 1
          // shouldn't get here
          : -1;
      this.selectIndex(nextIndex);
    }

    /**
     * Selects the previous item in the list.
     * Wraps around to last item from first.
     */
    selectPrevious(): void {
      if (this.multi) return;
      const { items: { length }, selectedIndex } = this;
      const lastItemIndex = length - 1;
      const previousIndex =
          selectedIndex === 0 ? lastItemIndex
        : typeof selectedIndex === 'number' ? selectedIndex - 1
        // shouldn't get here
        : -1;
      this.selectIndex(previousIndex);
    }

    // PRIVATE METHODS

    /**
     * Updates the read-only `focusedIndex` property
     * @param  focusedIndex focusedIndex
     */
    focusIndex(focusedIndex: number): void {
      // Find the item
      const focusedItem = this.items[focusedIndex];
      this.focusItem(focusedItem);
    }

    /**
     * Focuses the next item in the list.
     * Wraps around to first item from last.
     */
    focusNext(): void {
      const { focusedIndex, items: { length } } = this;
      const nextIndex =
          focusedIndex >= (length - 1) ? 0
        : focusedIndex + 1;
      this.focusIndex(nextIndex);
    }

    /**
     * Focuses the previous item in the list.
     * Wraps around to last item from first.
     */
    focusPrevious(): void {
      const { focusedIndex } = this;
      const previousIndex =
          focusedIndex === 0 ? (this.items.length - 1)
        : focusedIndex - 1;
      this.focusIndex(previousIndex);
    }

    setItemIndex = (element: Item, index: number) => {
      element.itemIndex = index;
      element.setAttribute('data-item-index', index.toString());
    }

    /**
     * Manage state by observing which items have the attribute-for-selected,
     * and removing attribute for selected from previously selected items.
     *
     * Caches previous values so that we can call requestUpdate
     * @param  mutationRecords
     */
    mutated = (mutationRecords: (MutationRecord & { target: HTMLElement })[]): void => {
      const { attributeForSelected, multi } = this;
      let { previousSelectedIndex, previousSelectedItem } = this;

      // if `multi`, the user manages all the state themselves
      if (!multi) {
        // get the item which was just now selected,
        // i.e. the first child which went from not having the attr to having it
        // if no such child exists, we're probably unselecting.
        const selectedRecord = mutationRecords
          .find(({ oldValue, target }: MutationRecord & {target: Item}) =>
            oldValue === null &&
            target.hasAttribute(attributeForSelected)
          );

        // get the item which was just now unselected,
        // i.e. the first child which went from having the attr to not having it
        // if no such child exists, we're probably selecting - use the cached value
        const prevRecord = mutationRecords
          .find(({ oldValue, target }: MutationRecord) =>
            oldValue === '' &&
            !(<Item>target).hasAttribute(attributeForSelected)
          );

        previousSelectedIndex =
          this.items.indexOf(<Item>prevRecord?.target);

        // Unselect previous item
        if (previousSelectedItem && previousSelectedItem !== selectedRecord?.target)
          prevRecord?.target.removeAttribute(attributeForSelected);
      }

      this.updateSelected({ previousSelectedItem, previousSelectedIndex });
    }

    /**
     * Manage state by observing which items have the attribute-for-selected
     */
    initMutationObserver(): void {
      if (this.itemsMutationObserver) this.itemsMutationObserver.disconnect();
      this.itemsMutationObserver = new MutationObserver(this.mutated);
      this.itemsMutationObserver.observe(this, {
        attributeFilter: [this.attributeForSelected],
        attributeOldValue: true,
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    /**
     * Determines which children are 'items' according to the static 'allowedItems' property
     * Updates the `items` read-only property
     * @fires items-changed
     * @param  maybeEvent slotchange event
     */
    updateItems = (maybeEvent?: SlotchangeEvent): void => {
      const {
        items: oldItems,
        setItemIndex,
      } = this;


      // get child elements
      const children =
          !isSlotchangeEvent(maybeEvent) ? Array.from(this.children as HTMLCollection)
        : maybeEvent.target.assignedElements();

      const { allowedChildren } = <typeof SelectMixinElement> this.constructor;

      // filter children for legitimate items
      const items =
        children.filter(isAllowedChild(allowedChildren));

      // cache an `itemIndex` property on each item.
      items.forEach(setItemIndex);

      // Update the private `items` property
      this.#items = items;

      this.requestUpdate('items', oldItems);

      // Tell the 🌎 just how you feel
      this.dispatchEvent(new CustomEvent('items-changed', { bubbles: true, detail: items }));
    }

    /**
     * Update the read-only focusedIndex property
     * @param  focusedIndex the newly selected item's index
     */
    updateFocusedIndex(focusedIndex: number) {
      const { focusedIndex: oldValue } = this;
      this.#focusedIndex = focusedIndex;
      this.requestUpdate('focusedIndex', oldValue);
    }

    /**
     * Update the read-only focusedItem property
     * @param  focusedItem the newly selected item
     */
    updateFocusedItem(focusedItem: Item) {
      const { focusedItem: oldValue } = this;
      this.#focusedItem = focusedItem;
      this.requestUpdate('focusedItem', oldValue);
    }

    updateSelected({ previousSelectedItem, previousSelectedIndex }: {
      previousSelectedItem: Item | Item[],
      previousSelectedIndex: number | number[]
    }) {
      this.previousSelectedItem = this.selectedItem;
      this.previousSelectedIndex = this.selectedIndex;
      this.requestUpdate('selectedItem', previousSelectedItem);
      this.requestUpdate('selectedIndex', previousSelectedIndex);
    }

    /**
     * Actually updates the selected index
     * @param  value index to select
     */
    setSelectedIndex = (value: number): void => {
      const {
        attributeForSelected,
        items,
        multi,
        selectedIndex: oldIndex,
        selectedItem: oldItem,
      } = this;

      const index = typeof value === 'string' ? parseInt(value) : value;

      // short circuit if there's no change
      if (Number.isNaN(index) || oldIndex === index) return;

      const newItem = items[index];

      // manage state
      if (oldItem instanceof HTMLElement && !multi) oldItem.removeAttribute(attributeForSelected);
      if (newItem instanceof HTMLElement) newItem.setAttribute(attributeForSelected, '');
    }

    /**
     * Updates selected index when an array is passed
     * @param   indices indices of items to select
     */
    selectMultiIndex(indices: number[]): void {
      indices.map(this.setSelectedIndex);
      this.items.filter(x => !indices.includes(getItemIndex(x)))
        .forEach(item => item.removeAttribute(this.attributeForSelected));
    }

    /**
     * Handles keyboard events
     * Lets user select items with the arrow keys
     */
     onKeydown = (event: KeyboardEvent): void => {
      if (event.defaultPrevented) return;
      switch ((this.constructor as typeof MixedSelectMixinElement).keyboardMode) {
        case 'tablist':
          return this.onKeyboardNavTab(event);
        default:
          return this.onKeyboardNavDefault(event);
      }
    }

     /** @protected */
     onKeyboardNavDefault(event: KeyboardEvent): void {
       if (event.defaultPrevented) return;
       const { key } = event;
       switch (key) {
         case 'ArrowUp':
           event.preventDefault();
           return this.focusPrevious();
         case 'ArrowDown':
           event.preventDefault();
           return this.focusNext();
         case ' ':
           event.preventDefault();
         case 'Enter': // eslint-disable-line no-fallthrough
           return this.toggleFocusedItem();
       }
     }

     /** @protected */
     onKeyboardNavTab(event: KeyboardEvent): void {
       const { key } = event;
       switch (key) {
         case 'ArrowLeft':
         case 'ArrowUp':
           event.preventDefault();
           return this.selectPrevious();
         case 'ArrowRight':
         case 'ArrowDown':
           event.preventDefault();
           return this.selectNext();
       }
     }

     /**
     * Handles a change in the items.
     * @param   event items-changed event
     */
     onItemsChanged?(event: CustomEvent): void

     onSelect?(): void

    /**
     * Focuses an item.
     * @param  focusedItem
     */
    focusItem = (focusedItem: Item): void => {
       this.updateFocusedIndex(this.items.indexOf(focusedItem));
       this.updateFocusedItem(focusedItem);
       if (!focusedItem) return;
       focusedItem.focus();
     }

    /**
     * Unfocuses an item.
     */
    unfocusItem = (item: Item): void => {
      /* istanbul ignore else */
      if (item) {
        item.blur();
        item.tabIndex = -1;
      }
    }

    /**
     * Toggles the selected state of the focused item.
     */
    toggleFocusedItem(): void {
      const { focusedItem, attributeForSelected } = this;
      if (!focusedItem) return;
      const isSelected = focusedItem.hasAttribute(attributeForSelected);
      if (isSelected) focusedItem.removeAttribute(attributeForSelected);
      else focusedItem.setAttribute(attributeForSelected, '');
    }

    /**
     * React to `selectedItem` or `selectedIndex` changing
     */
    selectedItemChanged(): void {
      if (this.selectedItem)
        this.dispatchEvent(new SelectEvent(this.selectedItem));
    }
  }

  return MixedSelectMixinElement as unknown as (
    & TBase
    & Constructor<SelectMixinElement>
    & { allowedChildren: string[]|RegExp; }
  );
}

class SelectEvent extends Event {
  detail: unknown;
  constructor(public selectedItem: unknown) {
    super('select', { bubbles: true });
    this.detail = selectedItem;
  }
}
