---
name: Try It
attrs: progressive
---

## Try It for...

<section reveal>

### Business SDKs
```sh
npm install @ourcorp/html-sdk
```

</section>

<section reveal>

### Dashboard SPAs

```html
<portal-home>
  <apollo-query>
    <script type="application/graphql" src="Uptime.query.graphql"></script>
    <template><!-- ... --></template>
  </apollo-query>
</portal-home>
```

</section>

<section reveal>

### Microfrontend Widgets
```ts
@customElement('users-online')
export class UsersOnline extends LitElement {
  data = new ApolloQueryController(this, UsersOnlineQuery);
  render() {
    return html`<!-- ... -->`;
  }
}
```

</section>
