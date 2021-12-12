---
name: Try It
attrs: progressive
---

<section>

## Dashboard SPAs

```bash
npm init @apollo-elements
```

```ts
function UsersOnline() {
  const { data } = useQuery(UsersOnlineQuery);
  return html`<!-- ... -->`;
}

function AddNewUser() {
  const [mutate, { data }] = useMutation(AddNewUserQuery);
  return html`<!-- ... -->`;
}

customElements.define('users-online', component(UsersOnline));
customElements.define('new-post', component(AddNewUser));
```

</section>

<section reveal>

## Business SDKs / Microfrontends

```html
<script type="module" src="https://cdn.ourcorp.com/html-sdk.js"></script>

<ourcorp-kpis filter="sales,tickets"></ourcorp-kpis>
<ourcorp-customer-stats></ourcorp-customer-stats>
<ourcorp-support-form></ourcorp-support-form>
```

</section>
