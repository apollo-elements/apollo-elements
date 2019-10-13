import CustomElement from "@apollo-elements/mixins/custom-element";

export default interface NotifyingElement extends CustomElement {
    /**
     * Fires a `*-changed` event.
     *
     * @param  {string}     propName Name of the property.
     * @param  {any} value  property value
     * @protected
     */
    notify(propName: string, value: any): void
}