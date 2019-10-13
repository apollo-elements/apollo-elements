/**
 * `<apollo-mutation>` fires Polymer-style prop-changed events
 * when its `called`, `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * ## 👩‍🚀 Usage
 *
 * ```js
 * class MutationElement extends PolymerElement {
 *   static template = html`
 *     <apollo-mutation id="userMutation" data="{{data}}">
 *       <script type="application/graphql">
 *         mutation User($id: ID!, $name: String, $picture: String) {
 *           user(id: $id, name: $name, picture: $picture) {
 *             name
 *             picture
 *           }
 *         }
 *       </script>
 *     </apollo-mutation>
 *
 *     <paper-input label="Name" value="{{name}}"></paper-input>
 *     <paper-input label="Picture URL" value="{{picture}}"></paper-input>
 *     <paper-button on-click="mutate">Submit</paper-button>
 *   `;
 *
 *   static properties = {
 *     variables: {
 *       type: Object,
 *       computed: 'computeVariables(name, picture)',
 *     },
 *   };
 *
 *   computeVariables(name, picture) {
 *     return { name, picture }
 *   }
 *
 *   mutate() {
 *     const { variables } = this;
 *     return this.$.userMutation.mutate({ variables })
 *   }
 * }
 * ```
 *
 * @polymer
 * @customElement
 * @appliesMixin NotifyingElementMixin
 * @element
 * @inheritdoc
 */
export class ApolloMutation {
    set called(arg: any);
    /**
     * Whether the mutation has been called
     */
    get called(): any;
    __called: any;
    set data(arg: any);
    /**
     * Latest data.
     */
    get data(): any;
    __data: any;
    set error(arg: any);
    /**
     * Latest error.
     */
    get error(): any;
    __error: any;
    set loading(arg: any);
    /**
     * Whether a request is in flight.
     */
    get loading(): any;
    __loading: any;
}
