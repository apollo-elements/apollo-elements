---
name: Lit.Fable
---

```fsharp
open Fable.Lit
open Fable.Core.JsInterop

type Profile =
    abstract name : string

[<ImportMember("@apollo-elements/core")>]
type ApolloQueryController =
    abstract member data : {| profile: Profile |}
    abstract member loading : boolean

[<Emit("new ApolloQueryController($0, $1, $2)")>]
let createController host document options: ApolloQueryController =
	jsNative

let UserProfileDocument =
    importMember "./UserProfile.query.graphql.js'"
let client = importMember "./client.js"

[<LitElement("user-profile")>]
let UserProfile () =
    let host, props = LitElement.init ()

    let query =
        createController host UserProfileDocument {| client = client |}

    let classes = Lit.classes [ "loading", query.loading ]

    html
        $"""
        <h2 class={classes}>
          Welcome, {data.profile.name}
        </h2>
        """
```
