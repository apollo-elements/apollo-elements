---
name: HTML Queries
attrs: float-header
---

## HTML Queries

<section progressive>

```html
<apollo-client uri="https://api.spacex.land/graphql">











</apollo-client>
```

```html reveal
<apollo-client uri="https://api.spacex.land/graphql">
  <apollo-query>
    <script type="application/graphql">
      query NextLaunch {
        launchNext {
          launch_site { site_name }
          mission_name
          rocket { rocket_name }
        }
      }
    </script>
  </apollo-query>
</apollo-client>
```

```html reveal
<apollo-client uri="https://api.spacex.land/graphql">
  <apollo-query>
    <script type="application/graphql" src="NextLaunch.query.graphql"></script>








  </apollo-query>
</apollo-client>
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
