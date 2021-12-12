---
name: HTML Queries
attrs: float-header auto
---

## Queries

<section progressive>

```ts
@customElement('next-launch')
export class NextLaunch extends LitElement {
  query = new ApolloQueryController(this, NextLaunchQuery);

  render() {
    const { data } = this.query;
    return html`
      <h1 part="mission">${data?.launchNext?.mission_name}</h1>
      <p ?hidden="${loading}">launches from
         <em>${data?.launchNext?.launch_site?.site_name}</em> aboard
         <em>${data?.launchNext?.rocket?.rocket_name}</em></p>
    `;
  }
}
```

```ts reveal
@customElement({
  name: 'next-launch',
  template: html<NextLaunch>`
    <h1 part="mission">${x => x.query.data?.launchNext?.mission_name}</h1>
    <p ?hidden="${loading}">launches from
       <em>${x => x.query.data?.launchNext?.launch_site?.site_name}</em> aboard
       <em>${x => x.query.data?.launchNext?.rocket?.rocket_name}</em></p>
    `,
})
export class NextLaunch extends FASTElement {
  query = new ApolloQueryBehavior(this, NextLaunchQuery);
}


```

```ts reveal
function NextLaunch() {
  const { data }  = useQuery(NextLaunchQuery);
  return html`
    <h1 part="mission">${data?.launchNext?.mission_name}</h1>
    <p ?hidden="${loading}">launches from
       <em>${data?.launchNext?.launch_site?.site_name}</em> aboard
       <em>${data?.launchNext?.rocket?.rocket_name}</em></p>
  `;
}

customElements.define('next-launch', component(NextLaunch));



```

```html reveal
<apollo-client uri="https://api.spacex.land/graphql">
  <apollo-query>
    <script type="application/graphql" src="NextLaunch.query.graphql"></script>

    <template>{%raw%}
      <h1 part="mission">{{ data.launchNext.mission_name }}</h1>
      <p .hidden="{{ loading }}">launches from
         <em>{{ data.launchNext.launch_site.site_name }}</em> aboard
         <em>{{ data.launchNext.rocket.rocket_name }}</em></p>
    </template>{%endraw%}

  </apollo-query>
</apollo-client>


```

</section>
