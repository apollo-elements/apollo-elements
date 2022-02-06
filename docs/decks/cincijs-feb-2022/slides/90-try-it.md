---
name: Try It
---

## Try It for...

- Dashboard SPAs
    ```html
    <portal-home>
      <apollo-query>
        <script type="application/graphql" src="Uptime.query.graphql"></script>
        <template><!-- ... --></template>
      </apollo-query>
    </portal-home>
    ```

- Business SDKs
    ```bash
    npm install @ourcorp/html-sdk
    ```

- Microfrontend Widgets
    ```ts
    @customElement('users-online')
    export class UsersOnline extends LitElement {
      data = new ApolloQueryController(this, UsersOnlineQuery);
      render() {
        return html`<!-- ... -->`;
      }
    }
    ```
