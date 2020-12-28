---
socialMediaImage: https://res.cloudinary.com/apolloelements/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_south_west,x_60,y_200,l_text:open sans_128_bold:Generator/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_south_west,x_60,y_100,l_text:open sans_78:Apollo Elements/social-template.svg
---
# Generator >> App || 00

Generate an Apollo Elements skeleton app.

## Example

<code-tabs collection="package-managers" default-tab="npm">

```bash tab npm
npm init @apollo-elements -- \
  app \
    --uri '/graphql' \
    --install \
    --start \
    --yes
```

```bash tab yarn
npm init @apollo-elements -- \
  app \
    --pkg-manager yarn \
    --uri '/graphql' \
    --install \
    --start \
    --yes
```

```bash tab pnpm
pnpm init @apollo-elements -- \
  app \
    --pkg-manager pnpm \
    --uri '/graphql' \
    --install \
    --start \
    --yes
```

</code-tabs>

## Options
| Flag | Description | type | default |
|-----|-----|-----|-----|
| `--help`         | Show help | boolean | |
| `--version`       | Show version number | boolean | |
| `--pkg-manager`   | Preferred package manager | `npm`&vert;`yarn`&vert;`pnpm` | `npm` |
| `--uri`, `-u`     | URI to your GraphQL endpoint | string |
| `--yes`, `-y`     | Use default package.json fields (e.g. author, license) | boolean |
| `--skip-codegen`  | Skip the codegen phase | string | false |
| `--install`, `-i` | Automatically install dependencies | boolean |
| `--start`, `-s`   | Launch the dev server after scaffolding | boolean |
