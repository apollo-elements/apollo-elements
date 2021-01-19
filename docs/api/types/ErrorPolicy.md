Much like `fetchPolicy`, `errorPolicy` allows you to control how GraphQL Errors from the server are sent to your UI code. By default, the error policy treats any GraphQL Errors as network errors and ends the request chain. It doesn't save any data in the cache, and renders your UI with the error property set to an `ApolloError`. By changing this policy per request, you can adjust how GraphQL Errors are managed by your UI. The possible options for `errorPolicy` are:

- `none`: This is the default policy to match how Apollo Client 1.0 worked. Any GraphQL Errors are treated the same as network errors and any data is ignored from the response.
- `ignore`: Ignore allows you to read any data that is returned alongside GraphQL Errors, but doesn't save the errors or report them to your UI.
- `all`: Using the all policy is the best way to notify your users of potential issues while still showing as much data as possible from your server. It saves both data and errors so your UI can use them.
