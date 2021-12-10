---
name: Try It
---

## Try It for...

- Dashboard SPAs
    ```html
    <portal-home>
      <apollo-query><!-- ... --></apollo-query>
    </portal-home>
    ```

- Business SDKs
    ```bash
    npm install @ourcorp/html-sdk
    ```

- Microfrontend Widgets
    ```ts
    function UsersOnline() {
      const { data } = useQuery(UsersOnlineQuery);
      return html`<!-- ... -->`;
    }
    ```
