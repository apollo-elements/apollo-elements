---
name: Other Languages
---
<aside slot="presenter">Credit for F# to Angel Munoz</aside>
<aside slot="presenter">Credit for Ruby to Jared White</aside>

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

```ruby
import [ class_map ], from: "lit/directives/class-map.js"
import [ client ], from: "./client.js"
import [ ApolloQueryController ], from: "@apollo-elements/core"
import [ UserProfile ], from: "./UserProfile.query.graphql.js"

class UserProfileElement < LitElement
  attr_accessor :query

  def self.styles
    <<~CSS
      .loading { opacity: 0 }
    CSS
  end

  custom_element "user-profile"

  def initialize
    self.query = ApolloQueryController.new(self, UserProfile, client: client)
  end

  def render
    <<~HTML
      <h2 class=#{class_map(loading: query.loading)}>
        Welcome, #{query.data&.profile&.name}!
      </h2>
    HTML
  end
end
```
